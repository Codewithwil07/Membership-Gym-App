import { LoginDTO, RegisterDTO, UserResponse } from "../models/user";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private repo: UserRepository) {}

  async register(user: RegisterDTO): Promise<UserResponse> {
    // Cek email
    const existingEmail = await this.repo.findByEmail(user.email);
    if (existingEmail) {
      throw { status: 409, message: "Email sudah terdaftar" };
    }

    // Cek username
    const existingUsername = await this.repo.findByUsername(user.username);
    if (existingUsername) {
      throw { status: 409, message: "Username sudah dipakai" };
    }

    // Hash password
    user.password = await bcrypt.hash(user.password, 10);

    // Create user
    const result = await this.repo.create(user);
    return result; // sudah bentuk UserResponse
  }

  async login(user: LoginDTO): Promise<UserResponse> {
    const existing = await this.repo.findByEmail(user.email);
    if (!existing) {
      throw { status: 404, message: "Email tidak ditemukan" };
    }
    if (!existing.password) {
      throw { status: 404, message: "Password tidak valid" };
    }

    const isMatch = await bcrypt.compare(user.password, existing.password);
    if (!isMatch) {
      throw { status: 401, message: "Password salah" };
    }

    // Build clean response
    const result: UserResponse = {
      id: existing.id,
      username: existing.username,
      password: existing.password,
      email: existing.email,
      role: existing.role,
      status_akun: existing.status_akun,
    };

    return result;
  }
}
