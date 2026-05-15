import mongoose from 'mongoose';
import { env } from './env';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
    // Optional: for user to see in terminal easily as required by test 1
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
