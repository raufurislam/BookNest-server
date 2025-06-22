// books.model.ts
import { model, Schema } from "mongoose";
import { BookModel, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],

      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message:
          "Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true, // 👈 Must be there
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    copies: {
      type: Number,
      required: [true, "Copies is required"],
      min: [0, "Copies must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Ensure the unique index is created
bookSchema.index({ isbn: 1 }, { unique: true });

// ✅ Static method to handle borrow update
bookSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  book.copies -= quantity;

  if (book.copies === 0) {
    book.available = false;
  }

  await book.save();
  return book;
};

// Pre-save middleware to ensure ISBN uniqueness
bookSchema.pre("save", async function (next) {
  if (this.isModified("isbn")) {
    // Use the Book model directly to access findOne
    const existingBook = await Book.findOne({
      isbn: this.isbn,
      _id: { $ne: this._id },
    });

    if (existingBook) {
      const error = new Error("ISBN must be unique");
      error.name = "ValidationError";
      return next(error);
    }
  }
  next();
});
export const Book = model<IBook, BookModel>("Book", bookSchema);

// export const Book = model<IBook>("Note", booksSchema);
