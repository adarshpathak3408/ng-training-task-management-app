import React from 'react';

const TaskRow = ({ task, onEdit, onDelete }) => {
  return (
    <tr className="bg-white hover:bg-gray-100 transition duration-200">
      <td className="border px-4 py-2">{task.assignedTo}</td>
      <td className="border px-4 py-2">{task.status}</td>
      <td className="border px-4 py-2">{new Date(task.dueDate).toLocaleDateString()}</td> {/* Format date */}
      <td className="border px-4 py-2">
        <span className={`font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
          {task.priority}
        </span>
      </td>
      <td className="border px-4 py-2">{task.comments}</td>
      <td className="border px-4 py-2 flex space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;
