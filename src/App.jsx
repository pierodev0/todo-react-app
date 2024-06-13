import { useState } from 'react';
import IconTrash from './components/icons/IconTrash';
import IconEdit from './components/icons/IconEdit';
import { initialTasks } from './data';
import Modal from './components/ui/Modal';
import Swal from 'sweetalert2';

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const todoTasks = tasks.filter((t) => t.done == false);
  function onAddTask(task) {
    setTasks((t) => [...t, task]);
  }
  function onDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
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
        {todoTasks.length > 0 ? (
          <ListTasks
            tasks={tasks}
            onCompletedTasks={onCompletedTasks}
            onDeleteTask={onDeleteTask}
          />
        ) : (
          <div className='p-4 px-6'>
            <p className='italic text-gray-400'>No hay tareas por hacer</p>
          </div>
        )}
        <hr />
        <CompletedTasks
          tasks={tasks}
          onCompletedTasks={onCompletedTasks}
          onDeleteTask={onDeleteTask}
        />
        <Form onAddTask={onAddTask} />
      </main>
    </>
  );
}

function Task({ onCompletedTasks, task, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.text);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (e) => {
    setTaskText(e.target.innerText);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Aquí puedes llamar a una función para guardar los cambios, si es necesario
  };
  return (
    <div className='flex items-center gap-2'>
      <input
        type='checkbox'
        className='rounded-full p-2'
        checked={task.done}
        onChange={() => onCompletedTasks(task.id)}
      />

      <p
        contentEditable={isEditing}
        className={`px-2 py-1 ${task.done ? 'line-through' : null}`}
      >
        {task.text}
      </p>
      <div className='flex-1'></div>
      <div className='flex'>
        <IconEdit onClick={handleEditClick} />
        <IconTrash onClick={() => onDeleteTask(task.id)} />
      </div>
    </div>
  );
}

function ListTasks({ tasks, onCompletedTasks, onDeleteTask }) {
  const todoTasks = tasks.filter((t) => t.done == false);
  return (
    <div className='p-4 px-6'>
      {todoTasks.map((task) => (
        <Task
          key={task.id}
          text={task.text}
          onCompletedTasks={onCompletedTasks}
          task={task}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
function CompletedTasks({ tasks, onCompletedTasks, onDeleteTask }) {
  const completedTasks = tasks.filter((t) => t.done == true);
  return (
    <section>
      <div className='flex justify-between gap-4 px-6 pb-2 pt-2 font-medium'>
        <h2 className='pb-1'>Completadas</h2>
        <h2 className='px-2'>+</h2>
      </div>
      <div className='px-6'>
        {completedTasks.map((task) => (
          <Task
            key={task.id}
            onCompletedTasks={onCompletedTasks}
            task={task}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </section>
  );
}
function Form({ onAddTask }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setTask('');
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) {
      Swal.fire({
        title: 'Campo vacio!',
        text: 'Agrega una tarea',
        icon: 'error',
      });
      return;
    }

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
