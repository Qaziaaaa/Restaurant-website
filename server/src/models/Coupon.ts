import mongoose, { Document, Schema } from 'mongoose';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'
}

export interface ICoupon extends Document {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  expirationDate: Date;
  usageLimit: number;
  timesUsed: number;
  active: boolean;
  minOrderValue?: number;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: Object.values(DiscountType), required: true },
    discountValue: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    usageLimit: { type: Number, required: true },
    timesUsed: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    minOrderValue: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ICoupon>('Coupon', couponSchema);
