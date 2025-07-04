import { Request, Response } from "express";
import { AbsensiRepository } from "../repositories/absensiRepository";
import { KartuMemberRepository } from "../repositories/kartuMemberRepository";
import { AbsensiService } from "../services/absensiService";
import { successResponse } from "../utils/response";

const absensiRepo = new AbsensiRepository();
const kartuRepo = new KartuMemberRepository();
const absensiService = new AbsensiService(absensiRepo, kartuRepo);

export class AbsensiController {
  static async absen(req: Request, res: Response) {
    try {
      const user_id = req.user.id;

      const absen = await absensiService.absen(user_id);
      return successResponse(res, 201, "Absensi berhasil", absen);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getAllByAdmin(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const offset = (page - 1) * limit;
      const search = (req.query.search as string) || "";

      const result = await absensiService.getAllByAdmin(limit, offset, search);

      return successResponse(res, 200, "Berhasil mengambil data absensi", {
        data: result.data,
        total: result.total,
        page,
        limit,
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getByUserId(req: Request, res: Response) {
    try {
      const user_id = req.user.id;
      const absensi = await absensiService.getByUserId(user_id);
      return successResponse(
        res,
        200,
        "Berhasil mengambil data absensi",
        absensi
      );
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
