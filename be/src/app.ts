import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes";

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
  }

  private routes() {
    this.app.use("/auth", authRoutes);
    // this.app.get("/", (req, res) => res.send("Hello from API NOOB😒"));
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
