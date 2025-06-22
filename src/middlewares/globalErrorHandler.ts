// globalErrorHandler.ts
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  // 🛑 Handle Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    res.status(400).json({
      success: false,
      message: `${field} must be unique`,
      error: {
        name: "DuplicateKeyError",
        field,
        value,
      },
    });
    return;
  }

  // 🛠 Handle Validation Error
  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: err,
    });
    return;
  }

  // 🔧 Default fallback
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message || err,
  });
};
