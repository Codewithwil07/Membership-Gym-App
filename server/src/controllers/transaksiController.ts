import { Request, Response } from "express";
import { LaporanKeuanganService } from "../services/transaksiService";
import { TransaksiRepository } from "../repositories/transaksiRepository";
import { successResponse } from "../utils/response";

const laporanService = new LaporanKeuanganService(new TransaksiRepository());

export class LaporanKeuanganController {
  static async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "newest";

      const result = await laporanService.getAll(
        page,
        limit,
        search,
        sort
      );

      successResponse(res, 200, "Data transaksi berhasil diambil", result);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getLaporan(req: Request, res: Response) {
    try {
      const {
        month,
        page_pemasukan,
        limit_pemasukan,
        page_beban,
        limit_beban,
      } = req.query;
      if (!month) {
        return res.status(400).json({
          success: false,
          message: "Parameter month wajib diisi (YYYY-MM)",
        });
      }
      const laporan = await laporanService.getLaporan({
        month: month as string,
        page_pemasukan: page_pemasukan
          ? parseInt(page_pemasukan as string)
          : undefined,
        limit_pemasukan: limit_pemasukan
          ? parseInt(limit_pemasukan as string)
          : undefined,
        page_beban: page_beban ? parseInt(page_beban as string) : undefined,
        limit_beban: limit_beban ? parseInt(limit_beban as string) : undefined,
      });
      successResponse(res, 200, "Laporan keuangan berhasil diambil", laporan);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
