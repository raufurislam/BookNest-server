// server.ts
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./config";

let server: Server;
const port = 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url!);
    console.log("Connected to mongodb using mongoose");
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
