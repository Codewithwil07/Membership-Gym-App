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
      `SELECT id, user_id, paket_id, order_id, jumlah_bayar, status, metode_pembayaran, created_at 
       FROM transaksi_membership 
       WHERE order_id = ?`,
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
      `UPDATE transaksi_membership 
       SET status = ?, metode_pembayaran = ? 
       WHERE order_id = ?`,
      [status, metode_pembayaran, order_id]
    );
  }

  async getTotalPemasukan(month: string) {
    const [rows]: any = await db.query(
      `SELECT SUM(jumlah_bayar) as total 
       FROM transaksi_membership 
       WHERE status = 'paid' AND DATE_FORMAT(created_at, '%Y-%m') = ?`,
      [month]
    );
    return rows[0].total || 0;
  }

  async getTotalBeban(month: string) {
    const [rows]: any = await db.query(
      `SELECT SUM(jumlah) as total 
       FROM beban_operasional 
       WHERE DATE_FORMAT(tanggal, '%Y-%m') = ?`,
      [month]
    );
    return rows[0].total || 0;
  }

  async getDetailPemasukan(month: string, limit: number, offset: number) {
    const [rows]: any = await db.query(
      `SELECT 
          u.username, 
          p.nama_paket, 
          t.created_at as transaction_date, 
          t.metode_pembayaran, 
          t.jumlah_bayar as amount, 
          t.status 
       FROM transaksi_membership t
       JOIN users u ON t.user_id = u.id
       JOIN paket_membership p ON t.paket_id = p.id
       WHERE t.status = 'paid' AND DATE_FORMAT(t.created_at, '%Y-%m') = ?
       ORDER BY t.created_at DESC 
       LIMIT ? OFFSET ?`,
      [month, limit, offset]
    );

    const [count]: any = await db.query(
      `SELECT COUNT(*) as total 
       FROM transaksi_membership 
       WHERE status = 'paid' AND DATE_FORMAT(created_at, '%Y-%m') = ?`,
      [month]
    );

    return { data: rows, total: count[0].total };
  }

  async getDetailBeban(month: string, limit: number, offset: number) {
    const [rows]: any = await db.query(
      `SELECT id, nama, jumlah, tanggal 
       FROM beban_operasional 
       WHERE DATE_FORMAT(tanggal, '%Y-%m') = ?
       ORDER BY tanggal DESC 
       LIMIT ? OFFSET ?`,
      [month, limit, offset]
    );

    const [count]: any = await db.query(
      `SELECT COUNT(*) as total 
       FROM beban_operasional 
       WHERE DATE_FORMAT(tanggal, '%Y-%m') = ?`,
      [month]
    );

    return { data: rows, total: count[0].total };
  }

  async getAllWithPagination(
    page: number,
    limit: number,
    search: string,
    sort: string
  ) {
    const offset = (page - 1) * limit;

    let baseQuery = `
      SELECT t.id, u.username, p.nama_paket, t.jumlah_bayar, t.status, t.metode_pembayaran, t.created_at
      FROM transaksi_membership t
      JOIN users u ON t.user_id = u.id
      JOIN paket_membership p ON t.paket_id = p.id
      WHERE u.username LIKE ?
    `;

    if (sort === "newest") {
      baseQuery += " ORDER BY t.created_at DESC";
    } else if (sort === "oldest") {
      baseQuery += " ORDER BY t.created_at ASC";
    }

    baseQuery += " LIMIT ? OFFSET ?";

    const [rows]: any = await db.query(baseQuery, [
      `%${search}%`,
      limit,
      offset,
    ]);

    const [[{ total }]]: any = await db.query(
      `
      SELECT COUNT(*) as total
      FROM  transaksi_membership t
      JOIN users u ON t.user_id = u.id
      WHERE u.username LIKE ?
    `,
      [`%${search}%`]
    );

    return { data: rows, total };
  }
}
