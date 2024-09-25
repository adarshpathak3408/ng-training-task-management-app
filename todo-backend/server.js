const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express app
const app = express();
app.use(express.json()); // For parsing application/json
const PORT = 3001;

// Middleware
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://adarsh02:adarsh3408@cluster0.oefu2.mongodb.net/todo-web-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Task model
const Task = mongoose.model('Task', new mongoose.Schema({
    assignedTo: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true },
    comments: { type: String }
}));

// API route to add a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { assignedTo, status, dueDate, priority, comments } = req.body;

        // Ensure dueDate is provided and convert it to a Date object
        if (!dueDate) {
            return res.status(400).json({ error: 'dueDate is required' });
        }

        const task = new Task({
            assignedTo,
            status,
            dueDate: new Date(dueDate), // Ensure it's a Date object
            priority,
            comments,
        });

        await task.save();

        // Log the saved task to the terminal
        console.log('Task saved:', task); // Log the entire task object

        // Format the response data to only include the date part
        const responseData = {
            ...task.toObject(),
            dueDate: task.dueDate.toISOString().split('T')[0], // Format to 'YYYY-MM-DD'
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ error: 'Error saving task' });
    }
});



// API to update an existing task
app.put('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = req.body;
  
      // Find the task by ID and update it
      const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Error updating task' });
    }
  });

// GET endpoint to fetch all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks from the database
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});
  
// Define a DELETE route to delete a task by ID
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
