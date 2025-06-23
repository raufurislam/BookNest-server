// borrow.interface.ts
import { Model, Types } from "mongoose";

export interface IBorrowBooks {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface BorrowLogicStatic extends Model<IBorrowBooks> {
  deductCopies(bookId: string, quantity: number): Promise<void>;
}
