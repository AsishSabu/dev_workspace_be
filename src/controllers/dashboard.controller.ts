import { getAuth } from "@clerk/express";
import { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
