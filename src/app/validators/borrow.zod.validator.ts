// validators/borrow.zod.validator.ts
import { z } from "zod";

export const createBorrowZodSchema = z.object({
  book: z.string(),
  quantity: z.number(),
  dueDate: z.string(),
});
