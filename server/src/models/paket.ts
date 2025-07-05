export interface PaketDTO {
  nama_paket: string;
  durasi_hari: number;
  harga: number;
  deskripsi?: string;
}

export interface PaketResponse extends PaketDTO {
  id: number;
  created_at: Date;
}
