import { TransaksiRepository } from "../repositories/transaksiRepository";
import { LaporanKeuanganQuery } from "../models/transaksi";

export class LaporanKeuanganService {
  constructor(private laporanRepo: TransaksiRepository) {}

  async getLaporan(query: LaporanKeuanganQuery) {
    const {
      month,
      page_pemasukan = 1,
      limit_pemasukan = 10,
      page_beban = 1,
      limit_beban = 10,
    } = query;
    const offsetPemasukan = (page_pemasukan - 1) * limit_pemasukan;
    const offsetBeban = (page_beban - 1) * limit_beban;

    const total_pemasukan = await this.laporanRepo.getTotalPemasukan(month);
    const total_beban = await this.laporanRepo.getTotalBeban(month);
    const laba_rugi = total_pemasukan - total_beban;

    const detail_pemasukan = await this.laporanRepo.getDetailPemasukan(
      month,
      limit_pemasukan,
      offsetPemasukan
    );
    const detail_beban = await this.laporanRepo.getDetailBeban(
      month,
      limit_beban,
      offsetBeban
    );

    return {
      total_pemasukan,
      total_beban,
      laba_rugi,
      detail_pemasukan: {
        ...detail_pemasukan,
        page: page_pemasukan,
        limit: limit_pemasukan,
      },
      detail_beban: {
        ...detail_beban,
        page: page_beban,
        limit: limit_beban,
      },
    };
  }

  async getAll(page: number, limit: number, search: string, sort: string) {
    return this.laporanRepo.getAllWithPagination(page, limit, search, sort);
  }
}
