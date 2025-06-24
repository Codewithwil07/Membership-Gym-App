// services/transaksiService.ts
import db from "../config/db";
import { TransaksiRepository } from "../repositories/transaksiRepository";
import {
  CreateTransaksiDTO,
  UpdateVerifikasiDTO,
  TransaksiResponse,
} from "../models/transaksi";
import { kodeUnikEmai } from "../utils/transaksiHelper";

export class TransaksiService {
  constructor(private repo: TransaksiRepository) {}
  async createManual(
    data: CreateTransaksiDTO,
    verified_by: number
  ): Promise<TransaksiResponse> {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      let user_id: number | null = null;
      let rnNum: number = Math.random();

      if (data.paket_id !== 1) {
        // Paket berlangganan => wajib auto-insert user
        if (!data.username) {
          throw {
            status: 400,
            message: "Nama wajib diisi untuk paket berlangganan",
          };
        }

        const user = await this.repo.findUserByUsername(conn, data.username);

        const kodeUnik = kodeUnikEmai();

        if (!user) {
          // insert user baru
          user_id = await this.repo.insertUserAuto(conn, {
            username: data.username,
            email: `dummy${kodeUnik}@gmail.com`, // dummy
            no_hp: "-", // dummy
            password: "-", // dummy
            role: "member",
            status_akun: "active",
          });
          const nonWebUser = await this.repo.findUserByUsername(
            conn,
            data.username
          );
          await this.repo.updateTanggalBergabung(conn, nonWebUser.id);
        } else {
          await this.repo.updateTanggalBergabung(conn, user.id);
          user_id = user.id;
        }
      } else {
        // Harian => transaksi tanpa user (user_id NULL atau dummy ID)
        user_id = null; // atau user_id = 0 jika FK gak nullable
      }

      const id = await this.repo.insertTransaksi(conn, {
        user_id,
        paket_id: data.paket_id,
        metode_pembayaran: data.metode_pembayaran,
        verified_by,
      });

      await conn.commit();

      return await this.repo.findById(conn, id);
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async verify(data: UpdateVerifikasiDTO): Promise<TransaksiResponse> {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      // Pastikan id numeric
      const parseId = parseInt(String(data.id));
      if (isNaN(parseId)) throw { status: 400, message: "ID tidak valid" };

      const transaksi = await this.repo.findById(conn, parseId);
      if (!transaksi)
        throw { status: 404, message: "Transaksi tidak ditemukan" };

      // Update status + verified_by
      await this.repo.updateStatus(conn, {
        id: parseId,
        status_verifikasi: data.status_verifikasi,
        verified_by: data.verified_by,
      });

      // Update tanggal bergabung kalau ada user_id
      if (transaksi.user_id) {
        await this.repo.updateTanggalBergabung(conn, transaksi.user_id);
      }

      const updated = await this.repo.findById(conn, parseId);
      if (!updated)
        throw {
          status: 500,
          message: "Transaksi tidak ditemukan setelah update",
        };

      await conn.commit();
      return updated;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async getAll(
    page: number,
    limit: number,
    search: string,
    sort: string
  ): Promise<{ data: TransaksiResponse[]; total: number }> {
    const conn = await db.getConnection();
    try {
      const offset = (page - 1) * limit;
      const data = await this.repo.getAll(conn, search, sort, limit, offset);
      const total = await this.repo.countAll(conn, search);
      return { data, total };
    } finally {
      conn.release();
    }
  }

  async getById(id: number): Promise<TransaksiResponse> {
    const conn = await db.getConnection();
    try {
      const transaksi = await this.repo.findById(conn, id);
      if (!transaksi)
        throw { status: 404, message: "Transaksi tidak ditemukan" };
      return transaksi;
    } finally {
      conn.release();
    }
  }
}
