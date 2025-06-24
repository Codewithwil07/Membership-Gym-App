  // repositories/transaksiRepository.ts
  import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
  import { TransaksiResponse } from "../models/transaksi";
  import { ManageUser } from "../models/user";

  export class TransaksiRepository {
    async findUserByUsername(
      conn: PoolConnection,
      username: string
    ): Promise<{ id: number } | undefined> {
      const [rows] = await conn.query<RowDataPacket[]>(
        `SELECT id FROM users WHERE username = ?`,
        [username]
      );
      return rows[0] as { id: number } | undefined;
    }

    async insertTransaksi(
      conn: PoolConnection,
      data: {
        user_id: number | null;
        paket_id: number;
        metode_pembayaran: string;
        verified_by: number;
      }
    ): Promise<number> {
      const [result] = await conn.query<ResultSetHeader>(
        `INSERT INTO transaksi (user_id, paket_id, tanggal_transaksi, metode_pembayaran, status_verifikasi, verified_by, tanggal_verifikasi)
        VALUES (?, ?, CURDATE(), ?, 'verified', ?, NOW())`,
        [data.user_id, data.paket_id, data.metode_pembayaran, data.verified_by]
      );
      return result.insertId;
    }

    async insertUserAuto(conn: any, user: ManageUser): Promise<number> {
      const sql = `
      INSERT INTO users (username, email, no_hp, password, role, status_akun)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
      const [result]: any = await conn.query(sql, [
        user.username,
        user.email,
        user.no_hp,
        user.password,
        user.role,
        user.status_akun,
      ]);
      return result.insertId;
    }

    async findById(
      conn: PoolConnection,
      id: number
    ): Promise<TransaksiResponse | undefined> {
      const [rows] = await conn.query<RowDataPacket[]>(
        `SELECT * FROM transaksi WHERE id = ?`,
        [id]
      );
      return rows[0] as TransaksiResponse | undefined;
    }

    async updateStatus(
      conn: PoolConnection,
      data: {
        id: number;
        status_verifikasi: string;
        verified_by: number;
      }
    ): Promise<number> {
      const [result] = await conn.query<ResultSetHeader>(
        `UPDATE transaksi SET status_verifikasi = ?, verified_by = ?, tanggal_verifikasi = NOW()  WHERE id = ?`,
        [
          data.status_verifikasi,
          data.verified_by,
          data.id,
        ]
      );
      return result.affectedRows;
    }

    async updateTanggalBergabung(
      conn: PoolConnection,
      user_id: number
    ): Promise<number> {
      const [result] = await conn.query<ResultSetHeader>(
        `UPDATE users SET tanggal_bergabung = NOW() WHERE id = ?`,
        [user_id]
      );
      return result.affectedRows;
    }

    async getAll(
      conn: PoolConnection,
      search: string,
      sort: string,
      limit: number,
      offset: number
    ): Promise<TransaksiResponse[]> {
      let sql = `SELECT t.* FROM transaksi t JOIN users u ON t.user_id = u.id WHERE u.username LIKE ?`;
      if (sort === "newest") sql += " ORDER BY t.tanggal_transaksi DESC";
      else if (sort === "oldest") sql += " ORDER BY t.tanggal_transaksi ASC";
      sql += " LIMIT ? OFFSET ?";
      const [rows] = await conn.query<RowDataPacket[]>(sql, [
        `%${search}%`,
        limit,
        offset,
      ]);
      return rows as TransaksiResponse[];
    }

    async countAll(conn: PoolConnection, search: string): Promise<number> {
      const [rows] = await conn.query<RowDataPacket[]>(
        `SELECT COUNT(*) as total FROM transaksi t JOIN users u ON t.user_id = u.id WHERE u.username LIKE ?`,
        [`%${search}%`]
      );
      return (rows[0] as any)?.total ?? 0;
    }
  }
