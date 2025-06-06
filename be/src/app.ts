import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

export class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public listen(port: number) {
    console.log("server running on port: " + port);
  }

  public getServer() {
    return this.app;
  }
}
