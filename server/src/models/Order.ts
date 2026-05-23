import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED'
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: {
    menuItem: mongoose.Types.ObjectId;
    nameSnapshot: string;
    quantity: number;
    priceSnapshot: number;
    selectedAddons: { name: string; price: number }[];
    selectedVariant?: { name: string; price: number };
    itemTotal: number;
  }[];
  pricingBreakdown: {
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
}

const orderItemSchema = new Schema({
  menuItem: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  nameSnapshot: { type: String, required: true },
  quantity: { type: Number, required: true },
  priceSnapshot: { type: Number, required: true },
  selectedAddons: [{ name: String, price: Number }],
  selectedVariant: { name: String, price: Number },
  itemTotal: { type: Number, required: true }
});

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    pricingBreakdown: {
      subtotal: { type: Number, required: true },
      tax: { type: Number, required: true },
      discount: { type: Number, required: true, default: 0 },
      total: { type: Number, required: true }
    },
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ orderNumber: 1 });

// TODO: Future Payment Integration Hook
// orderSchema.post('save', async function(doc) { ... });

export default mongoose.model<IOrder>('Order', orderSchema);
