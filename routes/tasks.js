import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createTask,
  deleteTask,
  getTask,
  upadateTask,
} from "../controllers/tasks.js";

export const taskRouter = express.Router();

taskRouter.post("/create", isAuthenticated, createTask);
taskRouter.get("/my", isAuthenticated, getTask);
taskRouter
  .route("/:id")
  .put(isAuthenticated, upadateTask)
  .delete(isAuthenticated, deleteTask);
