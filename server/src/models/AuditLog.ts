import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  user?: mongoose.Types.ObjectId;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
  timestamp: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    action: {
      type: String,
      required: true,
    },
    ipAddress: String,
    userAgent: String,
    metadata: Schema.Types.Mixed,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    capped: { size: 5242880, max: 5000 }, // Capped collection to limit log size (5MB, 5000 docs)
  }
);

export default mongoose.model<IAuditLog>('AuditLog', auditLogSchema);
