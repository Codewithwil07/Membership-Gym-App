import { BebanOperasionalRepository } from "../repositories/bebanOperasionalRepository";
import { BebanOperasionalDTO } from "../models/bebanOperasional";

export class BebanOperasionalService {
  constructor(private repo: BebanOperasionalRepository) {}

  async create(data: BebanOperasionalDTO) {
    return await this.repo.create(data);
  }

  async getAll(limit: number, offset: number, search?: string) {
    return await this.repo.getAll({ limit, offset, search });
  }

  async getById(id: number) {
    const data = await this.repo.getById(id);
    if (!data)
      throw { status: 404, message: "Data beban operasional tidak ditemukan" };
    return data;
  }

  async update(id: number, data: Partial<BebanOperasionalDTO>) {
    const existing = await this.repo.getById(id);
    if (!existing)
      throw { status: 404, message: "Data beban operasional tidak ditemukan" };
    return await this.repo.update(id, data);
  }

  async delete(id: number) {
    const existing = await this.repo.getById(id);
    if (!existing)
      throw { status: 404, message: "Data beban operasional tidak ditemukan" };
    return await this.repo.delete(id);
  }
}
