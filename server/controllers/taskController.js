const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const task = await Task.create({
            userId: req.userId,
            title,
            description
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.userId
        }).sort({
            createdAt: -1
        });

        res.json({
            tasks
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await Task.findOneAndUpdate(
            {
                _id: id,
                userId: req.userId
            },
            {
                title,
                description,
                status
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};