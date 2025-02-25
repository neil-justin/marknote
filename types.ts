import mongoose, { Document } from 'mongoose';

export interface NoteDoc extends Document {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  content?: string;
  pinned: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFilter {
  archived?: 'true' | 'false';
  trashed?: 'true' | 'false';
}

export interface NoteQuery extends NoteFilter {
  email: string;
}
