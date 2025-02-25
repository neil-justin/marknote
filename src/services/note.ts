import Note from '@models/note';
import User from '@models/user';
import { UserDoc } from '@/types';
import { NoteDoc, NoteQuery, NoteReqBody } from '@app/types';

const getNotes = async (query: NoteQuery) => {
  const { email, archived, trashed } = query;

  const user = (await User.findOne({ email })) as UserDoc;

  return await Note.find({
    userId: user.id,
    // If archived exists,
    ...(archived !== undefined && {
      // Include archived field in filter
      archived: JSON.parse(archived),
    }),
    ...(trashed !== undefined && {
      // This filter field will return all documents with a defined trashedAt
      // field if trashed is true
      trashedAt: { $exists: JSON.parse(trashed) },
    }),
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
  return (await Note.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  )) as NoteDoc;
};

export default { getNotes, createNote, updateNote };
