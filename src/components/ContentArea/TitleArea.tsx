import { NavLink, useNavigate } from 'react-router';
import * as Icons from '@assets/icons';
import { NoteDoc } from '@app/types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { updateNote } from '@/services/note';

interface TitleAreaProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  note: NoteDoc;
  itemBasePath: '/notes';
}

const TitleArea = ({ refetchNotes, note, itemBasePath }: TitleAreaProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({ mutationFn: updateNote });

  const handleNoteTitleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // This prevents line break
      e.preventDefault();

      mutation.mutate(
        {
          id: note.id.toString(),
          title: (e.target as HTMLDivElement).textContent as string,
        },
        {
          onSuccess() {
            refetchNotes();
            navigate(`${itemBasePath}/${note.id.toString()}`);
          },
        }
      );
    }
  };

  return (
    <div className='flex justify-between items-center shadow-sm px-4'>
      <div
        contentEditable
        className='w-fit h-fit py-1 px-2'
        onKeyDown={(e) => handleNoteTitleChange(e)}
        suppressContentEditableWarning={true}
      >
        {note.title}
      </div>
      <div>
        <div
          className='tooltip tooltip-left'
          data-tip='More Actions'
        >
          <button
            className='btn btn-ghost'
            popoverTarget='popover-note-menu'
            style={{ anchorName: '--anchor-note-menu' } as React.CSSProperties}
          >
            <Icons.MoreAction size={24} />
          </button>
        </div>
        <ul
          className='dropdown dropdown-bottom dropdown-end menu w-52 rounded-box bg-base-100 shadow-sm'
          popover='auto'
          id='popover-note-menu'
          style={
            { positionAnchor: '--anchor-note-menu' } as React.CSSProperties
          }
        >
          {itemBasePath === '/notes' ? (
            <li>
              <button>{note.pinned ? 'Unpin' : 'Pin'} note</button>
            </li>
          ) : null}
          {itemBasePath === '/notes' ? (
            <li>
              <NavLink to={itemBasePath}>
                {note.archived ? 'Unarchive' : 'Archive'} note
              </NavLink>
            </li>
          ) : null}
          {itemBasePath === '/notes' ? (
            <li>
              <NavLink to={itemBasePath}>Move to trash</NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default TitleArea;
