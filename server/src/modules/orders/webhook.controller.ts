import { Request, Response } from 'express';
import { verifyStripeWebhook } from '../../services/payment.service';
import Order, { PaymentStatus } from '../../models/Order';
import Transaction, { TransactionStatus } from '../../models/Transaction';
import { socketService } from '../../sockets/socket.service';
import { emailQueue } from '../../queues/queue.service';
import logger from '../../utils/logger';
import { asyncHandler } from '../../utils/asyncHandler';

export const handleStripeWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = verifyStripeWebhook(req.body, signature);
  } catch (err: any) {
    logger.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const eventType = event.type as string;

  switch (eventType) {
    case 'payment_intent.succeeded':
      await processSuccessfulPayment((event as any).data.object);
      break;
    case 'payment_intent.payment_failed':
      await processFailedPayment((event as any).data.object);
      break;
    case 'charge.refunded':
      await processChargeRefunded((event as any).data.object);
      break;
    case 'payment_intent.canceled':
      await processFailedPayment((event as any).data.object);
      break;
    case 'charge.disputed.created':
      await processDisputeCreated((event as any).data.object);
      break;
    default:
      logger.info(`Unhandled event type ${eventType}`);
  }

  res.json({ received: true });
});

async function processSuccessfulPayment(paymentIntent: any) {
  const { orderId, userId } = paymentIntent.metadata;

  // 1. Check if already processed (Idempotency)
  const existingTx = await Transaction.findOne({ gatewayTransactionId: paymentIntent.id });
  if (existingTx && existingTx.status === TransactionStatus.SUCCESS) {
    logger.info(`Payment already processed for Order: ${orderId}`);
    return;
  }

  // 2. Update Transaction
  await Transaction.findOneAndUpdate(
    { gatewayTransactionId: paymentIntent.id },
    { status: TransactionStatus.SUCCESS }
  );

  // 2. Update Order
  const order = await Order.findByIdAndUpdate(
    orderId,
    { paymentStatus: PaymentStatus.PAID },
    { new: true }
  );

  if (order) {
    // 3. Real-time notification
    socketService.emitOrderUpdate(userId, orderId, 'PAID');
    socketService.emitToAdmin('new_paid_order', { orderId });

    // 4. Queue Email Confirmation
    if (emailQueue) {
      await emailQueue.add('order_confirmation', {
        to: 'customer@example.com',
        orderId,
        total: order.pricingBreakdown.total,
      });
    }
  }

  logger.info(`Payment succeeded for Order: ${orderId}`);
}

async function processFailedPayment(paymentIntent: any) {
  const { orderId } = paymentIntent.metadata;
  await Transaction.findOneAndUpdate(
    { gatewayTransactionId: paymentIntent.id },
    { status: TransactionStatus.FAILED }
  );
  if (orderId) {
    await Order.findByIdAndUpdate(orderId, { paymentStatus: PaymentStatus.FAILED });
    socketService.emitOrderUpdate(paymentIntent.metadata.userId, orderId, 'PAYMENT_FAILED');
  }
  logger.warn(`Payment failed for Order: ${orderId}`);
}

async function processChargeRefunded(charge: any) {
  const paymentIntentId = charge.payment_intent as string;
  const transaction = await Transaction.findOneAndUpdate(
    { gatewayTransactionId: paymentIntentId },
    { status: TransactionStatus.REFUNDED }
  );

  if (transaction) {
    await Order.findByIdAndUpdate(transaction.order, { paymentStatus: PaymentStatus.PAID, orderStatus: 'REFUNDED' });
    logger.info(`Refund processed for Order: ${transaction.order}`);
  }
}

async function processDisputeCreated(charge: any) {
  const paymentIntentId = charge.payment_intent as string;
  const transaction = await Transaction.findOne({ gatewayTransactionId: paymentIntentId });

  if (transaction) {
    await Order.findByIdAndUpdate(transaction.order, { $set: { 'metadata.dispute': true } });
    socketService.emitToAdmin('dispute_created', { orderId: transaction.order, chargeId: charge.id });
    logger.warn(`Dispute created for Order: ${transaction.order}`);
  }
}
