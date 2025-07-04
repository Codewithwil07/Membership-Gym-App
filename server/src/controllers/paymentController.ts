import { Request, Response } from "express";
import { PaymentService } from "../services/paymentService";
import { successResponse } from "../utils/response";
import { TransaksiRepository } from "../repositories/transaksiRepository";
import { KartuMemberRepository } from "../repositories/kartuMemberRepository";
import { PaketRepository } from "../repositories/paketRepository";
import { UserRepository } from "../repositories/userRepository";

// ✅ Proper DI
const paymentService = new PaymentService(
  new TransaksiRepository(),
  new KartuMemberRepository(),
  new PaketRepository(),
  new UserRepository()
);

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    try {
      const user_id = req.user.id;
      const { paket_id, payment_type } = req.body;

      const data = await paymentService.createPayment(
        user_id,
        paket_id,
        payment_type
      );

      successResponse(res, 201, "Payment URL berhasil dibuat", data);
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }

  static async handleWebhook(req: Request, res: Response) {
    try {
      const { order_id, transaction_status, payment_type } = req.body;
      await paymentService.handleWebhook(
        order_id,
        transaction_status,
        payment_type
      );
      successResponse(res, 200, "Webhook processed");
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || "Terjadi kesalahan di server",
      });
    }
  }
}
