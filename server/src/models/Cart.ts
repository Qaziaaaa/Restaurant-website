import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  menuItem: mongoose.Types.ObjectId;
  quantity: number;
  selectedAddons: mongoose.Types.ObjectId[];
  selectedVariant?: mongoose.Types.ObjectId;
  itemTotal: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
}

const cartItemSchema = new Schema<ICartItem>({
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedAddons: [{ type: Schema.Types.ObjectId }],
  selectedVariant: { type: Schema.Types.ObjectId },
  itemTotal: { type: Number, required: true, default: 0 }
});

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    couponCode: { type: String }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICart>('Cart', cartSchema);
