import { NoteDoc } from '@/types';
import TitleArea from './TitleArea';
import Tiptap from './Tiptap';

interface ContentAreaProps {
  note: NoteDoc | null;
  itemBasePath: '/notes';
}

const ContentArea = ({ note, itemBasePath }: ContentAreaProps) => {
  if (!note) return null;

  return (
    <div className='shadow-md flex flex-col'>
      <TitleArea
        note={note}
        itemBasePath={itemBasePath}
      />
      <Tiptap content={note.content} />
    </div>
  );
};

export default ContentArea;
