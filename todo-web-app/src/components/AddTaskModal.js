import React, { useState } from 'react';

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Task added:', data);
      onAdd(data); // Optional, to update the UI if necessary
      onClose(); // Close the modal after adding the task
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add New Task</h2>
        <input
          name="assignedTo"
          placeholder="Assigned To"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="status"
          placeholder="Status"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="dueDate"
          type="date"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="priority"
          placeholder="Priority"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="comments"
          placeholder="Comments"
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
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

export default AddTaskModal;
