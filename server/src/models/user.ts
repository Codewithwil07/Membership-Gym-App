export interface RegisterDTO {
  username: string;
  email: string;
  no_hp: string;
  password: string;
}

export interface ManageUser {
  username: string;
  email: string;
  password: string;
  no_hp: string;
  role: "admin" | "member";
  status_akun: "active" | "inactive";
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  password: string
  email: string;
  role: "admin" | "member";
  status_akun: "active" | "inactive";
}


export interface getAllUsers {
  page: string,
  limit: string, 
  search?: string
}