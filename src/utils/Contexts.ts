import { NoteDoc } from '@app/types';
import { QueryObserverResult } from '@tanstack/react-query';

export type NotesContextType = {
  notes: NoteDoc[];
  refetch: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
};
