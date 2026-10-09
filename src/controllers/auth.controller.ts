import { getAuth } from "@clerk/express";
import { Response } from "express";
import { Request } from "express";
export const getCurrentUser = (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  return res.status(200).json({
    success: true,
    userId,
  });
};
