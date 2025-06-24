// controllers/transaksiController.ts
import { Request, Response } from "express";
import { TransaksiService } from "../services/transaksiService";
import { TransaksiRepository } from "../repositories/transaksiRepository";
import { successResponse } from "../utils/response";
import { UpdateVerifikasiDTO } from "../models/transaksi";

const service = new TransaksiService(new TransaksiRepository());

export class TransaksiController {
  static async createManual(req: Request, res: Response) {
    try {
      const verified_by = req.user.id; // pastikan dari JWT sudah di-parse ke req.user
      const { username, paket_id, metode_pembayaran } = req.body;

      const result = await service.createManual(
        { username, paket_id, metode_pembayaran },
        verified_by
      );

      successResponse(res, 201, "Transaksi berhasil dibuat", result);
    } catch (err: any) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Terjadi kesalahan di server",
      });
    }
  }
  static async verify(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status_verifikasi } = req.body;
      const verified_by = req.user.id;

      if (!status_verifikasi) {
        throw { status: 400, message: "Status verifikasi wajib diisi" };
      }

      const body: UpdateVerifikasiDTO = {
        id: parseInt(id),
        status_verifikasi,
        verified_by,
      };

      const result = await service.verify(body);

      successResponse(res, 201, "Verifikasi berhasil", result);
    } catch (err: any) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "all";

      const result = await service.getAll(page, limit, search, sort);

      successResponse(res, 200, "Data Transaksi berhasil ditemukan", result);
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await service.getById(parseInt(id));

      successResponse(res, 201, "Data Transaksi berhasil dibuat", result);
    } catch (err: any) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Terjadi kesalahan di server",
      });
    }
  }
}
