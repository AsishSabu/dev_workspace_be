import type { NextFunction, Request, Response } from "express";

type ProjectRole = "owner" | "admin" | "member";

export const requireProjectRole = (...allowedRoles: ProjectRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.projectRole;

    if (!role) {
      return res.status(403).json({
        success: false,
        message: "Project role not found",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission",
      });
    }

    next();
  };
};
