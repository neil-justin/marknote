import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { useNotes } from '@/utils/hooks';
import * as Icons from '@assets/icons';
import { useLocation } from 'react-router';

const Label = () => {
  const pathname = useLocation().pathname.split('/');

  const { notes, refetch } = useNotes();

  const label = pathname[2];

  const filteredNotes = notes.filter(
    (note) => note.labels.includes(label) && !note.trashedAt
  );

  const noteId = pathname[3];

  const selectedNote = filteredNotes.find(
    (note) => note.id.toString() === noteId
  );

  return (
    <div className='grid sm:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-screen w-screen'>
      <Menu
        refetchNotes={refetch}
        notes={filteredNotes}
        textHeader={label}
        icon={<Icons.Label size={36} />}
        menuText='No notes with this label yet'
        itemBasePath={`/labels/${label}`}
      />
      <ContentArea
        refetchNotes={refetch}
        itemBasePath={`/labels/${label}`}
        note={selectedNote}
      />
    </div>
  );
};

export default Label;
