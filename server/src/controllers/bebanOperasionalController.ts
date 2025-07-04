import { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { BebanOperasionalRepository } from "../repositories/bebanOperasionalRepository";
import { BebanOperasionalService } from "../services/bebanOperasionalService";


const service = new BebanOperasionalService(new BebanOperasionalRepository());


export class BebanOperasionalController {
  static async create(req: Request, res: Response) {
    const data = req.body;
    const result = await service.create(data);
    successResponse(res, 201, "Beban operasional berhasil ditambahkan", result);
  }

  static async getAll(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;
    const search = (req.query.search as string) || "";

    const result = await service.getAll(limit, offset, search);
    successResponse(res, 200, "Data beban operasional", result);
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await service.getById(id);
    successResponse(res, 200, "Detail beban operasional", result);
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await service.update(id, data);
    successResponse(res, 200, "Beban operasional berhasil diperbarui", result);
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await service.delete(id);
    successResponse(res, 200, "Beban operasional berhasil dihapus", result);
  }
}
