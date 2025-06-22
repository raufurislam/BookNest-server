// globalErrorHandler.ts
import { ErrorRequestHandler } from "express";

export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  // 🛑 Handle Duplicate Key Error (e.g., ISBN uniqueness)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];

    return res.status(400).json({
      message: `${field.toUpperCase()} must be unique`,
      success: false,
      error: {
        name: "DuplicateKeyError",
        field,
        value,
      },
    });
  }

  // 🛠 Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }

  // 🔧 Fallback for other unknown errors
  return res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: err.message || err,
  });
};
