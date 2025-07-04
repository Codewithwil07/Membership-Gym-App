import db from "../config/db";
import { TransaksiDTO } from "../models/transaksi";

export class TransaksiRepository {
  async create(data: TransaksiDTO) {
    const sql = `
      INSERT INTO transaksi_membership 
      (user_id, paket_id, order_id, jumlah_bayar, status, metode_pembayaran)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await db.query(sql, [
      data.user_id,
      data.paket_id,
      data.order_id,
      data.jumlah_bayar,
      data.status || "pending",
      data.metode_pembayaran || null,
    ]);
    return { id: result.insertId, ...data };
  }

  async findByOrderId(order_id: string) {
    const [rows]: any = await db.query(
      `SELECT * FROM transaksi_membership WHERE order_id = ?`,
      [order_id]
    );
    return rows[0] || null;
  }

  async updateStatus(
    order_id: string,
    status: "pending" | "paid" | "failed",
    metode_pembayaran: string | null
  ) {
    await db.query(
      `UPDATE transaksi_membership SET status = ?, metode_pembayaran = ? WHERE order_id = ?`,
      [status, metode_pembayaran, order_id]
    );
  }
}
