import Note from '@models/note';
import User from '@models/user';
import { UserDoc } from '@/types';
import { LabelParams, NoteDoc, NoteQuery, NoteReqBody } from '@app/types';
import { UpdateResult } from 'mongoose';

const getNotes = async (query: NoteQuery) => {
  const { email } = query;

  const user = (await User.findOne({ email })) as UserDoc;

  return await Note.find({
    userId: user.id,
  }).sort({ updatedAt: 'descending' });
};

const createNote = async (
  email: string,
  body: NoteReqBody | undefined
): Promise<NoteDoc> => {
  const user = (await User.findOne({
    email,
  })) as UserDoc;

  return await new Note({ ...body, userId: user.id }).save();
};

const updateNote = async (id: string, body: NoteReqBody): Promise<NoteDoc> => {  
  if (body.labels) {
    return (await Note.findByIdAndUpdate(
      id,
      { $addToSet: { labels: { $each: body.labels } } },
      { new: true }
    )) as NoteDoc;
  }

  return (await Note.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  )) as NoteDoc;
};

const removeLabel = async ({ id, label }: LabelParams): Promise<NoteDoc> => {
  return (await Note.findByIdAndUpdate(
    id,
    { $pull: { labels: label } },
    { new: true }
  )) as NoteDoc;
};

const updateManyLabel = async (
  params: LabelParams,
  body: { newLabel: string }
): Promise<UpdateResult> => {
  const { label } = params;
  const { newLabel } = body;

  return await Note.updateMany(
    { labels: label },
    { $set: { 'labels.$': newLabel } }
  );
};

const removeManyLabels = async ({
  label,
}: LabelParams): Promise<UpdateResult> => {
  return await Note.updateMany({}, { $pull: { labels: label } });
};

const restoreNote = async ({ id }: { id: string }): Promise<NoteDoc> => {
  return (await Note.findByIdAndUpdate(
    id,
    { $unset: { trashedAt: 1 } },
    { new: true }
  )) as NoteDoc;
};

const deleteNote = async ({ id }: { id: string }): Promise<NoteDoc> => {
  return (await Note.findByIdAndDelete(id)) as NoteDoc;
};

export default {
  getNotes,
  createNote,
  updateNote,
  removeLabel,
  updateManyLabel,
  removeManyLabels,
  restoreNote,
  deleteNote,
};
