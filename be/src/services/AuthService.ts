import { LoginDTO, RegisterDTO } from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private repo: userRepository) {}

  async Register(user: RegisterDTO) {
    const existing = await this.repo.findByEmail(user.email);
    if (existing) throw { status: 404, message: "Email sudah terdaftar" };

    const existingUsername = await this.repo.findByUsername(user.username);
    if (existingUsername) throw { status: 409, message: "Username sudah di pakai" };

    const hasehed = await bcrypt.hash(user.password, 10);
    user.password = hasehed;

    const result = await this.repo.create(user);
    return {
      id: result.id,
      username: result.username,
    };
  }

  async Login(user: LoginDTO) {
    const existing = await this.repo.findByEmail(user.email);
    if (!existing) throw new Error("Email tidak ditemukan");

    const isMatch = await bcrypt.compare(user.password, existing.password);
    if (!isMatch) throw { status: 404, message: "Password salah" };

    return {
      id: existing.id,
      email: existing.email,
      username: existing.username,
    };
  }
}
