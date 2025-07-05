import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { successResponse } from "../utils/response";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary";
import db from "../config/db";

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
  static updateProfilePhoto = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      // Bungkus upload stream menjadi Promise agar bisa di-await
      const uploadFromBuffer = (buffer: Buffer) => {
        return new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "gym-profile-pictures" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          streamifier.createReadStream(buffer).pipe(uploadStream);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);

      // Simpan URL ke DB
      await db.query("UPDATE users SET foto = ? WHERE id = ?", [
        result.secure_url,
        userId,
      ]);

      res.status(200).json({
        success: true,
        message: "Profile photo updated successfully.",
        url: result.secure_url,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error." });
    }
  };
}
