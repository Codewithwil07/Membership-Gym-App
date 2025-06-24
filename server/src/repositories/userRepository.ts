import db from "../config/db";
import {
  RegisterDTO,
  ManageUser,
  UserResponse,
  getAllUsers,
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
      (user as ManageUser).status_akun || "active",
    ]);

    const [rows]: any = await db.query(
      "SELECT id, username, email, no_hp, role, status_akun FROM users WHERE id = ?",
      [result.insertId]
    );

    return rows[0];
  }

  async findByEmail(email: string): Promise<UserResponse | null> {
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
      "SELECT id, username, email, no_hp, role, status_akun FROM users WHERE id = ?",
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
      "SELECT id, username, email, role, status_akun FROM users WHERE 1=1";
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
    status: "active" | "inactive"
  ): Promise<{ id: number; status_akun: string }> {
    const [updateResult]: any = await db.query(
      "UPDATE users SET status_akun = ? WHERE id = ?",
      [status, id]
    );

    if (updateResult.affectedRows === 0) {
      throw { message: "User tidak ditemukan", status: 404 };
    }

    const [rows]: any = await db.query(
      "SELECT id, status_akun FROM users WHERE id = ?",
      [id]
    );

    if (!rows[0]) {
      throw { message: "User tidak ditemukan setelah update", status: 404 };
    }

    return rows[0];
  }

  async delete(id: number): Promise<{ id: number }> {
    const [deleteResult]: any = await db.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (deleteResult.affectedRows === 0) {
      throw { message: "User tidak ditemukan", status: 404 };
    }

    return { id };
  }

  async findById(id: number): Promise<UserResponse | null> {
    const [rows]: any = await db.query(
      "SELECT id, username, email, no_hp, role, status_akun FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }
}
