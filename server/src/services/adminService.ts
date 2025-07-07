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

  async delete(id: number) {
    const user = await this.repo.findById(id);
    if (!user) throw { message: "User tidak ditemukan", status: 404 };

    if (user.role !== "admin") {
      throw { message: "User bukan admin", status: 400 };
    }

    const userId = await this.repo.delete(id);

    return userId;
  }

  async updateAdmin(id: number, data: ManageUser): Promise<UserResponse> {
    const user = await this.repo.findById(id);
    if (!user) throw { message: "User tidak ditemukan", status: 404 };

    if (user.role !== "admin") {
      throw { message: "User bukan admin", status: 400 };
    }

    // Validasi status_akun
    if (data.status_akun !== "active" && data.status_akun !== "nonactive") {
      throw { message: "Status akun tidak valid", status: 400 };
    }

    // Cek username unik jika diubah
    if (data.username !== user.username) {
      const existingUsername = await this.repo.findByUsername(data.username);
      if (existingUsername) {
        throw { message: "Username sudah digunakan", status: 409 };
      }
    }

    // Cek email unik jika diubah
    if (data.email !== user.email) {
      const existingEmail = await this.repo.findByEmail(data.email);
      if (existingEmail) {
        throw { message: "Email sudah digunakan", status: 409 };
      }
    }

    data.password = await bcrypt.hash(data.password, 10);
    // Update melalui repo
    const updatedUser = await this.repo.updateAdmin(id, data);

    return updatedUser;
  }
}
