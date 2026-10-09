import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { Project } from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { name, description } = req.body;

  const project = await Project.create({ name, description, ownerId: userId });
  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
};

export const getProjects = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const projects = await Project.find({ ownerId: userId }).sort({
    createdAt: -1,
  });
  return res.status(200).json({
    success: true,
    data: projects,
  });
};

export const getProject = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { projectId } = req.params;
  const project = await Project.findOne({ _id: projectId, ownerId: userId });

  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }
  return res.status(200).json({
    success: true,
    data: project,
  });
};

export const updateProject = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { projectId } = req.params;
  const { name, description } = req.body;
  const project = await Project.findOneAndUpdate(
    { _id: projectId, ownerId: userId },
    { name, description },
    { new: true, runValidators: true },
  );

  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }
  return res.status(200).json({
    success: true,
    data: project,
  });
};
export const deleteProject = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  const { projectId } = req.params;
  const project = await Project.findOneAndDelete({
    _id: projectId,
    ownerId: userId,
  });

  if (!project) {
    return res.status(404).json({ success: false, error: "Project not found" });
  }
  return res.status(200).json({
    success: true,
    data: project,
  });
};
