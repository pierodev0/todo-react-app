import { useState } from 'react';
import IconTrash from './components/icons/IconTrash';
import IconEdit from './components/icons/IconEdit';
import { initialTasks } from './data';
import Modal from './components/ui/Modal';

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  function onAddTask(task) {
    setTasks((t) => [...t, task]);
  }
  function deleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  function handleDelete(id) {
    deleteTask(id);
  }

  function onCompletedTasks(id) {
    console.log(id);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
  return (
    <>
      <main className='relative h-screen'>
        <Header />
        <ListTasks
          tasks={tasks}
          onCompletedTasks={onCompletedTasks}
        />
        <hr />
        <CompletedTasks
          tasks={tasks}
          onCompletedTasks={onCompletedTasks}
        />
        <Form onAddTask={onAddTask} />
      </main>
    </>
  );
}

function Task({ onCompletedTasks, task }) {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        className='rounded-full p-2'
        checked={task.done}
        onChange={() => onCompletedTasks(task.id)}
      />

      <p
        // contentEditable='false'
        className={`px-2 py-1 ${task.done ? 'line-through' : null}`}
      >
        {task.text}
      </p>
      <div className='flex-1'></div>
      <div className='flex'>
        <IconEdit />
        <IconTrash />
      </div>
    </div>
  );
}

function ListTasks({ tasks, onCompletedTasks }) {
  const todoTasks = tasks.filter((t) => t.done == false);
  return (
    <div className='p-4 px-6'>
      {todoTasks.map((task) => (
        <Task
          key={task.id}
          text={task.text}
          onCompletedTasks={onCompletedTasks}
          task={task}
        />
      ))}
    </div>
  );
}
function CompletedTasks({ tasks, onCompletedTasks }) {
  const completedTasks = tasks.filter((t) => t.done == true);
  return (
    <section>
      <div className='flex justify-between gap-4 px-6 pb-2 pt-2 font-medium'>
        <h2 className='pb-1'>Completadas</h2>
        <h2 className=''>+</h2>
      </div>
      <div className='px-6'>
        {completedTasks.map((task) => (
          <Task
            key={task.id}
            onCompletedTasks={onCompletedTasks}
            task={task}
          />
        ))}
      </div>
    </section>
  );
}
function Form({ onAddTask }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [task, setTask] = useState('');
  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      id: crypto.randomUUID(),
      text: task,
      done: false,
    };
    onAddTask(newTask);
    setTask('');
    closeModal();
  }
  return (
    <div className='absolute bottom-0 flex w-full justify-end bg-gray-200 px-4 py-2 dark:bg-sky-700'>
      <button
        type='submit'
        className='size-10 rounded-lg bg-sky-300 text-2xl font-medium'
        onClick={() => openModal()}
      >
        +
      </button>
      {modalIsOpen && (
        <Modal>
          <header className='p-6 pb-0'>
            <h2 className='text-2xl dark:text-blue-800'>Nueva tarea</h2>
          </header>
          <div
            action=''
            className='p-6'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              className='w-full rounded-md p-2'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <form
            className='modal-actions'
            onSubmit={handleSubmit}
          >
            <button className='button'>Reset</button>
            <div className='flex-1'></div>
            <button
              className='button'
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button className='button'>Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className='pt-8'>
      <h1 className='pb-5 text-center text-2xl font-medium'>Tareas</h1>
      <div className='flex justify-center gap-4 px-6 pb-2 font-medium'>
        <h2 className=''>Mis tareas</h2>
        <h2 className=''>+Nueva lista</h2>
      </div>
      <hr />
    </header>
  );
}
export default App;
