// validators/book.zod.validator.ts
import { z } from "zod";

export const createBookZodSchema = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(100),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(10).max(20),
  description: z.string().max(1000).optional(),
  copies: z.number().int().nonnegative(),
  available: z.boolean().optional(),
});

export const updateBookZodSchema = createBookZodSchema.partial();
