// borrow.interface.ts
import { Types } from "mongoose";

export interface IBorrow {
  quantity: number;
  dueDate: string;

  book: Types.ObjectId;
}
