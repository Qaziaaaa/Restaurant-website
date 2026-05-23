import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

export interface IVariant {
  name: string;
  price: number;
}

export interface IAddon {
  name: string;
  price: number;
}

export interface IMenuItem extends Document {
  name: string;
  slug: string;
  description: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  basePrice: number;
  variants: IVariant[];
  addons: IAddon[];
  spiceLevel: number; // 0-3
  preparationTime: number; // in minutes
  availability: boolean;
  ratings: { average: number; count: number };
  inventoryPreparation?: string; // TODO: Future Inventory link
  branchAvailability: mongoose.Types.ObjectId[];
  featuredFlag: boolean;
}

const variantSchema = new Schema<IVariant>({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
});

const addonSchema = new Schema<IAddon>({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
});

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [{ type: String }],
    basePrice: { type: Number, required: true, min: [0, 'Base price cannot be negative'] },
    variants: [variantSchema],
    addons: [addonSchema],
    spiceLevel: { type: Number, default: 0, min: 0, max: 3 },
    preparationTime: { type: Number, default: 15 },
    availability: { type: Boolean, default: true },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    inventoryPreparation: { type: String },
    branchAvailability: [{ type: Schema.Types.ObjectId, ref: 'RestaurantBranch' }],
    featuredFlag: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Indexes for performance
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ name: 'text' });
menuItemSchema.index({ availability: 1 });
menuItemSchema.index({ featuredFlag: 1 });
menuItemSchema.index({ basePrice: 1 });

menuItemSchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
