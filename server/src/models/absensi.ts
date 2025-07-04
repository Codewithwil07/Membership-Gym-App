export interface AbsensiDTO {
  id?: number;
  user_id: number;
  tanggal: string; // "YYYY-MM-DD"
  keterangan?: string | null;
}

export interface AbsensiResponse {
  id: number;
  user_id: number;
  tanggal: string;
  keterangan: string | null;
  created_at: Date;
}
