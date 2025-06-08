import { RegisterDTO } from "../models/User";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private repo: userRepository) {}

  async Register(user: userDTO) {
    const existing = await this.repo.findByEmail(user.email);
    if (existing) throw new Error("Email sudah digunakan");

    const hasehed = await bcrypt.hash(user.password, 10);
    user.password = hasehed;

    await this.repo.create(user);
    return { message: "Registrasi Berhasil" };
  }

  async Login(login: ){

  }
}
