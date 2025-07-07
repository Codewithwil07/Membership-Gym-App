// src/context/ProfileContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import api from "@/api/axios";

// Definisikan tipe untuk objek profil (sesuaikan dengan data Anda)
interface Profile {
  username: string;
  email: string;
  foto?: string; // Tanda tanya (?) berarti properti ini opsional
  // tambahkan properti lain yang ada di profil Anda
}

// 1. Definisikan tipe untuk nilai yang ada di dalam Context
interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  error: string;
  fetchProfile: () => Promise<void>;
}

// 2. Terapkan tipe saat membuat context.
// Beri nilai awal 'undefined' dan TypeScript akan tahu tipenya dari sini.
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Komponen Provider
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth(); // Ganti ini
  const userId = user?.id; // Ganti ini

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/user/profile/${userId}`,
        { withCredentials: true }
      );
      setProfile(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil profil:", error);
      setProfile(null); // Set ke null jika gagal
      setError("Gagal mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const value = { profile, isLoading, error, fetchProfile };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

// 3. Buat custom hook yang aman secara tipe
export function useProfile() {
  const context = useContext(ProfileContext);
  // Cek ini memastikan context digunakan di dalam provider
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
