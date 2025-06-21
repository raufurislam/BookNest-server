import { Model } from "mongoose";

// books.interface.ts;
export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Custom static method type
export interface BookModel extends Model<IBook> {
  borrowBook(bookId: string, quantity: number): Promise<IBook>;
}
