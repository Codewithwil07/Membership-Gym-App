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
        status_akun,
      } = req.body;

      if (!username || !email || !password || !no_hp || !role || !status_akun) {
        throw { status: 400, message: "Semua field wajib diisi" };
      }

      const body = { username, email, password, no_hp, role, status_akun };

      const admin = await service.tambahAdmin(body);

      successResponse(res, admin, "admin baru berhasil masuk", 201);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan",
      });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { status_akun } = req.body;
      const { id } = req.params;

      if (!id) {
        throw { message: "Id tidak valid", status: 400 };
      }

      if (!status_akun) {
        throw { message: "field status_akun kosong", status: 400 };
      }

      const admin = await service.updateStatus(parseInt(id), status_akun);

      successResponse(res, admin, "Status akun berhasil diubah", 201);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        messagae: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const admin = await service.delete(parseInt(id));

      successResponse(res, admin, "user berhasil dihapus", 201);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        messagae: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
