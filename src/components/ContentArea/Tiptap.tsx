import { updateNote } from '@/services/note';
import { NoteDoc } from '@app/types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

interface TiptapProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  note: NoteDoc;
}

// define your extension array
const extensions = [StarterKit];

const Tiptap = ({ refetchNotes, note }: TiptapProps) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full p-10',
      },
    },
    onUpdate({ editor }) {
      mutation.mutate(
        { id: note.id.toString(), content: editor.getHTML() },
        {
          onSuccess() {
            refetchNotes();
          },
        }
      );
    },
  });

  const mutation = useMutation({ mutationFn: updateNote });

  // This use effect only runs when the content of the chosen Note is
  // different from the previous Note
  useEffect(() => {
    if (!editor) return;

    const initialContent = note.content === undefined ? '' : note.content;

    editor.commands.setContent(initialContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.content]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
