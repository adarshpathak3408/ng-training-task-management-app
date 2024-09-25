// src/App.js
import React from 'react';
import { useEffect } from 'react';
import TaskTable from './components/TaskTable';
import './App.css';
import './index.css'

function App() {
  useEffect(() => {
    const checkConnection = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tasks/test');
            if (response.ok) {
                const message = await response.text();
                console.log(message); // Should log "Backend is connected!"
            } else {
                console.error('Backend is not reachable');
            }
        } catch (error) {
            console.error('Error connecting to backend:', error);
        }
    };

    checkConnection();
}, []);



  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-blue-700 hover:text-blue-500 transition duration-300">
        Task Management App
      </h1>
      <TaskTable />
    </div>
  );
}

export default App;
