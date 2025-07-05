import { UserRepository } from "../repositories/userRepository";
import { UpdateProfileDTO } from "../models/user";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getProfileById(id: number) {
    const user = await this.userRepo.getById(id);
    if (!user) throw { status: 404, message: "User tidak ditemukan" };
    return user;
  }

  async updateProfile(id: number, data: UpdateProfileDTO) {
    await this.userRepo.updateProfile(id, data);
    return await this.getProfileById(id);
  }
}
