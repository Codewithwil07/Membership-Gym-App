import { z } from "zod";

export const createTransaksiSchema = z.object({
  username: z.string(),
  paket_id: z.number(),
  metode_pembayaran: z.enum(["cash", "transfer", "ewallet"]),
});

export const verifyTransaksiSchema = z.object({
  status_verifikasi: z.enum(["pending", "verified", "rejected"]),
  verified_by: z.number(),
});
