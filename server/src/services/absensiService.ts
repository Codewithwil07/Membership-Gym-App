import { AbsensiRepository } from "../repositories/absensiRepository";
import { KartuMemberRepository } from "../repositories/kartuMemberRepository";
import dayjs from "dayjs";

export class AbsensiService {
  constructor(
    private absensiRepo: AbsensiRepository,
    private kartuRepo: KartuMemberRepository
  ) {}

  async absen(user_id: number) {
    const today = dayjs().format("YYYY-MM-DD");

    const activeCard = await this.kartuRepo.findActiveByUserId(user_id);
    if (!activeCard) {
      throw { status: 400, message: "Kartu tidak aktif atau sudah expired." };
    }

    // ✅ Cek apakah sudah absen hari ini
    const existingAbsen = await this.absensiRepo.findByUserIdAndDate(
      user_id,
      today
    );
    if (existingAbsen) {
      throw { status: 400, message: "Anda sudah absen hari ini." };
    }

    const keterangan = activeCard
      ? "silahkan masuk"
      : "silahkan perpanjang paket atau pulang";

    return await this.absensiRepo.create({
      user_id,
      tanggal: today,
      keterangan,
    });
  }

  async getAllByAdmin(limit: number, offset: number, search?: string) {
    return await this.absensiRepo.getAllByAdmin(limit, offset, search);
  }

  async getByUserId(user_id: number) {
    return await this.absensiRepo.getByUserId(user_id);
  }
}
