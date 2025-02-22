import { UserCredential } from '@/types';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  validatePassword,
  User,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/firebaseAuth';

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
