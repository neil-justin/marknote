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
  trashedAt?: Date;
  labels: string[];
}
export interface NoteQuery {
  email: string;
}

export interface NoteReqBody {
  title?: string;
  pinned?: boolean;
  archived?: boolean;
  trashedAt?: Date;
  content?: string;
  labels?: string[];
}
