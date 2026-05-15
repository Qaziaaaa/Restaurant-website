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

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as any;
      await processSuccessfulPayment(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object as any;
      await processFailedPayment(failedIntent);
      break;
    default:
      logger.info(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function processSuccessfulPayment(paymentIntent: any) {
  const { orderId, userId } = paymentIntent.metadata;

  // 1. Update Transaction
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
    await emailQueue.add('order_confirmation', {
      to: 'customer@example.com', // Get from user model in real app
      orderId,
      total: order.pricingBreakdown.total,
    });
  }

  logger.info(`Payment succeeded for Order: ${orderId}`);
}

async function processFailedPayment(paymentIntent: any) {
  const { orderId } = paymentIntent.metadata;
  await Transaction.findOneAndUpdate(
    { gatewayTransactionId: paymentIntent.id },
    { status: TransactionStatus.FAILED }
  );
  logger.warn(`Payment failed for Order: ${orderId}`);
}
