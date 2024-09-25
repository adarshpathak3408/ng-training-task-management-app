// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    assignedTo: { type: String, required: true }, // Add this field if it's part of your form
    status: { type: String, required: true },     // Add this field if it's part of your form
    dueDate: { type: Date, required: true },      // Make sure this field is required
    priority: { type: String, required: true },   // Add this field if it's part of your form
    comments: { type: String },                    // This can be optional
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;






// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String },
// });

// const Task = mongoose.model('Task', taskSchema);
// module.exports = Task;



// PEHLA COMMENT //
// const TaskSchema = new mongoose.Schema({
//     assignedTo: { type: String, required: true },
//     status: { type: String, required: true },
//     dueDate: { type: Date, required: true },
//     priority: { type: String, required: true },
//     description: { type: String }
// });

// module.exports = mongoose.model('Task', TaskSchema);
