import React, { useState } from 'react';
import "../styles/styles.css";
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillSaveFill } from 'react-icons/bs';

const TaskItem = ({ task, onDelete, onUpdate, view }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);

  const handleTaskNameChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setEditedTaskName(task.name);
  };

  const handleUpdateTask = () => {
    onUpdate(task._id, editedTaskName, task.completed);
    setEditMode(false);
  };

  return (
    <div
      className={
        view === 'list'
          ? 'flex items-center justify-between p-4 my-2 bg-transparent rounded shadow-md border-2 border-emerald-500'
          : 'flex flex-col items-start p-4 my-2 bg-transparent rounded shadow-md border-2 border-emerald-500'
      }
    >
      <div className={view === 'list' ? 'flex items-center' : 'flex items-center mb-2'}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate(task._id, editedTaskName, !task.completed)}
          className="mr-2 rounded-checkbox"
        />
        {editMode ? (
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            value={editedTaskName}
            onChange={handleTaskNameChange}
          />
        ) : (
          <p className={task.completed ? 'line-through text-gray-500' : 'text-slate-950 font-bold'}>
            {task.name}
          </p>
        )}
      </div>
      <div className="flex">
        {editMode ? (
          <BsFillSaveFill
            className="text-green-500 hover:text-green-700 text-2xl ml-4 mr-4"
            onClick={handleUpdateTask}
          />
        ) : (
          <AiOutlineEdit
            className={`text-2xl ${
              view === 'list' ? 'text-blue-800' : 'text-green-800'
            } hover:${view === 'list' ? 'text-blue-300' : 'text-green-300'} mr-4`}
            onClick={handleToggleEditMode}
          />
        )}
        <MdOutlineDelete
          className="text-2xl text-red-600 hover:text-red-800 ml-6"
          onClick={() => onDelete(task._id)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
