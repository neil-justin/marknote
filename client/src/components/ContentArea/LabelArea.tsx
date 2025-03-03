import { removeLabel, updateNote } from '@/services/note';
import { NoteDoc } from '@app/types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

interface LabelAreaProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  itemBasePath: '/notes' | '/archive' | '/trash' | string;
  note: NoteDoc;
}

const LabelArea = ({ refetchNotes, itemBasePath, note }: LabelAreaProps) => {
  const navigate = useNavigate();

  const noteMutation = useMutation({ mutationFn: updateNote });
  const labelMutation = useMutation({ mutationFn: removeLabel });

  const handleAddLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const labelInput = e.target as HTMLInputElement;

      e.preventDefault();

      noteMutation.mutate(
        {
          id: note.id.toString(),
          labels: [labelInput.value],
        },
        {
          onSuccess() {
            labelInput.value = '';
            refetchNotes();
            navigate(`${itemBasePath}/${note.id.toString()}`);
          },
        }
      );
    }
  };

  const handleRemoveLabel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    labelMutation.mutate(
      {
        id: note.id.toString(),
        label: (e.target as HTMLButtonElement).textContent as string,
      },
      {
        onSuccess() {
          refetchNotes();
        },
      }
    );
  };

  return (
    <div className='flex px-4'>
      {note.labels.length > 0 ? (
        <ul className='flex overflow-x-auto max-w-2/3'>
          {note.labels.map((label) => (
            <li key={label}>
              <button
                onClick={(e) => handleRemoveLabel(e)}
                className='btn btn-soft hover:btn-error rounded-full text-sm'
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <input
        type='text'
        placeholder='Add a label...'
        className='input input-ghost focus:outline-0'
        onKeyDown={(e) => handleAddLabel(e)}
      />
    </div>
  );
};

export default LabelArea;
