// src/validations/paketValidation.ts
import { z } from "zod";

export const createPaketSchema = z.object({
  nama_paket: z.string().min(3, "Nama paket minimal 3 karakter"),
  durasi_hari: z
    .number({ invalid_type_error: "Durasi harus berupa angka" })
    .int("Durasi harus berupa bilangan bulat")
    .positive("Durasi harus lebih dari 0"),
  harga: z
    .number({ invalid_type_error: "Harga harus berupa angka" })
    .positive("Harga harus lebih dari 0"),
  deskripsi: z.string().optional(),
});

export const updatePaketSchema = z.object({
  nama_paket: z.string().min(3, "Nama paket minimal 3 karakter").optional(),
  durasi_hari: z
    .number({ invalid_type_error: "Durasi harus berupa angka" })
    .int("Durasi harus berupa bilangan bulat")
    .positive("Durasi harus lebih dari 0")
    .optional(),
  harga: z
    .number({ invalid_type_error: "Harga harus berupa angka" })
    .positive("Harga harus lebih dari 0")
    .optional(),
  deskripsi: z.string().optional(),
});
