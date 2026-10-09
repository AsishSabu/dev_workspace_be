import { Router } from "express";
import { requireAuth } from "./../middleware/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { validate } from "./../middleware/validation.middleware";

const router = Router();

router.post(
  "/projects/:projectId/tasks",
  requireAuth,
  validate(createTaskSchema),
  createTask,
);

router.get("/projects/:projectId/tasks", requireAuth, getTasks);

router.get("/projects/:projectId/tasks/:taskId", requireAuth, getTask);

router.patch(
  "/projects/:projectId/tasks/:taskId",
  requireAuth,
  validate(updateTaskSchema),
  updateTask,
);

router.delete("/projects/:projectId/tasks/:taskId", requireAuth, deleteTask);

export default router;
