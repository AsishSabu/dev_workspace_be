import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { WorkspaceMember } from "../models/workspaceMember.model";

export const requireWorkspaceMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);
    const { workspaceId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!workspaceId || !mongoose.isValidObjectId(workspaceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid workspace ID",
      });
    }

    const membership = await WorkspaceMember.exists({
      workspaceId,
      userId,
    });

    if (!membership) {
      return res.status(403).json({
        success: false,
        message: "You are not a member of this workspace",
      });
    }

    next();
  } catch (error) {
    console.error("Workspace authorization error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify workspace access",
    });
  }
};
