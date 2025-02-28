import { updateNote } from '@/services/note';
import { NoteDoc } from '@app/types';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  mergeAttributes,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import { useEffect } from 'react';
import { usePrevious } from '@uidotdev/usehooks';
import * as Icons from '@assets/icons';
import classNames from 'classnames';

interface TiptapProps {
  refetchNotes: () => Promise<QueryObserverResult<NoteDoc[], Error>>;
  note: NoteDoc;
}

// define your extension array
const extensions = [
  StarterKit,
  Blockquote.configure({
    HTMLAttributes: { class: 'bl-1 border-solid border-base-300 my-2 pl-1' },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class:
        'bg-neutral rounded-md text-neutral-content font-mono my-5 p-3 text-xs',
    },
    defaultLanguage: 'plaintext',
  }),
  Paragraph.configure({ HTMLAttributes: { class: 'my-2' } }),
  Heading.extend({
    levels: [1, 2, 3],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0];
      const classes: { [index: number]: string } = {
        1: 'text-3xl font-semibold mt-8 mb-1',
        2: 'text-2xl font-semibold mt-6 mb-1',
        3: 'text-xl font-semibold mt-4 mb-1',
      };
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ];
    },
  }).configure({ levels: [1, 2, 3] }),
];

const Tiptap = ({ refetchNotes, note }: TiptapProps) => {
  const prevNote = usePrevious(note);

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full p-10 prose-md',
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

  useEffect(() => {
    if (!editor) return;

    if (prevNote === null || prevNote.id !== note.id) {
      const initialContent = note.content === undefined ? '' : note.content;

      editor.commands.setContent(initialContent);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.content]);

  if (!editor) return;

  return (
    <>
      <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
      >
        <div className='flex bg-base-100 px-3 py-1.5 rounded-lg ring-1 ring-base-300'>
          <div
            className='tooltip'
            data-tip='Heading 1'
          >
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={classNames(
                'hover:bg-base-100 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-300': editor.isActive('heading', { level: 1 }) }
              )}
            >
              <Icons.H1 size={20} />
            </button>
          </div>
          <div
            className='tooltip'
            data-tip='Heading 2'
          >
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={classNames(
                'hover:bg-base-300 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-200': editor.isActive('heading', { level: 2 }) }
              )}
            >
              <Icons.H2 size={20} />
            </button>
          </div>
          <div
            className='tooltip'
            data-tip='Heading 3'
          >
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={classNames(
                'hover:bg-base-300 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-200': editor.isActive('heading', { level: 3 }) }
              )}
            >
              <Icons.H3 size={20} />
            </button>
          </div>
          <div
            className='tooltip'
            data-tip='Ordered List'
          >
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={classNames(
                'hover:bg-base-300 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-200': editor.isActive('orderedList') }
              )}
            >
              <Icons.OrderedList size={20} />
            </button>
          </div>
          <div
            className='tooltip'
            data-tip='Bullet List'
          >
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={classNames(
                'hover:bg-base-300 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-200': editor.isActive('bulletList') }
              )}
            >
              <Icons.BulletList size={20} />
            </button>
          </div>
          <div
            className='tooltip'
            data-tip='Code Block'
          >
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={classNames(
                'hover:bg-base-300 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-200': editor.isActive('codeBlock') }
              )}
            >
              <Icons.Codeblock size={20} />
            </button>
          </div>
          <div
            className='tooltip'
            data-tip='Blockquote'
          >
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={classNames(
                'hover:bg-base-300 hover:cursor-pointer p-1.5 rounded-sm',
                { 'bg-base-200': editor.isActive('blockquote') }
              )}
            >
              <Icons.Blockquote size={20} />
            </button>
          </div>
        </div>
      </FloatingMenu>
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
