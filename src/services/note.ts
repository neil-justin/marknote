import Note from '@models/note';
import User from '@models/user';
import { UserDoc } from '@/types';
import { NoteDoc, NoteQuery, NoteReqBody } from '@app/types';

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

export default { getNotes, createNote, updateNote };
