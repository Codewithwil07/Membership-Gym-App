// models/transaksi.ts
export interface CreateTransaksiDTO {
  username?: string;
  paket_id: number;
  metode_pembayaran: string;
}

export interface UpdateVerifikasiDTO {
  id: string;
  status_verifikasi: "pending" | "verified" | "rejected";
  verified_by: number;
}

export interface TransaksiResponse {
  id: number;
  user_id: number | null;
  paket_id: number;
  tanggal_transaksi: Date;
  metode_pembayaran: string;
  bukti_pembayaran: string | null;
  status_verifikasi: "pending" | "verified" | "rejected";
  verified_by: number | null;
  tanggal_verifikasi: Date | null;
  catatan_admin: string | null;
}
