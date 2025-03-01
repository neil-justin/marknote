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
    trashedAt: { type: Date, default: undefined },
    labels: { type: [String] },
  },
  { timestamps: true }
);

// Expire Note with a defined trashedAt field after 7 days
noteSchema.index({ trashedAt: 1 }, { expires: '7d' });

noteSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model<NoteDoc>('Note', noteSchema);

export default Note;
