export interface UserCredential {
  email: string;
  password: string;
}

export interface NoteDoc {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  archived: boolean;
}
