import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ isOpen, onClose, onEdit, task }) => {
  const [updatedTask, setUpdatedTask] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });

  useEffect(() => {
    if (task) {
      setUpdatedTask({
        assignedTo: task.assignedTo || '',
        status: task.status || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        priority: task.priority || '',
        comments: task.comments || ''
      });
    }
  }, [task]);

  // Handle the Save button click
  const handleSave = () => {
    onEdit({
      ...task,
      assignedTo: updatedTask.assignedTo,
      status: updatedTask.status,
      dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate).toISOString() : '',
      priority: updatedTask.priority,
      comments: updatedTask.comments
    });
    onClose();
  };

  // Render nothing if the modal is not open
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Task</h2>
        
        <input
          type="text"
          value={updatedTask.assignedTo}
          onChange={(e) => setUpdatedTask({ ...updatedTask, assignedTo: e.target.value })}
          placeholder="Assigned To"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          type="text"
          value={updatedTask.status}
          onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
          placeholder="Status"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          type="date"
          value={updatedTask.dueDate}
          onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
          placeholder="Due Date"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          type="text"
          value={updatedTask.priority}
          onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
          placeholder="Priority"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <textarea
          value={updatedTask.comments}
          onChange={(e) => setUpdatedTask({ ...updatedTask, comments: e.target.value })}
          placeholder="Comments"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 h-24"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
