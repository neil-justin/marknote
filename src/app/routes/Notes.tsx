import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { getNotes } from '@/services/note';
import * as Icons from '@assets/icons';
import { useQuery } from '@tanstack/react-query';
import { User } from 'firebase/auth';
import { useLocation } from 'react-router';

interface NotesProps {
  user: User;
}

const Notes = ({ user }: NotesProps) => {
  const noteId = useLocation().pathname.split('/')[2];

  const { data: notes, refetch } = useQuery({
    queryKey: ['notes'],
    queryFn: () =>
      getNotes(user.email as string, { archived: 'false', trashed: 'false' }),
  });

  if (!notes) return;
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
