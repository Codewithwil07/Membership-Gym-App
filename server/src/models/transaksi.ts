
export interface TransaksiDTO {
  user_id: number;
  paket_id: number;
  order_id: string;
  jumlah_bayar: number;
  status?: "pending" | "paid" | "failed";
  metode_pembayaran?: string;
}

export interface TransaksiResponse extends TransaksiDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface LaporanKeuanganQuery {
  month: string; // format YYYY-MM
  page_pemasukan?: number;
  limit_pemasukan?: number;
  page_beban?: number;
  limit_beban?: number;
}