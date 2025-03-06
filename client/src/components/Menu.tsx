import * as Icons from '@assets/icons';
import { JSX } from 'react';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { createNote } from '@/services/note';
import { NoteDoc } from '@app/types';
import { NavLink, useNavigate } from 'react-router';
import classNames from 'classnames';

interface MenuProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  notes: NoteDoc[];
  textHeader: 'Notes' | 'Archive' | 'Trash' | string;
  icon: JSX.Element;
  menuText: string;
  itemBasePath: '/notes' | '/archive' | '/trash' | string;
}

const Menu = ({
  refetchNotes,
  notes,
  textHeader,
  icon,
  menuText,
  itemBasePath,
}: MenuProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({ mutationFn: createNote });

  const handleCreateNoteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    mutation.mutate(undefined, {
      onSuccess(note) {
        refetchNotes();
        navigate(`${itemBasePath}/${note.id.toString()}`);
      },
    });
  };

  const handleNoteItemClick = () => {
    refetchNotes();
  };

  return (
    <div className='flex flex-col bg-base-200'>
      <div
        className={classNames(
          `flex items-center shadow-sm py-2 min-h-[56px] ${
            textHeader === 'Notes' ? 'justify-between' : 'justify-center'
          }`
        )}
      >
        <span className={classNames({ 'ml-3': itemBasePath === '/notes' })}>
          {textHeader}
        </span>
        {textHeader === 'Notes' ? (
          <div
            className='tooltip tooltip-bottom'
            data-tip='Create Note'
          >
            <button
              onClick={handleCreateNoteClick}
              className='btn btn-ghost hover:cursor-pointer'
            >
              <Icons.CreateNote size={24} />
            </button>
          </div>
        ) : null}
      </div>
      {notes.length < 1 ? (
        <div className='flex flex-col gap-3 justify-center items-center flex-auto'>
          <div>{icon}</div>
          {textHeader === 'Notes' ? (
            <button
              onClick={handleCreateNoteClick}
              className='text-primary hover:cursor-pointer hover:text-base-content'
            >
              {menuText}
            </button>
          ) : (
            <div className='text-neutral-content/50'>{menuText}</div>
          )}
        </div>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id.toString()}>
              <NavLink
                className={({ isActive }) =>
                  classNames('block py-5 px-10 visible hover:bg-base-300', {
                    'bg-primary/40 hover:bg-primary/40': isActive,
                  })
                }
                onClick={handleNoteItemClick}
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
