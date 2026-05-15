import mongoose, { Document, Schema } from 'mongoose';

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export interface ITransaction extends Document {
  order: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  paymentGateway: 'stripe' | 'razorpay';
  gatewayTransactionId: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  metadata: any;
}

const transactionSchema = new Schema<ITransaction>(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentGateway: { type: String, required: true },
    gatewayTransactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'usd' },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
    },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
