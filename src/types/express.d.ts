import type { Project } from "../models/project.model";

declare global {
  namespace Express {
    interface Request {
      project?: Project;
      projectRole?: "owner" | "admin" | "member";
    }
  }
}

export {};
