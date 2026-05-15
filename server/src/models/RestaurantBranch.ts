import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurantBranch extends Document {
  name: string;
  slug: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  deliveryRadiusKm: number;
  activeStatus: boolean;
}

const branchSchema = new Schema<IRestaurantBranch>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    deliveryRadiusKm: { type: Number, required: true, default: 5 },
    activeStatus: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<IRestaurantBranch>('RestaurantBranch', branchSchema);
