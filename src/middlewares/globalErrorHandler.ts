import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // ✅ Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";

    res.status(statusCode).json({
      success: false,
      message,
      error: {
        name: err.name,
        errors: err.errors,
      },
    });
    return;
  }

  // ✅ CastError (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // ✅ Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} must be unique`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};
