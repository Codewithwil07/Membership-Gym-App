import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { AdminServices } from "../services/adminService";
import { successResponse } from "../utils/response";

const service = new AdminServices(new UserRepository());

export class AdminController {
  static async tambahAdmin(req: Request, res: Response) {
    try {
      const {
        username,
        email,
        password,
        no_hp,
        role = "admin",
        status_akun = "active",
      } = req.body;

      if (!username || !email || !password || !no_hp || !role || !status_akun) {
        throw { status: 400, message: "Semua field wajib diisi" };
      }

      const body = { username, email, password, no_hp, role, status_akun };

      const admin = await service.tambahAdmin(body);

      successResponse(res, 201, "admin baru berhasil masuk", admin);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan",
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const admin = await service.delete(parseInt(id));

      successResponse(res, 201, "user berhasil dihapus", admin);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const search = (req.query.search as string) || "";

      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        throw { message: "Query param tidak valid", status: 400 };
      }

      const data = await service.getAllUser({ page, limit, search });
      successResponse(res, 200, "Akses data valid", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async updateAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, password, email, no_hp } = req.body;

      if (!username || !email || !password || !no_hp) {
        throw {
          message: "username, email, dan no_hp wajib diisi",
          status: 400,
        };
      }

      const updatedUser = await service.updateAdmin(parseInt(id), {
        username,
        email,
        no_hp,
        password,
        status_akun: "active",
        role: "admin",
      });
      
      successResponse(res, 200, "Data admin berhasil diupdate", updatedUser);
    } catch (error: any) {
      console.error(error);
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
