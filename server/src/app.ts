import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import paketRoutes from "./routes/paketRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import absensiRoutes from "./routes/absensiRoutes";
import bebanOperasionalRoutes from "./routes/bebanOperasionalRoutes";
import transaksiRoutes from "./routes/transaksiRoutes";
import kartuMemberRoutes from "./routes/kartuMemberRoutes";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: "http://localhost:5173", // atau environment FE kamu
        credentials: true,
      })
    );
  }

  private routes() {
    this.app.use("/auth", authRoutes);
    this.app.use("/admin", adminRoutes);
    this.app.use("/admin", paketRoutes);
    this.app.use("/user", userRoutes);
    this.app.use("/api/card", kartuMemberRoutes);
    this.app.use("/api/payment", paymentRoutes);
    this.app.use("/api/absensi", absensiRoutes);
    this.app.use("/api/beban-operasional", bebanOperasionalRoutes);
    this.app.use("/api/transaksi", transaksiRoutes);

    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: "Resource tidak ditemukan",
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
