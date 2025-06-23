import express, { Application, NextFunction, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowRoutes);

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management Application");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Route Not Found !");
  (error as any).statusCode = 404;
  next(error);
});

export default app;
