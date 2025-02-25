import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { getNotes } from '@/services/note';
import * as Icons from '@assets/icons';
import { useQuery } from '@tanstack/react-query';
import { User } from 'firebase/auth';

interface NotesProps {
  user: User;
}

const Notes = ({ user }: NotesProps) => {
  const { data: notes } = useQuery({
    queryKey: ['notes'],
    queryFn: () =>
      getNotes(user.email as string, { archived: 'false', trashed: 'false' }),
  });

  if (!notes) return;

  return (
    <div className='grid sm:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-screen w-screen'>
      <Menu
        notes={notes}
        textHeader='Notes'
        icon={<Icons.Note size={36} />}
        menuText='Create a note'
        itemBasePath='/notes'
      />
      <ContentArea
        itemBasePath='/notes'
        note={notes[0]}
      />
    </div>
  );
};

export default Notes;
