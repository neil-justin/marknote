import { NavLink } from 'react-router';
import * as Icons from '@assets/icons';
import { NoteDoc } from '@/types';

interface TitleAreaProps {
  note: NoteDoc;
  itemBasePath: '/notes';
}

const TitleArea = ({ note, itemBasePath }: TitleAreaProps) => {
  const handleNoteTitleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      // This prevents line break
      e.preventDefault();
      console.log(e);
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
