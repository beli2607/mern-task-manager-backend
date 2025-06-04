const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id }); // Only return this user's tasks
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title } = req.body;

    const task = new Task({
        title,
        user: req.user._id // Automatically link to logged-in user
    });

    const saved = await task.save();
    res.status(201).json(saved);
};

exports.updateTask = async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(updated);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
};