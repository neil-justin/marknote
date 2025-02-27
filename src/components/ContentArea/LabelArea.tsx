import { updateNote } from '@/services/note';
import { NoteDoc } from '@app/types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

interface LabelAreaProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  itemBasePath: '/notes';
  note: NoteDoc;
}

const LabelArea = ({ refetchNotes, itemBasePath, note }: LabelAreaProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({ mutationFn: updateNote });

  const handleAddLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const labelInput = e.target as HTMLInputElement;

      e.preventDefault();

      mutation.mutate(
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

  return (
    <div className='flex px-4'>
      {note.labels.length > 0 ? (
        <ul className='flex overflow-x-scroll'>
          {note.labels.map((label) => (
            <li key={label}>
              <button className='btn btn-soft hover:btn-error rounded-full text-sm'>
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
