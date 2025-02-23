import * as Icons from '@assets/icons';
import { JSX } from 'react';
interface MenuProps {
  notes: null;
  textHeader: 'Notes';
  icon: JSX.Element;
  menuText: string;
}

const Menu = ({ notes, textHeader, icon, menuText }: MenuProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center'>
        <span className='ml-5'>{textHeader}</span>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Create Note'
        >
          <button className='btn btn-ghost hover:bg-base-300 hover:cursor-pointer'>
            <Icons.CreateNote size={24} />
          </button>
        </div>
      </div>
      {!notes && (
        <div className='flex flex-col gap-3 justify-center items-center flex-auto'>
          <div>{icon}</div>
          <span>{menuText}</span>
        </div>
      )}
    </div>
  );
};

export default Menu;
