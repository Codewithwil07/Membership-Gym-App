import db from "../config/db";
import { KartuMemberDTO } from "../models/KartuMember";

export class KartuMemberRepository {
  async create(data: KartuMemberDTO) {
    const sql = `
      INSERT INTO kartu_member
      (user_id, transaksi_id, qr_code, berlaku_dari, berlaku_sampai, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await db.query(sql, [
      data.user_id,
      data.transaksi_id,
      data.qr_code,
      data.berlaku_dari,
      data.berlaku_sampai,
      data.status || "active",
    ]);
    return { id: result.insertId, ...data };
  }

  async findByTransaksiId(transaksi_id: number) {
    const [rows]: any = await db.query(
      `SELECT * FROM kartu_member WHERE transaksi_id = ?`,
      [transaksi_id]
    );
    return rows[0];
  }

  async findActiveByUserId(user_id: number) {
    const [rows]: any = await db.query(
      "SELECT * FROM kartu_member WHERE user_id = ? AND status = 'active' ORDER BY berlaku_sampai DESC LIMIT 1",
      [user_id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async expireMemberships(currentDate: Date) {
    await db.query(
      `UPDATE kartu_member SET status = 'expired' WHERE berlaku_sampai < ? AND status = 'active'`,
      [currentDate]
    );
  }
}
