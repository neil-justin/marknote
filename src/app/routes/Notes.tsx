import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { useNotes } from '@/utils/hooks';
import * as Icons from '@assets/icons';
import { useLocation } from 'react-router';

const Notes = () => {
  const { notes, refetch } = useNotes();

  console.log('notes in Notes', notes);

  const noteId = useLocation().pathname.split('/')[2];

  const noteToDisplay = notes.find((note) => note.id.toString() === noteId);

  return (
    <div className='grid sm:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-screen w-screen'>
      <Menu
        refetchNotes={refetch}
        notes={notes}
        textHeader='Notes'
        icon={<Icons.Note size={36} />}
        menuText='Create a note'
        itemBasePath='/notes'
      />
      <ContentArea
        refetchNotes={refetch}
        itemBasePath='/notes'
        note={noteToDisplay}
      />
    </div>
  );
};

export default Notes;
