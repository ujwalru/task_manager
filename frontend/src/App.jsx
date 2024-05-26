import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import "./styles/styles.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'card'
  const [showAddTask, setShowAddTask] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!taskName) return;
    const newTask = { name: taskName };
    try {
      const savedTask = await createTask(newTask);
      setTasks([...tasks, savedTask]);
      setTaskName('');
      setShowAddTask(false);
    } catch (error) {
      setError('Failed to create task');
    }
  };

  const toggleTask = async (id, name, completed) => {
    const updatedTask = { name, completed };
    try {
      await updateTask(id, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)));
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const deleteTaskHandler = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className='home_page'>
    <div className="container mx-auto p-4">
     
      <div className="flex justify-between mb-4">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <div>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
        >
          {showAddTask ? 'Close Form' : 'Add Task'}
        </button>
        <button
          onClick={() => setView(view === 'list' ? 'card' : 'list')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {view === 'list' ? 'Card View' : 'List View'}
        </button>
        </div>
      </div>
      {showAddTask && (
        <div className="mb-4 flex">
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg w-full mb-2 mr-4"
            placeholder="Add a new task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-3 rounded-lg">
            Add Task
          </button>
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TaskList tasks={tasks} onDelete={deleteTaskHandler} onUpdate={toggleTask} view={view} />
    </div>
    </div>
  );
};

export default App;
