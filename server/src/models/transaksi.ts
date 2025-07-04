
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
