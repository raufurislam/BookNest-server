// books.controller.ts
import express, { Request, Response, NextFunction } from "express";
import { Book } from "../models/books.model";
import {
  createBookZodSchema,
  updateBookZodSchema,
} from "../validators/book.zod.validator";
import { asyncHandler } from "../../middlewares/asyncHandler";

export const booksRoutes = express.Router();

booksRoutes.post(
  "/",
  asyncHandler(async (req, res, next) => {
    try {
      const parsed = createBookZodSchema.safeParse(req.body);
      if (!parsed.success) throw parsed.error;

      const { isbn } = parsed.data; //     // Manually check if the ISBN already exists (I tried to handle it in the model but couldn't, so I had to do it manually for now. I will fix it with support after the assignment submission.)
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        throw {
          name: "DuplicateKeyError",
          field: "isbn",
          value: isbn,
          message: "ISBN already exists",
        };
      }

      const book = await Book.create(parsed.data);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (err) {
      next(err);
    }
  })
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
// booksRoutes.patch("/:bookId", async (req: Request, res: Response, next) => {
//   try {
//     const bookId = req.params.bookId;
//     const updatedBody = req.body;
//     const book = await Book.findByIdAndUpdate(bookId, updatedBody, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Book updated successfully",
//       data: book,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// PUT: Fully replace a book (with validation)
booksRoutes.put(
  "/:bookId",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      // Get existing book
      const existingBook = await Book.findById(bookId);
      if (!existingBook) {
        return res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      // Merge existing data with new data
      const mergedData = {
        ...existingBook.toObject(), // Convert Mongoose doc to plain object
        ...req.body,
      };

      // Validate the merged full object
      const parsed = createBookZodSchema.safeParse(mergedData);
      if (!parsed.success) {
        throw parsed.error;
      }

      // Check for duplicate ISBN if it's being updated
      if (req.body.isbn) {
        const isbnExists = await Book.findOne({
          isbn: req.body.isbn,
          _id: { $ne: bookId },
        });
        if (isbnExists) {
          throw {
            name: "DuplicateKeyError",
            field: "isbn",
            value: req.body.isbn,
            message: "ISBN already exists",
          };
        }
      }

      // Update the document
      const updatedBook = await Book.findByIdAndUpdate(bookId, parsed.data, {
        new: true,
        runValidators: true,
        overwrite: true,
      });

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (err) {
      next(err);
    }
  })
);

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
