import { useState } from 'react';
import { initialTasks } from './data';
import Modal from './components/ui/Modal';
import Swal from 'sweetalert2';
import Task from './components/ui/Task';

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const todoTasks = tasks.filter((t) => t.done == false);
  function onAddTask(task) {
    setTasks((t) => [...t, task]);
  }
  function onDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }
  function onEditTask(task) {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...task } : t)));
  }
  function onCompletedTasks(id) {
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
            onEditTask={onEditTask}
          />
        ) : (
          <div className='p-4 wrapper'>
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

function ListTasks({ tasks, onCompletedTasks, onDeleteTask, onEditTask }) {
  const todoTasks = tasks.filter((t) => t.done == false);
  return (
    <div className='p-4 px-6 wrapper'>
      {todoTasks.map((task) => (
        <Task
          key={task.id}
          text={task.text}
          onCompletedTasks={onCompletedTasks}
          task={task}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}
function CompletedTasks({ tasks, onCompletedTasks, onDeleteTask }) {
  const completedTasks = tasks.filter((t) => t.done == true);
  return (
    <section className='wrapper'>
      <div className='flex justify-between gap-4 pb-2 pt-2 font-medium '>
        <h2 className='pb-1'>Completadas</h2>
        <h2 className='px-2'>+</h2>
      </div>
      <div className=''>
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
          <form
            action=''
            className='p-6'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              className='w-full rounded-md p-2'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              autoFocus={true}
            />
            <div
              className='modal-actions'
              onSubmit={handleSubmit}
            >
              
              <div className='flex-1'></div>
              <button
                className='button'
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button className='button'>Save</button>
            </div>
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
      <div className='flex justify-center gap-4 px-6 pb-6 font-medium'>
        <h2 className=''>Mis tareas</h2>
        <h2 className=''>+Nueva lista</h2>
      </div>
      <hr />
    </header>
  );
}
export default App;
