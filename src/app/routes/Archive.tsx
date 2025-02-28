import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { useNotes } from '@/utils/hooks';
import * as Icons from '@assets/icons';
import { useLocation } from 'react-router';

const Archive = () => {
  const { notes, refetch } = useNotes();

  const filteredNotes = notes.filter(
    (note) => note.archived && !note.trashedAt
  );

  const noteId = useLocation().pathname.split('/')[2];

  const selectedNote = filteredNotes.find(
    (note) => note.id.toString() === noteId
  );

  return (
    <div className='grid sm:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-screen w-screen'>
      <Menu
        refetchNotes={refetch}
        notes={filteredNotes}
        textHeader='Archive'
        icon={<Icons.Archive size={36} />}
        menuText='Archive is empty'
        itemBasePath='/archive'
      />
      <ContentArea
        refetchNotes={refetch}
        itemBasePath='/archive'
        note={selectedNote}
      />
    </div>
  );
};

export default Archive;
