import { useState } from 'react';
import IconEdit from '../icons/IconEdit';
import IconTrash from '../icons/IconTrash';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// define your extension array
const extensions = [StarterKit];

function Task({ onCompletedTasks, task, onDeleteTask, onEditTask }) {
  const [taskText, setTaskText] = useState(task.text);
  const editor = useEditor({
    extensions,
    content: taskText,
    onCreate({ editor }) {
      editor.setEditable(false);
    },
    onUpdate({ editor }) {
      // The content has changed.

      setTaskText(editor?.getText());
    },

    onBlur({ editor, event }) {
      // The editor isn’t focused anymore.
      // setText(editor?.getText());
      editor.setEditable(false);

      const editedTask = {
        ...task,
        text: taskText,
      };
      onEditTask(editedTask);
    },
  });

  function handleClick() {
    editor.setEditable(true);
    editor.chain().focus('end').run();
  }

  return (
    <div className='flex flex-1 items-center gap-2'>
      <input
        type='checkbox'
        className='rounded-full p-2'
        checked={task.done}
        onChange={() => onCompletedTasks(task.id)}
      />
      <EditorContent
        editor={editor}
        className={`w-full  px-2 py-1 ${task.done ? 'line-through' : ''}`}
      />
        <div className="flex-1"></div>
      <div className='flex flex-shrink-0'>
        <IconEdit onClick={handleClick} />
        <IconTrash onClick={() => onDeleteTask(task.id)} />
      </div>
    </div>
  );
}

export default Task;
