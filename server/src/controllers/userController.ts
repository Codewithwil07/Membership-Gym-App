import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { successResponse } from "../utils/response";

const userService = new UserService(new UserRepository());

export class UserController {
  static async getProfileById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.getProfileById(id);
      successResponse(res, 200, "Profil berhasil diambil", user);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }

  static async me(req: Request, res: Response) {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ data: req.session.user });
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { username, no_hp, foto } = req.body;
      const user = await userService.updateProfile(id, {
        username,
        no_hp,
        foto,
      });
      successResponse(res, 200, "Profil berhasil diperbarui", user);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ success: false, message: error.message });
    }
  }
}
