// src/Tiptap.jsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

// define your extension array
const extensions = [StarterKit];


const Tiptap = () => {
  const [text, setText] = useState("Hello");
  const editor = useEditor({
    extensions,
    content: text,
    onCreate({ editor }) {
      editor.setEditable(false);
    },
    onUpdate({ editor }) {
      // The content has changed.

      setText(editor?.getText());
    },

    onBlur({ editor, event }) {
      // The editor isn’t focused anymore.
      // setText(editor?.getText());
      editor.setEditable(false)
    },
  });
  function handleClick() {
    editor.setEditable(true)
    editor.chain().focus('end').run();
  }
  return (
    <div className='flex justify-between p-4'>
      <button onClick={handleClick}>Editar</button>
      <EditorContent editor={editor} className='line-through '/>
    </div>
  );
};

export default Tiptap;
