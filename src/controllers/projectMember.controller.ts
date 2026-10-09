import { Request, Response } from "express";
import { ProjectMember } from "../models/projectMember.model";

export const getProjectMembers = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const members = await ProjectMember.find({ projectId }).sort({
    createdAt: -1,
  });
  return res.status(200).json({ success: true, data: members });
};

export const addProjectMember = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;
  const existingMember = await ProjectMember.findOne({ projectId, userId });
  if (existingMember) {
    return res
      .status(400)
      .json({ success: false, message: "User is already a member" });
  }
  if (req.project.ownerId === userId) {
    return res.status(400).json({
      success: false,
      message: "Project owner is already a member as owner",
    });
  }
  const member = await ProjectMember.create({
    projectId,
    userId,
    role,
  });
  return res.status(201).json({
    success: true,
    message: "Member added successfully",
    data: member,
  });
};

export const updateProjectMember = async (req: Request, res: Response) => {
  const { projectId, userId } = req.params;

  const { role } = req.body;

  const member = await ProjectMember.findOneAndUpdate(
    {
      projectId,
      userId,
    },
    {
      role,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Project member not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Member role updated successfully",
    data: member,
  });
};

export const removeProjectMember = async (req: Request, res: Response) => {
  const { projectId, userId } = req.params;

  const member = await ProjectMember.findOneAndDelete({
    projectId,
    userId,
  });

  if (!member) {
    return res.status(404).json({
      success: false,
      message: "Project member not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
};
