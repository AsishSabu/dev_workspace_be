import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import authRouter from "./routes/auth.routes";
import projectRouter from "./routes/project.routes";
import taskRouter from "./routes/task.routes";
import projectMemberRouter from "./routes/projectMember.routes";
import workspaceRouter from "./routes/workspace.routes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Clerk authentication state
app.use(clerkMiddleware());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "DevTask API is running",
  });
});

app.use("/api/auth/", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
app.use("/api", projectMemberRouter);
app.use("/api/workspaces", workspaceRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
