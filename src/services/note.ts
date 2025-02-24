import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const baseUrl = '/api/notes';

export const createNote = async () => {
  if (!getAuth().currentUser)
    throw new FirebaseError(
      'auth/user-not-found',
      'You are not authorized to perform this operation. Please sign in to your account first'
    );
  return (await axios.post(`${baseUrl}/`)).data;
};
