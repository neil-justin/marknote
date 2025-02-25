import { NoteDoc, NoteFilter } from '@app/types';
import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const baseUrl = '/api/notes';

export const createNote = async (): Promise<NoteDoc> => {
  const user = getAuth().currentUser;

  if (!user) {
    throw new FirebaseError(
      'auth/user-not-found',
      'You are not authorized to perform this operation. Please sign in to your account first'
    );
  }

  return (await axios.post(`${baseUrl}/${user.email}`)).data;
};

export const getNotes = async (
  email: string,
  filter: NoteFilter
): Promise<NoteDoc[]> => {
  return (await axios.get(`${baseUrl}`, { params: { email, ...filter } })).data;
};
