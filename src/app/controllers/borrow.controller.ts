import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { createBorrowZodSchema } from "../validators/borrow.zod.validator";
import { asyncHandler } from "../../middlewares/asyncHandler";

export const borrowRoutes = express.Router();

// create a borrow
borrowRoutes.post(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const parsed = createBorrowZodSchema.safeParse(req.body);
      if (!parsed.success) throw parsed.error;

      const { book, quantity, dueDate } = parsed.data;

      const borrowRecord = await Borrow.create({ book, quantity, dueDate });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    } catch (err) {
      next(err);
    }
  })
);

// all borrowed books
borrowRoutes.get("/", async (req: Request, res: Response, next) => {
  try {
    const summary = await Borrow.aggregate([
      // Group borrow records by book ID and sum the quantities
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
          dueDates: { $push: "$dueDate" }, // <-- collect dueDates
        },
      },

      // Join with the books collection to get book details
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },

      // Flatten the joined bookInfo array
      {
        $unwind: "$bookInfo",
      },

      // Format the final output with selected fields
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
          dueDates: 1, // include dueDates array
        },
      },
    ]);

    // Send the result as JSON response
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
});
