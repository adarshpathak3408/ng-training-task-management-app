// src/components/TaskTable.js
import React, { useEffect, useState } from 'react';
import TaskRow from './TaskRow';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]); 
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        const formattedTasks = data.map((task) => ({
          ...task,
          id: task._id,
          dueDate: new Date(task.dueDate).toLocaleDateString(),
        }));
        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Error updating task');
      }

      const updatedTaskFromBackend = await response.json();
      setTasks(tasks.map(task => 
        task.id === updatedTaskFromBackend._id 
        ? { ...updatedTaskFromBackend, dueDate: new Date(updatedTaskFromBackend.dueDate).toLocaleDateString() } 
        : task
      ));

      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: newTask._id, dueDate: new Date(newTask.dueDate).toLocaleDateString() }]);
    setAddModalOpen(false);
  };

  const handleDeleteTask = (task) => {
    setCurrentTask(task);
    setConfirmDeleteOpen(true);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter(task => task.id !== currentTask.id)); 
    setConfirmDeleteOpen(false);
  };

  return (
    <div className="overflow-x-auto p-4">
      <button 
        onClick={() => setAddModalOpen(true)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        New Task
      </button>
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
              onEdit={(task) => { setCurrentTask(task); setEditModalOpen(true); }} 
              onDelete={() => handleDeleteTask(task)} 
            />
          ))}
        </tbody>
      </table>
      <AddTaskModal 
        isOpen={isAddModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onAdd={handleAddTask} 
      />
      <EditTaskModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        onEdit={handleEditTask} 
        task={currentTask} 
      />
      <ConfirmDeleteModal 
        isOpen={isConfirmDeleteOpen} 
        onClose={() => setConfirmDeleteOpen(false)} 
        onConfirm={confirmDeleteTask} 
        assignedTo={currentTask?.assignedTo} 
      />
    </div>
  );
};

export default TaskTable;
