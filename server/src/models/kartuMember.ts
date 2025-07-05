export interface KartuMemberDTO {
  user_id: number;
  transaksi_id: number;
  qr_code: string;
  berlaku_dari: Date;
  berlaku_sampai: Date;
  status?: "active" | "inactive" | "expired";
}

export interface KartuMemberResponse extends KartuMemberDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
}
