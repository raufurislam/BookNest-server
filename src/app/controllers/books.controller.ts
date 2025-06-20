// books.controller.ts
import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

// create book data
booksRoutes.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

booksRoutes.get("/", async (req: Request, res: Response) => {
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
});
