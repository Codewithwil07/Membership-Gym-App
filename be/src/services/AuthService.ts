import { RegisterDTO } from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private repo: userRepository) {}

  async Register(register: RegisterDTO) {
    const existing = await this.repo.findByEmail(register.email);
    if (existing) throw new Error("Email sudah digunakan");

    const hasehed = await bcrypt.hash(register.password, 10);
    register.password = hasehed;

    await this.repo.create(register);
    return { message: "Registrasi Berhasil" };
  }
}
