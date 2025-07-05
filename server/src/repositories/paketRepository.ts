import db from "../config/db";
import { PaketDTO } from "../models/paket";

export class PaketRepository {
  async create(data: PaketDTO) {
    const sql = `
      INSERT INTO paket_membership (nama_paket, durasi_hari, harga, deskripsi)
      VALUES (?, ?, ?, ?)
    `;
    const [result]: any = await db.query(sql, [
      data.nama_paket,
      data.durasi_hari,
      data.harga,
      data.deskripsi || null,
    ]);
    return { id: result.insertId, ...data };
  }

  async getAll() {
    const [rows]: any = await db.query(
      "SELECT id, nama_paket, deskripsi, durasi_hari, harga  FROM paket_membership"
    );
    return rows;
  }

  async getById(id: number) {
    const [rows]: any = await db.query(
      "SELECT id, nama_paket, durasi_hari, harga, deskripsi FROM paket_membership WHERE id = ?",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async update(id: number, data: PaketDTO) {
    await db.query(
      `
      UPDATE paket_membership SET 
        nama_paket = ?, durasi_hari = ?, harga = ?, deskripsi = ?
      WHERE id = ?
    `,
      [
        data.nama_paket,
        data.durasi_hari,
        data.harga,
        data.deskripsi || null,
        id,
      ]
    );
    return { id, ...data };
  }

  async delete(id: number) {
    await db.query("DELETE FROM paket_membership WHERE id = ?", [id]);
    return { id };
  }
}
