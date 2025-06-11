import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  no_hp: z.string().min(11, "Nomor HP tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Za-z]/, "Harus mengandung huruf besar")
    .regex(/[0-9]/, "Harus mengandung angka"),
});

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password harus 8 karakater"),
});
