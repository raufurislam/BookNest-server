import { model, Schema } from "mongoose";
import {
  IBorrowBooks,
  BorrowLogicStatic,
} from "../interfaces/borrow.interface";
import { Book } from "./books.model";

const borrowSchema = new Schema<IBorrowBooks, BorrowLogicStatic>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be a positive integer"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// ✅ Pre-validation hook: check stock before borrow
borrowSchema.pre("save", async function (next) {
  const book = await Book.findById(this.book);
  if (!book) throw new Error("Book does not exist!");

  if (book.copies < this.quantity) {
    throw new Error("Not enough copies available!");
  }

  next();
});

// deduct copies after borrow
borrowSchema.static(
  "deductCopies",
  async function (bookId: string, quantity: number) {
    const book = await Book.findById(bookId);
    if (book) {
      book.copies -= quantity;
      if (book.copies <= 0) {
        book.available = false;
      }
      await book.save();
    }
  }
);

// automatically call deductCopies after save
borrowSchema.post("save", async function () {
  await Borrow.deductCopies(this.book.toString(), this.quantity);
});

export const Borrow = model<IBorrowBooks, BorrowLogicStatic>(
  "Borrow",
  borrowSchema
);
