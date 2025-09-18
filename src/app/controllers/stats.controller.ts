import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

export const statsRoutes = express.Router();

// analytics summary
statsRoutes.get("/", async (req: Request, res: Response, next) => {
  try {
    const [borrowAgg] = await Borrow.aggregate([
      {
        $group: {
          _id: null,
          totalBorrowedQuantity: { $sum: "$quantity" },
          totalBorrowRecords: { $sum: 1 },
        },
      },
    ]);

    const [booksAgg] = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          totalCopies: { $sum: "$copies" },
        },
      },
    ]);

    const data = {
      totalBorrowedQuantity: borrowAgg?.totalBorrowedQuantity || 0,
      totalBorrowRecords: borrowAgg?.totalBorrowRecords || 0,
      totalBooks: booksAgg?.totalBooks || 0,
      totalCopies: booksAgg?.totalCopies || 0,
    };

    res.status(200).json({
      success: true,
      message: "Analytics summary",
      data,
    });
  } catch (err) {
    next(err);
  }
});
