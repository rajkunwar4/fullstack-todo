import { Task } from "../models/tasks.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user,
    });
    console.log("new task created");
    res.json({
      message: "Task created",
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const upadateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return next(new Error("Invalid id for update"));
    }
    task.isComplete = !task.isComplete;
    await task.save();

    return res.json({
      message: "updated task",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return next(new Error("Invalid id for delete"));
    }
    //deleting the task
    await task.deleteOne();

    res.json({
      message: "deleted task",
    });
  } catch (err) {
    next(err);
  }
};
