import { PaketDTO } from "../models/paket";
import { PaketRepository } from "../repositories/paketRepository";

export class PaketService {
  constructor(private repo: PaketRepository) {}

  async addPaket(data: PaketDTO) {
    return this.repo.create(data);
  }

  async getAllPaket() {
    return this.repo.getAll();
  }

  async getPaketById(id: number) {
    const paket = await this.repo.getById(id);
    if (!paket) throw { message: "Paket tidak ditemukan", status: 404 };
    return paket;
  }

  async updatePaket(id: number, data: PaketDTO) {
    await this.getPaketById(id); // cek dulu
    return this.repo.update(id, data);
  }

  async deletePaket(id: number) {
    await this.getPaketById(id); // cek dulu
    return this.repo.delete(id);
  }
}
