import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.log(error);
  const statusCode =
    typeof error.statusCode === "number" ? error.statusCode : 500;

  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
