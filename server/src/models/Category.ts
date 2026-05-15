import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  active: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    image: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', categorySchema);
