// models/books.model.ts
import { model, Schema } from "mongoose";
import { BookModel, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    author: { type: String, required: true, trim: true, maxlength: 100 },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, maxlength: 1000 },
    copies: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Ensure the unique index is created
// bookSchema.index({ isbn: 1 }, { unique: true });

bookSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");
  if (book.copies < quantity) throw new Error("Not enough copies");
  book.copies -= quantity;
  if (book.copies === 0) book.available = false;
  await book.save();
  return book;
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
