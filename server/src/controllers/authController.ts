import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { LoginDTO, RegisterDTO } from "../models/user";
import { userRepository } from "../repositories/userRepository";
import { generateToken } from "../utils/jwtUtils";

const service = new AuthService(new userRepository());

export class AuthController {
  static async Register(req: Request, res: Response) {
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

  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { status: 400, message: "Semua field wajib diisi" };
      }

      const user = new LoginDTO(email, password);
      const payload = await service.Login(user);

      const token = generateToken({
        id: payload.id,
        username: payload.username,
        role: payload.role,
      });

      res.cookie("token", token, {
        httpOnly: true, // 🔒 aman dari XSS
        secure: process.env.NODE_ENV === "production", // 🔒 HTTPS di production
        sameSite: "strict", // 🔒 mencegah CSRF
        maxAge: 24 * 60 * 60 * 1000, // 1 hari
      });

      res.status(200).json({
        success: true,
        message: "Login Berhasil",
        data: payload,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan",
      });
    }
  }

  static async Logout(req: Request, res: Response) {
    res.clearCookie("token", {
      sameSite: "strict",
      secure: true,
      httpOnly: true,
    });
    res.json({ success: true, message: "Logout berhasil" });
  }
}
