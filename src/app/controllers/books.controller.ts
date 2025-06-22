// books.controller.ts
import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

// Create book
booksRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const book = await Book.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Get all books with filtering and sorting
booksRoutes.get("/", async (req: Request, res: Response, next) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    let query = Book.find();

    // Apply genre filter
    if (filter) {
      query = query.where("genre").equals(filter);
    }

    // Apply sorting
    const sortOrder = sort === "asc" ? 1 : -1;
    query = query.sort({ [sortBy as string]: sortOrder });

    // Apply limit
    query = query.limit(Number.parseInt(limit as string));

    const books = await query;

    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    next(err);
  }
});

// Get book by ID
booksRoutes.get("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
});

// Update book
booksRoutes.patch("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
});

// Update book
booksRoutes.patch("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
});

// Delete book
booksRoutes.delete("/:bookId", async (req: Request, res: Response, next) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
});
