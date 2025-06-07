// models/User.ts

// ✅ Untuk autentikasi login
export class LoginDTO {
  constructor(public email: string, public password: string) {}
}

// ✅ Untuk registrasi user baru
export class RegisterDTO {
  constructor(
    public username: string,
    public email: string,
    public no_hp: string,
    public password: string,
  ) {}
}

// ✅ Untuk tampilan profil lengkap (misalnya untuk admin)
export class UserProfile {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public no_hp: string,
    public tanggal_lahir: Date,
    public jenis_kelamin: "L" | "P",
    public alamat: string,
    public foto: string,
    public role: "admin" | "member",
    public status_akun: boolean,
    public tanggal_bergabung: Date,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
