import { LabelParams, NoteDoc, NoteReqBody } from '@app/types';
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

export const getNotes = async (email: string): Promise<NoteDoc[]> => {
  return (await axios.get(`${baseUrl}`, { params: { email } })).data;
};

export const updateNote = async ({
  id,
  ...newBody
}: NoteReqBody & { id: string }): Promise<NoteDoc> => {
  return (await axios.put(`${baseUrl}/${id}`, newBody)).data;
};

export const removeLabel = async ({ id, label }: LabelParams) => {
  return (await axios.delete(`${baseUrl}/${id}/labels/${label}`)).data;
};

export const updateLabel = async ({
  label,
  newLabel,
}: {
  label: string;
  newLabel: string;
}) => {
  return (await axios.patch(`${baseUrl}/labels/${label}`, { newLabel })).data;
};

export const removeManyLabels = async ({ label }: LabelParams) => {
  return (await axios.delete(`${baseUrl}/labels/${label}`)).data;
};

export const restoreNote = async ({ id }: { id: string }) => {
  return (await axios.delete(`${baseUrl}/${id}/fields/trashedAt`)).data;
};

export const deleteNote = async ({ id }: { id: string }) => {
  return (await axios.delete(`${baseUrl}/${id}/`)).data;
};
