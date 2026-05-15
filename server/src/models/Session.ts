import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  refreshToken: string;
  userAgent?: string;
  ipAddress?: string;
  isRevoked: boolean;
  expiresAt: Date;
  lastUsedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    isRevoked: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-delete expired sessions from MongoDB
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ISession>('Session', sessionSchema);
