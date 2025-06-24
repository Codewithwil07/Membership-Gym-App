export interface PaketDTO {
  nama_paket: string;
  durasi_hari: number;
  harga: number;
  deskripsi?: string;
  status_aktif?: "active" | "inactive";
}

export interface PaketResponse extends PaketDTO {
  id: number;
  created_at: Date;
}
