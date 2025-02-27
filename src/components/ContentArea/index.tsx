import { NoteDoc } from '@app/types';
import TitleArea from './TitleArea';
import Tiptap from './Tiptap';
import { QueryObserverResult } from '@tanstack/react-query';
import LabelArea from './LabelArea';

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
      <Tiptap
        refetchNotes={refetchNotes}
        note={note}
      />
      <LabelArea
        refetchNotes={refetchNotes}
        itemBasePath={itemBasePath}
        note={note}
      />
    </div>
  );
};

export default ContentArea;
