// middlewares/globalErrorHandler.ts
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  // Manual duplicate ISBN error
  if (err.name === "DuplicateKeyError") {
    return res.status(409).json({
      message: err.message,
      success: false,
      error: {
        name: err.name,
        field: err.field,
        value: err.value,
      },
    });
  }

  // Mongoose Duplicate Key Error
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

  // Zod Error Handler
  if (err instanceof ZodError) {
    const formattedErrors: Record<string, any> = {};
    err.errors.forEach((issue) => {
      const path = issue.path[0] as string;

      // Determine if the issue is a missing required field
      const isRequiredMissing =
        issue.code === "invalid_type" && issue.received === "undefined";

      formattedErrors[path] = {
        message: isRequiredMissing ? "Required" : issue.message,
        name: "ValidatorError",
        properties: {
          message: isRequiredMissing ? "Required" : issue.message,
          type: isRequiredMissing ? "required" : issue.code,
          ...(issue.code === "too_small" && issue.minimum !== undefined
            ? { min: issue.minimum }
            : {}),
        },
        kind: isRequiredMissing ? "required" : issue.code,
        path,
        value: issue?.fatal ? undefined : (issue as any)?.received,
      };
    });

    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: formattedErrors,
      },
    });
  }

  // Mongoose validation error (already in similar format)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }

  // Default fallback
  return res.status(500).json({
    message: "Something went wrong",
    success: false,
    error: err.message || err,
  });
};
