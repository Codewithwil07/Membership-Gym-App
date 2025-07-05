import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/api/authService";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
  role: "admin" | "member";
  is_superadmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { username: string; email: string; password: string; no_hp: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      const res = await authService.getMe();
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authService.login({ email, password });
      await fetchUser();
      toast({ title: "Login berhasil", description: "Selamat datang kembali!" });
    } catch (error: any) {
      toast({
        title: "Login gagal",
        description: error?.response?.data?.message || "Email atau password salah.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: { username: string; email: string; password: string; no_hp: string }) => {
    setLoading(true);
    try {
      await authService.register(data);
      toast({ title: "Registrasi berhasil", description: "Silakan login." });
    } catch (error: any) {
      toast({
        title: "Registrasi gagal",
        description: error?.response?.data?.message || "Terjadi kesalahan saat registrasi.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      toast({ title: "Logout berhasil", description: "Anda telah keluar dari akun." });
    } catch (error: any) {
      toast({
        title: "Logout gagal",
        description: error?.response?.data?.message || "Terjadi kesalahan saat logout.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
