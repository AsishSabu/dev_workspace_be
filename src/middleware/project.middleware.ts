import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

import { Project } from "../models/project.model";
import { ProjectMember } from "../models/projectMember.model";

export const requireProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  if (project.ownerId === userId) {
    req.project = project;
    req.projectRole = "owner";

    return next();
  }

  const member = await ProjectMember.findOne({
    projectId,
    userId,
  });

  if (!member) {
    return res.status(403).json({
      success: false,
      message: "You are not a member of this project",
    });
  }

  req.project = project;
  req.projectRole = member.role;

  next();
};
