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
  textHeader: 'Notes';
  icon: JSX.Element;
  menuText: string;
  itemBasePath: '/notes';
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
    <div className='flex flex-col'>
      <div
        className={`flex items-center shadow-sm py-2 ${
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
          <button
            onClick={handleCreateNoteClick}
            className='text-primary hover:cursor-pointer hover:text-base-content'
          >
            {menuText}
          </button>
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
