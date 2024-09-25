const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Test endpoint
router.get('/test', (req, res) => {
    res.send('Backend is connected!');
});

// POST endpoint to create a new task
router.post('/', async (req, res) => {
    const newTask = new Task(req.body); // Create a new task instance
    try {
        const savedTask = await newTask.save(); // Save the task to the database
        console.log('Task saved:', savedTask); // Log to terminal
        res.status(201).json(savedTask); // Send response with the saved task
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving task' });
    }
});


// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        assignedTo: req.body.assignedTo,
        status: req.body.status,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        description: req.body.description
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit a task
router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');

        task.assignedTo = req.body.assignedTo || task.assignedTo;
        task.status = req.body.status || task.status;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.priority = req.body.priority || task.priority;
        task.description = req.body.description || task.description;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
