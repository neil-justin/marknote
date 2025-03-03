import mongoose from 'mongoose';
import { MONGODB_URI } from './config.ts';

const connectToDB = async () => {
  mongoose.set('strictQuery', false);

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('error connecting to MongoDB', error);
  }
};

export default connectToDB;
