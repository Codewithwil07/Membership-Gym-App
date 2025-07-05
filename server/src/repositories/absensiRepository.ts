import db from "../config/db";
import { AbsensiDTO, AbsensiResponse } from "../models/absensi";

export class AbsensiRepository {
  async create(data: AbsensiDTO): Promise<AbsensiResponse> {
    const sql = `
      INSERT INTO absensi (user_id, tanggal, keterangan)
      VALUES (?, ?, ?)
    `;
    const [result]: any = await db.query(sql, [
      data.user_id,
      data.tanggal,
      data.keterangan || null,
    ]);

    const [rows]: any = await db.query(
      `SELECT user_id, tanggal, keterangan FROM absensi WHERE id = ?`,
      [result.insertId]
    );
    return rows[0];
  }
  async getAllByAdmin({ limit, offset }: { limit: number; offset: number }) {
    const sql = `
    SELECT a.*, u.username, u.no_hp 
    FROM absensi a 
    JOIN users u ON a.user_id = u.id
    WHERE a.created_at >= NOW() - INTERVAL 1 DAY
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

    const countSql = `
    SELECT COUNT(*) as total 
    FROM absensi a 
    JOIN users u ON a.user_id = u.id 
    WHERE a.created_at >= NOW() - INTERVAL 1 DAY
  `;

    const [data]: any = await db.query(sql, [limit, offset]);
    const [countRows]: any = await db.query(countSql);

    return {
      data,
      total: countRows[0]?.total || 0,
    };
  }

  async getByUserId(user_id: number): Promise<AbsensiResponse[]> {
    const [rows]: any = await db.query(
      `SELECT user_id, tanggal, created_at FROM absensi WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    return rows;
  }

  async findByUserIdAndDate(user_id: number, tanggal: string) {
    const [rows]: any = await db.query(
      "SELECT user_id, tanggal FROM absensi WHERE user_id = ? AND tanggal = ?",
      [user_id, tanggal]
    );
    return rows[0] || null;
  }
}
