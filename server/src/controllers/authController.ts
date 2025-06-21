import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repositories/userRepository";
import { generateToken } from "../utils/jwtUtils";

const service = new AuthService(new UserRepository());

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, no_hp, password } = req.body;

      if (!username || !email || !no_hp || !password) {
        throw { status: 400, message: "Semua field wajib diisi" };
      }

      const user = { username, email, no_hp, password };

      const result = await service.register(user);
      res.status(201).json({
        success: true,
        message: "Registrasi berhasil",
        data: result,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { status: 400, message: "Semua field wajib diisi" };
      }

      const loginData = { email, password };

      const payload = await service.login(loginData);

      const token = generateToken({
        id: payload.id,
        username: payload.username,
        role: payload.role,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login berhasil",
        data: payload,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout berhasil",
    });
  }
}
