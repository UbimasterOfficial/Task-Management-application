const mongoose = require('mongoose');
const Task = require('../models/Task');

const allowedStatuses = ['pending', 'in-progress', 'completed'];
const allowedPriorities = ['low', 'medium', 'high'];

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getTasks(req, res, next) {
  try {
    const filter = {};

    if (req.query.status) {
      if (!allowedStatuses.includes(req.query.status)) {
        return res.status(400).json({
          message: 'Invalid status. Use pending, in-progress, or completed.',
        });
      }
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
}

async function getTaskById(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description = '', priority = 'medium' } = req.body;

    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (typeof description !== 'string') {
      return res.status(400).json({ message: 'Description must be a string' });
    }

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: 'Priority must be low, medium, or high' });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
}

async function updateTaskStatus(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be pending, in-progress, or completed',
      });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task id' });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskStatus,
  deleteTask,
};
