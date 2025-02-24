import * as Icons from '@assets/icons';
import { JSX } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createNote } from '@/services/note';
import { NoteDoc } from '@/types';
import { NavLink } from 'react-router';
import classNames from 'classnames';

interface MenuProps {
  notes: NoteDoc[] | null;
  textHeader: 'Notes';
  icon: JSX.Element;
  menuText: string;
  itemBasePath: '/notes';
}

const Menu = ({
  notes,
  textHeader,
  icon,
  menuText,
  itemBasePath,
}: MenuProps) => {
  const mutation = useMutation({ mutationFn: createNote });

  const handleCreateNoteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    mutation.mutate(undefined);
  };

  const handleNoteItemClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    console.log(e);
  };

  return (
    <div className='flex flex-col'>
      <div
        className={`flex items-center shadow-sm ${
          textHeader === 'Notes' ? 'justify-between' : 'justify-center'
        }`}
      >
        <span className='ml-5'>{textHeader}</span>
        {textHeader === 'Notes' ? (
          <div
            className='tooltip tooltip-bottom'
            data-tip='Create Note'
          >
            <button
              onClick={(e) => handleCreateNoteClick(e)}
              className='btn btn-ghost hover:cursor-pointer'
            >
              <Icons.CreateNote size={24} />
            </button>
          </div>
        ) : null}
      </div>
      {!notes ? (
        <div className='flex flex-col gap-3 justify-center items-center flex-auto'>
          <div>{icon}</div>
          <span>{menuText}</span>
        </div>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id.toString()}>
              <NavLink
                className={({ isActive }) =>
                  classNames('block py-5 px-10 visible', {
                    'bg-primary/40': isActive,
                  })
                }
                onClick={(e) => handleNoteItemClick(e)}
                to={`${itemBasePath}/${note.id}`}
              >
                {note.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
