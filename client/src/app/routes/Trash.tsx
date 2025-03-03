import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { useNotes } from '@/utils/hooks';
import * as Icons from '@assets/icons';
import { useLocation } from 'react-router';

const Trash = () => {
  const { notes, refetch } = useNotes();

  const filteredNotes = notes.filter((note) => note.trashedAt);

  const noteId = useLocation().pathname.split('/')[2];

  const selectedNote = filteredNotes.find(
    (note) => note.id.toString() === noteId
  );

  return (
    <div className='grid sm:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-screen w-screen'>
      <Menu
        refetchNotes={refetch}
        notes={filteredNotes}
        textHeader='Trash'
        icon={<Icons.Trash size={36} />}
        menuText='Trash is empty'
        itemBasePath='/trash'
      />
      <ContentArea
        refetchNotes={refetch}
        itemBasePath='/trash'
        note={selectedNote}
      />
    </div>
  );
};

export default Trash;
