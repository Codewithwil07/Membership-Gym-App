import { Request, Response } from "express";
import { PaketService } from "../services/paketService";
import { PaketRepository } from "../repositories/paketRepository";
import { successResponse } from "../utils/response";

const service = new PaketService(new PaketRepository());

export class PaketController {
  static async create(req: Request, res: Response) {
    try {
      
      
      const data = await service.addPaket(req.body);
      
      successResponse(res, 201, "Paket berhasil ditambahkan", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await service.getAllPaket();
      successResponse(res, 201, "Data paket berhasil diambil", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await service.getPaketById(id);
      successResponse(res, 200, "Paket ditemukan", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await service.updatePaket(id, req.body);
      successResponse(res, 201, "Paket berhasil diupdate", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await service.deletePaket(id);
      successResponse(res, 201, "Paket berhasil dihapus", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
