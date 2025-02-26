import mongoose from 'mongoose';
import { NoteDoc } from '@app/types';

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, default: 'Untitled' },
    content: { type: String, default: undefined },
    pinned: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    // expires document with set trashedAt field after 7 days
    trashedAt: { type: Date, default: undefined, expires: 604800 },
    labels: { type: [String] },
  },
  { timestamps: true }
);

noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model<NoteDoc>('Note', noteSchema);

export default Note;
