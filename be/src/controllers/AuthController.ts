import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { LoginDTO, RegisterDTO } from "../models/User";
import { userRepository } from "../repositories/UserRepository";

const service = new AuthService(new userRepository());

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, no_hp, password } = req.body;
      const user = new RegisterDTO(username, email, no_hp, password);
      const result = await service.Register(user);
      res.status(201).json({
        success: true,
        message: "Registrasi Berhasil",
        data: result || null,
      });
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ succes: false, message: error.message || "Terjadi kesalahan" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new LoginDTO(email, password);
      const result = await service.Login(user);
      res.status(200).json({
        succes: true,
        message: "Login Berhasil",
        data: result || null,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        succes: false,
        message: error.message || "Terjadi kesalahan",
      });
    }
    
  }
}
