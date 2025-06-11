import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { LoginDTO, RegisterDTO } from "../models/user";
import { userRepository } from "../repositories/userRepository";

const service = new AuthService(new userRepository());

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, no_hp, password } = req.body;

      if (!username || !email || !no_hp || !password)
        throw { status: 400, message: "Semua field wajib di isi" };

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

      if (!email || !password)
        throw { status: 400, messaage: "Semua filed wajib di isi" };

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
