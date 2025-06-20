import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from 'cookie-parser'

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser())
  }

  private routes() {
    this.app.use("/auth", authRoutes);
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Route tidak ditemukan",
      });
    });

    this.app.use(errorHandler());
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log("server running on port: " + port);
    });
  }

  public getServer() {
    return this.app;
  }
}
