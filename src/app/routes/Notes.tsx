import Menu from '@/components/Menu';
import * as Icons from '@assets/icons';

const Notes = () => {
  const notes = null;

  return (
    <div className='grid sm:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-screen w-screen'>
      <Menu
        notes={notes}
        textHeader='Notes'
        icon={<Icons.Note size={36} />}
        menuText='Create a note'
      />
      <div className='bg-yellow-600'></div>
    </div>
  );
};

export default Notes;
