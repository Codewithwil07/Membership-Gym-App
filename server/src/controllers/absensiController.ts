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

  static async getAbsensi24Jam(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await absensiService.getAllAbsensi24Jam(page, limit);

      return successResponse(res, 200, "Data absensi 24 jam terakhir berhasil diambil", {
        data: result.data,
        pagination: {
          total: result.total,
          page,
          limit,
          totalPage: Math.ceil(result.total / limit),
        },
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
      return successResponse(res, 200, "Berhasil mengambil data absensi", absensi);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
