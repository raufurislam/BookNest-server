// borrow.controller.ts
import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

// to wrap async route handlers and forward errors to next()
function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// create a borrow
// borrow.controller.ts
import { createBorrowZodSchema } from "../validators/borrow.zod.validator";

borrowRoutes.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    // ✅ Zod validation
    const parsed = createBorrowZodSchema.safeParse(req.body);
    if (!parsed.success) throw parsed.error;

    const { book, quantity, dueDate } = parsed.data;

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  })
);

// Summary of all borrowed books
borrowRoutes.get("/", async (req: Request, res: Response, next) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
});
