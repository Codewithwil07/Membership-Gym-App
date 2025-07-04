import { TransaksiRepository } from "../repositories/transaksiRepository";
import { KartuMemberRepository } from "../repositories/kartuMemberRepository";
import { PaketRepository } from "../repositories/paketRepository";
import { UserRepository } from "../repositories/userRepository";
import midtransClient from "midtrans-client";
import crypto from "crypto";
import dayjs from "dayjs";

export class PaymentService {
  constructor(
    private transaksiRepo: TransaksiRepository,
    private kartuRepo: KartuMemberRepository,
    private paketRepo: PaketRepository,
    private userRepo: UserRepository
  ) {}

  async createPayment(
    user_id: number,
    paket_id: number,
    payment_type?: string
  ) {
    // ✅ Auto expire membership sebelum proses
    await this.autoExpireMemberships();

    const paket = await this.paketRepo.getById(paket_id);
    if (!paket) throw { status: 404, message: "Paket tidak ditemukan" };

    const now = dayjs();
    const activeCard = await this.kartuRepo.findActiveByUserId(user_id);

    if (activeCard) {
      const expiredDate = dayjs(activeCard.berlaku_sampai);
      const diffDays = expiredDate.diff(now, "day");

      if (paket.durasi_hari === 1) {
        // ❌ tidak boleh beli paket 1 hari sebelum expired
        if (expiredDate.isAfter(now)) {
          throw {
            status: 400,
            message: `Paket 1 hari masih aktif hingga ${expiredDate.format(
              "DD-MM-YYYY HH:mm"
            )}`,
          };
        }
      } else {
        // ❌ hanya boleh perpanjang jika sisa <= 5 hari
        if (diffDays > 5) {
          throw {
            status: 400,
            message: `Membership aktif, hanya bisa perpanjang jika sisa ≤ 5 hari (sisa ${diffDays} hari)`,
          };
        }
      }
    }

    const order_id = `ORDER-${Date.now()}`;
    const jumlah_bayar = paket.harga;

    await this.transaksiRepo.create({
      user_id,
      paket_id,
      order_id,
      jumlah_bayar,
      status: "pending",
      metode_pembayaran: payment_type || null,
    });

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.MIDTRANS_CLIENT_KEY!,
    });

    const parameter: any = {
      transaction_details: {
        order_id,
        gross_amount: jumlah_bayar,
      },
      customer_details: {
        first_name: "Member",
      },
    };

    if (payment_type) {
      parameter.enabled_payments = [payment_type];
    }

    const snapResponse = await snap.createTransaction(parameter);

    return {
      order_id,
      payment_url: snapResponse.redirect_url,
      token: snapResponse.token,
    };
  }

  async handleWebhook(
    order_id: string,
    transaction_status: string,
    payment_type?: string
  ) {
    const transaksi = await this.transaksiRepo.findByOrderId(order_id);
    if (!transaksi) throw { status: 404, message: "Transaksi tidak ditemukan" };

    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      await this.transaksiRepo.updateStatus(
        order_id,
        "paid",
        payment_type || null
      );

      const paket = await this.paketRepo.getById(transaksi.paket_id);
      if (!paket) throw { status: 404, message: "Paket tidak ditemukan" };

      const now = dayjs();
      let berlaku_dari = now;
      let berlaku_sampai = now;

      if (paket.durasi_hari === 1) {
        // Paket 1 hari: aktif saat bayar, expired jam 23:59
        berlaku_sampai = now.endOf("day");
      } else {
        // Paket lain: aktif saat bayar, expired sesuai durasi
        berlaku_sampai = now.add(paket.durasi_hari, "day");
      }

      const activeCard = await this.kartuRepo.findActiveByUserId(
        transaksi.user_id
      );

      if (activeCard && paket.durasi_hari > 1) {
        const expiredDate = dayjs(activeCard.berlaku_sampai);
        berlaku_dari = expiredDate.add(1, "day");
        berlaku_sampai = berlaku_dari.add(paket.durasi_hari, "day");
      }

      const existingCard = await this.kartuRepo.findByTransaksiId(transaksi.id);
      if (!existingCard) {
        const randomStr = crypto.randomBytes(4).toString("hex");
        const qr_code = `QR-${transaksi.user_id}-${Date.now()}-${randomStr}`;

        await this.kartuRepo.create({
          user_id: transaksi.user_id,
          transaksi_id: transaksi.id,
          qr_code,
          berlaku_dari: berlaku_dari.toDate(),
          berlaku_sampai: berlaku_sampai.toDate(),
          status: "active",
        });
      }

    //   const user = await this.userRepo.findById(transaksi.user_id);
      await this.userRepo.updateStatus(
        transaksi.user_id,
        "active",
        now.toDate()
      );
    } else if (
      transaction_status === "expire" ||
      transaction_status === "cancel"
    ) {
      await this.transaksiRepo.updateStatus(
        order_id,
        "failed",
        payment_type || null
      );
    }
  }

  // ✅ Dipanggil sebelum proses payment / login / scan
  async autoExpireMemberships() {
    const now = dayjs().toDate();
    await this.kartuRepo.expireMemberships(now);
    console.log(this.kartuRepo);
  }
}
