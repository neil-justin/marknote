import { NoteDoc } from '@app/types';
import TitleArea from './TitleArea';
import Tiptap from './Tiptap';
import { QueryObserverResult } from '@tanstack/react-query';

interface ContentAreaProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  note: NoteDoc | undefined;
  itemBasePath: '/notes';
}

const ContentArea = ({
  refetchNotes,
  note,
  itemBasePath,
}: ContentAreaProps) => {
  if (!note) return;

  return (
    <div className='shadow-md flex flex-col'>
      <TitleArea
        refetchNotes={refetchNotes}
        note={note}
        itemBasePath={itemBasePath}
      />
      <Tiptap content={note.content} />
    </div>
  );
};

export default ContentArea;
