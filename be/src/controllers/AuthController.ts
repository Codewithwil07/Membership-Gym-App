import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { RegisterDTO } from "../models/User";
import { userRepository } from "../repositories/UserRepository";

const service = new AuthService(new userRepository());

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      console.log("BODY:", req.body); // Cek apakah body terbaca

      const { username, email, no_hp, password } = req.body;
      const user = new RegisterDTO(username, email, no_hp, password);
      const result = await service.Register(user);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
