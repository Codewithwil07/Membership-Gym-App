import db from "../config/db";
import { BebanOperasionalDTO } from "../models/bebanOperasional";

export class BebanOperasionalRepository {
  async create(data: BebanOperasionalDTO) {
    const [result]: any = await db.query(
      `INSERT INTO beban_operasional (nama, jumlah, tanggal, keterangan) VALUES (?, ?, ?, ?)`,
      [
        data.nama,
        data.jumlah,
        data.tanggal || new Date(),
        data.keterangan || null,
      ]
    );
    return { id: result.insertId, ...data };
  }

  async getAll({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search?: string;
  }) {
    let sql = `SELECT * FROM beban_operasional WHERE 1=1`;
    let countSql = `SELECT COUNT(*) as total FROM beban_operasional WHERE 1=1`;
    const params: any[] = [];

    if (search) {
      sql += " AND nama LIKE ?";
      countSql += " AND nama LIKE ?";
      params.push(`%${search}%`);
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [data]: any = await db.query(sql, params);
    const [count]: any = await db.query(
      countSql,
      params.slice(0, params.length - 2)
    );

    return {
      data,
      total: count[0]?.total || 0,
    };
  }

  async getById(id: number) {
    const [rows]: any = await db.query(
      `SELECT * FROM beban_operasional WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  async update(id: number, data: Partial<BebanOperasionalDTO>) {
    const fields = [];
    const params: any[] = [];

    if (data.nama !== undefined) {
      fields.push("nama = ?");
      params.push(data.nama);
    }
    if (data.jumlah !== undefined) {
      fields.push("jumlah = ?");
      params.push(data.jumlah);
    }
    if (data.tanggal !== undefined) {
      fields.push("tanggal = ?");
      params.push(data.tanggal);
    }
    if (data.keterangan !== undefined) {
      fields.push("keterangan = ?");
      params.push(data.keterangan);
    }

    if (fields.length === 0) return await this.getById(id);

    params.push(id);

    await db.query(
      `UPDATE beban_operasional SET ${fields.join(", ")} WHERE id = ?`,
      params
    );

    return await this.getById(id);
  }

  async delete(id: number) {
    await db.query(`DELETE FROM beban_operasional WHERE id = ?`, [id]);
    return { id };
  }
}
