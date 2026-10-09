import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { isAuthenticated } = getAuth(req);
  if (!isAuthenticated) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  next();
};
