import dotenv from "dotenv";
dotenv.config();
//use the cookie-parser
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.config";
import * as path from "path";
import logger from "morgan";
import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.config";
import APIRouter from "./routes/api.routes";
import os from "os";
import http from "http";

(<any>process.env.UV_THREADPOOL_SIZE) = os.cpus().length;

declare module "cookie-parser" {
  interface CookieParseOptions {
    domain?: string;
  }
}
const app = express();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

export const runningApp = async () => {
  await connectDB();
  app.set("port", port);
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");
  app.use(express.static("../../public"));
  app.use(
    express.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 500000,
    })
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(cors(corsOptions));
  app.use(
    cookieParser("your-secret-key", {
      domain: "simple-project-123.netlify.app",
    })
  );
  app.use(logger("dev"));

  app.use("/", APIRouter);

  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};
