// server.ts
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./config";

let server: Server;

const startServer = async () => {
  try {
    if (!config.database_url) {
      throw new Error("DATABASE_URL is not defined in config");
    }

    await mongoose.connect(config.database_url);
    console.log("Connected to DB");

    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

(async () => {
  await startServer();
})();

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected. Sever shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected. Server is shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Server is shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received. Server is shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
