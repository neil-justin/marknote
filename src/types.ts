import { Document } from 'mongoose';

export interface UserDoc extends Document {
  uid: string;
  email: string;
}