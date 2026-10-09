import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { Project } from "../models/project.model";
import { Task } from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const projectId = Array.isArray(req.params.projectId)
    ? req.params.projectId[0]
    : req.params.projectId;
  const project = await Project.findOne({ _id: projectId, ownerId: userId });
  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }

  const { title, description, status, priority } = req.body;
  const task = await Task.create({
    description,
    ownerId: userId,
    projectId,
    title,
    status,
    priority,
  });
  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
};

export const getTasks = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { projectId } = req.params;
  const project = await Project.findOne({ _id: projectId, ownerId: userId });

  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }

  const tasks = await Task.find({ projectId, ownerId: userId }).sort({
    createdAt: -1,
  });
  return res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTask = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { projectId, taskId } = req.params;
  const task = await Task.findOne({ _id: taskId, projectId, ownerId: userId });
  if (!task) {
    return res.status(404).json({ success: false, error: "Task not found" });
  }
  return res.status(200).json({
    success: true,
    data: task,
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { projectId, taskId } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: taskId, projectId, ownerId: userId },
    req.body,
    { new: true, runValidators: true },
  );
  if (!task) {
    return res.status(404).json({ success: false, error: "Task not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  const { projectId, taskId } = req.params;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    projectId,
    ownerId: userId,
  });
  if (!task) {
    return res.status(404).json({ success: false, error: "Task not found" });
  }
  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task,
  });
};
