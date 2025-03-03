<<<<<<< HEAD
import { Document } from 'mongoose';

export interface User {
  uid: string;
  email: string;
}

export interface UserDoc extends User, Document {}
=======
export interface UserCredential {
  email: string;
  password: string;
}
>>>>>>> client/main
