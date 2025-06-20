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
