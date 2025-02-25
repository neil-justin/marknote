import mongoose from 'mongoose';
import { UserDoc } from '@/types';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model<UserDoc>('User', userSchema);

export default User;
