import db from "../config/db";
import {
  RegisterDTO,
  ManageUser,
  UserResponse,
  UpdateProfileDTO,
} from "../models/user";

export class UserRepository {
  async create(user: RegisterDTO | ManageUser): Promise<UserResponse> {
    const sql = `
      INSERT INTO users (username, email, no_hp, password, role, status_akun)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await db.query(sql, [
      user.username,
      user.email,
      user.no_hp,
      user.password,
      (user as ManageUser).role || "member",
      (user as ManageUser).status_akun || "nonactive",
    ]);

    const [rows]: any = await db.query(
      "SELECT id, username, email, no_hp, role, status_akun FROM users WHERE id = ?",
      [result.insertId]
    );

    return rows[0];
  }

  async findByEmail(email: string) {
    const [rows]: any = await db.query(
      "SELECT id, username, email, password, no_hp, role, status_akun, is_superadmin FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  async findByUsername(username: string): Promise<UserResponse | null> {
    const [rows]: any = await db.query(
      "SELECT id, username, email, password, no_hp, role, status_akun FROM users WHERE username = ?",
      [username]
    );
    return rows[0] || null;
  }

  async getById(id: number): Promise<UserResponse | null> {
    const [rows]: any = await db.query(
      "SELECT id, username, email, no_hp, role, status_akun, foto FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  async getAllUsers({
    limit,
    offset,
    search,
  }: {
    limit: number;
    offset: number;
    search: string;
  }) {
    let sql =
      "SELECT id, username, email, no_hp, role, status_akun, foto FROM users WHERE 1=1";
    let countSql = "SELECT COUNT(*) as total FROM users WHERE 1=1";
    const params: any[] = [];

    if (search) {
      sql += " AND (username LIKE ? OR email LIKE ?)";
      countSql += " AND (username LIKE ? OR email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [data]: any = await db.query(sql, params);
    const [countRows]: any = await db.query(
      countSql,
      params.slice(0, params.length - 2)
    );

    return {
      data,
      total: countRows[0]?.total || 0,
    };
  }

  async updateStatus(
    id: number,
    status: "active" | "inactive",
    tanggalBergabung?: Date
  ) {
    if (status === "active" && tanggalBergabung) {
      await db.query(
        `UPDATE users SET status_akun = ?, tanggal_bergabung = IFNULL(tanggal_bergabung, ?) WHERE id = ?`,
        [status, tanggalBergabung, id]
      );
    } else {
      await db.query(`UPDATE users SET status_akun = ? WHERE id = ?`, [
        status,
        id,
      ]);
    }
  }
  async updateAdmin(
    id: number,
    data: {
      username: string;
      email: string;
      password: string;
      no_hp: string;
      status_akun: "active" | "nonactive";
    }
  ): Promise<UserResponse> {
    await db.query(
      `UPDATE users SET username = ?, email = ?, password = ?, no_hp = ?, status_akun = ? WHERE id = ? AND role = 'admin'`,
      [
        data.username,
        data.email,
        data.password,
        data.no_hp,
        data.status_akun,
        id,
      ]
    );

    const [rows]: any = await db.query(
      `SELECT id, username, email, no_hp, status_akun, role FROM users WHERE id = ? AND role = 'admin'`,
      [id]
    );

    return rows[0];
  }

  async findById(id: number): Promise<UserResponse | null> {
    const [rows]: any = await db.query(
      "SELECT id, username, email, no_hp, role, status_akun FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  async delete(id: number) {
    // Cek apakah user admin dengan id tersebut ada
    const [existing]: any = await db.query(
      "SELECT id FROM users WHERE id = ? AND role = 'admin'",
      [id]
    );

    if (existing.length === 0) {
      throw { message: "Admin tidak ditemukan", status: 404 };
    }

    // Hapus user admin
    await db.query("DELETE FROM users WHERE id = ? AND role = 'admin'", [id]);

    // Return id untuk konfirmasi frontend
    return id;
  }

  async updateProfile(id: number, data: UpdateProfileDTO) {
    const fields = [];
    const values = [];

    if (data.username) {
      fields.push("username = ?");
      values.push(data.username);
    }
    if (data.no_hp) {
      fields.push("no_hp = ?");
      values.push(data.no_hp);
    }
    if (data.foto) {
      fields.push("foto = ?");
      values.push(data.foto);
    }

    if (fields.length === 0) return; // nothing to update

    values.push(id);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(sql, values);
  }
}
