import React from 'react';
import TaskRow from './TaskRow';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-5 border-b text-left">Assigned To</th>
            <th className="py-3 px-5 border-b text-left">Status</th>
            <th className="py-3 px-5 border-b text-left">Due Date</th>
            <th className="py-3 px-5 border-b text-left">Priority</th>
            <th className="py-3 px-5 border-b text-left">Comments</th>
            <th className="py-3 px-5 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow 
              key={task.id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
