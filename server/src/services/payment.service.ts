import Stripe from 'stripe';
import { IOrder } from '../models/Order';
import Transaction, { TransactionStatus } from '../models/Transaction';
import logger from '../utils/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27' as any,
});

export const createPaymentIntent = async (order: IOrder) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.pricingBreakdown.total * 100),
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: order.user.toString(),
      },
    });

    await Transaction.create({
      order: order._id,
      user: order.user,
      paymentGateway: 'stripe',
      gatewayTransactionId: paymentIntent.id,
      amount: order.pricingBreakdown.total,
      status: TransactionStatus.PENDING,
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    logger.error('Stripe PaymentIntent creation failed:', error);
    throw new Error('Payment initialization failed');
  }
};

export const createRefund = async (order: IOrder) => {
  try {
    const transaction = await Transaction.findOne({ order: order._id, status: TransactionStatus.SUCCESS });
    if (!transaction) {
      throw new Error('No successful payment found for this order');
    }

    const refund = await stripe.refunds.create({
      payment_intent: transaction.gatewayTransactionId,
    });

    await Transaction.findOneAndUpdate(
      { gatewayTransactionId: transaction.gatewayTransactionId },
      { status: TransactionStatus.REFUNDED }
    );

    return {
      refundId: refund.id,
      amount: refund.amount / 100,
      status: refund.status,
    };
  } catch (error) {
    logger.error('Stripe refund creation failed:', error);
    throw new Error('Refund processing failed');
  }
};

export const verifyStripeWebhook = (payload: any, signature: string) => {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (error) {
    throw new Error('Webhook signature verification failed');
  }
};
