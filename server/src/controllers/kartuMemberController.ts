import { Request, Response } from "express";
import db from "../config/db";
import { successResponse } from "../utils/response";

export class KartuController {
  static async getKartuById(req: Request, res: Response) {
    try {
      const userId = req.user.id;

      const [rows]: any = await db.query(
        `SELECT * FROM kartu_member WHERE user_id = ? AND status = 'active' ORDER BY berlaku_sampai DESC LIMIT 1`,
        [userId]
      );

      if (Array.isArray(rows) && rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Kartu member aktif tidak ditemukan",
        });
      }

      const result = rows[0];

      successResponse(res, 200, "Berhasil mengambil data kartu member", result);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
