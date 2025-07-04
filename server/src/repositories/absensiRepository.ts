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

  async getAllByAdmin({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search?: string;
  }) {
    let sql = `
    SELECT a.*, u.username, u.no_hp 
    FROM absensi a 
    JOIN users u ON a.user_id = u.id
    WHERE 1=1
  `;
    let countSql = `SELECT COUNT(*) as total FROM absensi a JOIN users u ON a.user_id = u.id WHERE 1=1`;

    const params: any[] = [];
    if (search) {
      sql += ` AND (u.username LIKE ? OR u.no_hp LIKE ?)`;
      countSql += ` AND (u.username LIKE ? OR u.no_hp LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit ?? 10, offset ?? 0);

    console.log({ sql, params, countSql });

    const [data]: any = await db.query(sql, params);

    let countParams: any = [];
    if (search) {
      countParams = [`%${search}%`, `%${search}%`];
    }
    const [countRows]: any = await db.query(countSql, countParams);

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
