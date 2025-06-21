// borrow.controller.ts
import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  const { book: bookId, quantity, dueDate } = req.body;

  // Update book stock using static method
  const book = await Book.borrowBook(bookId, quantity);

  // ✅ Create borrow record
  const borrowRecord = await Borrow.create({
    book: (book as any)._id,
    quantity,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: borrowRecord,
  });
});

// Summary of all borrowed books
borrowRoutes.get("/", async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books", // 🔁 must match actual MongoDB collection name (lowercase, plural)
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
});
