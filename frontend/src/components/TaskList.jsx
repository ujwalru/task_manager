import React from 'react';
import Task from './Task';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete, onUpdate, view }) => {
  return (
    <div className={view === 'list' ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '}>
      {tasks.map((task) =>
        view === 'list' ? (
          <Task key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
        ) : (
          <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
        )
      )}
    </div>
  );
};

export default TaskList;
