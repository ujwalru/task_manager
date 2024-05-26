import React, { useState } from 'react';
import "../styles/styles.css";
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import {AiOutlineEdit} from "react-icons/ai";
import { BsFillSaveFill } from 'react-icons/bs';

const Task = ({ task, onDelete, onUpdate }) => {
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
    <div className="flex items-center justify-between p-4 my-2 bg-transparent rounded shadow-md border-2  border-emerald-500">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onUpdate(task._id, editedTaskName, !task.completed)}
          className="mr-4 rounded-checkbox"
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
      <div className="flex items-center">
        {editMode ? (
          
          <BsFillSaveFill className="text-green-500 hover:text-green-700 text-2xl ml-4 mr-4" onClick={handleUpdateTask} />
        ) : (
         
        <AiOutlineEdit className="text-2xl text-blue-800 hover:text-blue-300 mr-4" onClick={handleToggleEditMode} />
          

        )}
        {/* <button onClick={() => onDelete(task._id)} className="bg-red-500 hover:text-red-700 rounded ml-4">
          Delete
        </button> */}
        <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-800' onClick={() => onDelete(task._id)} />
      </div>
    </div>
  );
};

export default Task;
