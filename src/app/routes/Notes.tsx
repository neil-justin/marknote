import ContentArea from '@/components/ContentArea/index';
import Menu from '@/components/Menu';
import { NoteDoc } from '@/types';
import * as Icons from '@assets/icons';

const Notes = () => {
  const notes: NoteDoc[] | null = [
    {
      id: 1,
      title: 'This is a dummy note',
      content: 'This is a dummy content',
      pinned: false,
      archived: false,
    },
  ];

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
