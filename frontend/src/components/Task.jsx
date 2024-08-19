import React from 'react';
import TaskItem from './TaskItem';

const Task = ({ tasks, onDelete, onUpdate, view }) => {
  return (
    <div className={view === 'list' ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '}>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} view={view} />
      ))}
    </div>
  );
};

export default Task;
