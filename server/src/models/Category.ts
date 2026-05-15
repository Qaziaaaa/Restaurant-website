import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'slugify';

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  active: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    image: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

categorySchema.pre('save', function () {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

export default mongoose.model<ICategory>('Category', categorySchema);
