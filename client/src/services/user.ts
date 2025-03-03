<<<<<<< HEAD
import User from '@/models/user';
import { User as UserBody, UserDoc } from '@/types';

const saveUser = async (user: UserBody): Promise<UserDoc> => {
  return await new User({ uid: user.uid, email: user.email }).save();
};

export default { saveUser };
=======
import { UserCredential } from '@/types';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  validatePassword,
  User,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/firebaseAuth';
import axios from 'axios';

const baseUrl = '/api/users';

export const registerUser = async (user: UserCredential): Promise<User> => {
  const { email, password } = user;
  const currentUser = auth.currentUser;

  if (currentUser) {
    throw new FirebaseError(
      'auth/email-already-exists',
      'This account already exists in our database. Please sign in instead.'
    );
  }

  const { isValid } = await validatePassword(auth, password);

  if (isValid) {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(firebaseUser);

    // This POST request will save user to MongoDB
    await axios.post(`${baseUrl}/`, {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
    });
    return firebaseUser;
  } else {
    throw new FirebaseError('auth/weak-password', 'Weak user password');
  }
};

export const loginUser = async (
  userCredential: UserCredential
): Promise<User> => {
  const { email, password } = userCredential;

  return (await signInWithEmailAndPassword(auth, email, password)).user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
>>>>>>> client/main
