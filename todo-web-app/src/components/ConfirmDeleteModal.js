// src/components/ConfirmDeleteModal.js
import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, assignedTo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Delete</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete the task assigned to <strong>{assignedTo}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white rounded-md px-4 py-2 mr-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Yes, Delete
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

export default ConfirmDeleteModal;
