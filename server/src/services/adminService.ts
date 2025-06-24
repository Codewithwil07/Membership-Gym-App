import { number } from "zod";
import { getAllUsers, ManageUser, UserResponse } from "../models/user";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

export class AdminServices {
  constructor(private repo: UserRepository) {}

  async tambahAdmin(user: ManageUser): Promise<UserResponse> {
    const existingUsername = await this.repo.findByUsername(user.username);
    if (existingUsername) {
      throw { message: "Username sudah digunakan", status: 409 };
    }

    const existingEmail = await this.repo.findByEmail(user.email);
    if (existingEmail) {
      throw { message: "Email sudah digunakan", status: 409 };
    }

    user.password = await bcrypt.hash(user.password, 10);

    return await this.repo.create(user);
  }

  async updateStatus(
    id: number,
    status_akun: "active" | "inactive"
  ): Promise<{ id: number; status_akun: string }> {
    const existingUser = await this.repo.findById(id);
    if (!existingUser) throw { message: "User tidak ada", status: 404 };

    const user = await this.repo.updateStatus(id, status_akun);

    return {
      id: user.id,
      status_akun: user.status_akun,
    };
  }
  async delete(id: number): Promise<{ id: number }> {
    const user = await this.repo.findById(id);
    if (!user) throw { message: "Id user tidak ada", status: 404 };

    await this.repo.delete(user.id);

    return {
      id: user.id,
    };
  }
  async getAllUser(data: getAllUsers) {
    const page = data.page || 1;
    const limit = data.limit || 10;
    const search = data.search || "";

    const offset = (page - 1) * limit;

    const result = await this.repo.getAllUsers({ limit, offset, search });

    const totalPage = Math.ceil(result.total / limit);

    return {
      data: result.data,
      pagination: {
        total: result.total,
        page,
        limit,
        totalPage,
      },
    };
  }
}
