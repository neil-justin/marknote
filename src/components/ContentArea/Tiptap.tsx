// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapProps {
  content: string | undefined;
}

// define your extension array
const extensions = [StarterKit];

const Tiptap = ({ content }: TiptapProps) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full p-10',
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
