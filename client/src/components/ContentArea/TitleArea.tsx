import { useNavigate } from 'react-router';
import * as Icons from '@assets/icons';
import { NoteDoc } from '@app/types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { deleteNote, restoreNote, updateNote } from '@/services/note';

interface TitleAreaProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  note: NoteDoc;
  itemBasePath: '/notes' | '/archive' | '/trash' | string;
}

const TitleArea = ({ refetchNotes, note, itemBasePath }: TitleAreaProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({ mutationFn: updateNote });
  const { mutate: mutateRestoreNote } = useMutation({
    mutationFn: restoreNote,
  });
  const { mutate: mutateDeleteNote } = useMutation({
    mutationFn: deleteNote,
  });

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

  const handleTogglePin = () => {
    mutation.mutate(
      {
        id: note.id.toString(),
        pinned: !note.pinned,
      },
      {
        onSuccess() {
          refetchNotes();
          if (itemBasePath === '/archive') {
            navigate(`${itemBasePath}`);
            return;
          } else {
            navigate(`${itemBasePath}/${note.id.toString()}`);
            return;
          }
        },
      }
    );
  };

  const handleToggleArchive = () => {
    mutation.mutate(
      {
        id: note.id.toString(),
        archived: !note.archived,
      },
      {
        onSuccess() {
          refetchNotes();
          navigate(itemBasePath);
        },
      }
    );
  };

  const handleMoveToTrash = () => {
    mutation.mutate(
      {
        id: note.id.toString(),
        trashedAt: new Date(),
      },
      {
        onSuccess() {
          refetchNotes();
          navigate(itemBasePath);
        },
      }
    );
  };

  const handleRestoreNote = () => {
    mutateRestoreNote(
      { id: note.id.toString() },
      {
        onSuccess() {
          refetchNotes();
          navigate(itemBasePath);
        },
      }
    );
  };

  const handleDeleteNote = () => {
    mutateDeleteNote(
      { id: note.id.toString() },
      {
        onSuccess() {
          refetchNotes();
          navigate(itemBasePath);
        },
      }
    );
  };

  return (
    <div className='flex justify-between items-center shadow-sm px-4'>
      <div
        contentEditable
        className='w-2/3 h-fit py-1 px-2 focus:outline-none'
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
          {itemBasePath !== '/trash' ? (
            <li>
              <button onClick={handleTogglePin}>
                {note.pinned ? 'Unpin' : 'Pin'} note
              </button>
            </li>
          ) : null}
          {itemBasePath !== '/trash' ? (
            <li>
              <button onClick={handleToggleArchive}>
                {note.archived ? 'Unarchive' : 'Archive'} note
              </button>
            </li>
          ) : null}
          {itemBasePath !== '/trash' ? (
            <li>
              <button onClick={handleMoveToTrash}>Move to trash</button>
            </li>
          ) : null}
          {itemBasePath === '/trash' ? (
            <>
              <li>
                <button onClick={handleRestoreNote}>Restore note</button>
              </li>
              <li>
                <button onClick={handleDeleteNote}>Delete forever</button>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default TitleArea;
