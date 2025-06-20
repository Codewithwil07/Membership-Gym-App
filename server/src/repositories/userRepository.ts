import db from "../config/db";
import { RegisterDTO } from "../models/user";

export class userRepository {
  async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async findByUsername(username: string) {
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return rows[0];
  }

  async getById(id: number) {
    const [rows]: any = await db.query(
      "SELECT id, username, email, no_hp FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async create(user: RegisterDTO) {
    const sql =
      "INSERT INTO users (username, email, no_hp, password) VALUES (?, ?, ?, ?)";
    const [result]: any = await db.query(sql, [
      user.username,
      user.email,
      user.no_hp,
      user.password,
    ]);
    return {
      id: result.insertId,
      username: user.username
    }
  }
}
