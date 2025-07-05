// src/pages/AccountPage.tsx
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User as UserIcon,
  Phone,
  Calendar,
  Tag,
  CheckCircle,
  Ban,
} from "lucide-react"; // Tambah Share2, Copy icons

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { useAuth } from "@/context/AuthContext";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Data dummy user (akan diambil dari API nanti)
  const currentUser = {
    id: 1,
    username: "budisantoso",
    name: "Budi Santoso",
    avatarUrl: "https://github.com/shadcn.png",
    avatarInitials: "BS",
    email: "budi.santoso@example.com",
    phoneNumber: "0812-3456-7890",
    role: "member",
    accountStatus: "aktif",
    joinDate: new Date("2024-01-15"),
    membershipTier: "Gold Member",
    referralCode: "BUDI2025GYM", // <<-- KODE REFERRAL BARU DI SINI
  };

  const formattedJoinDate = format(currentUser.joinDate, "dd MMMMyyyy", {
    locale: idLocale,
  });

  const handleEditProfile = () => {
    navigate("/account/edit-profile");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleChangePassword = () => {
    alert("Mengarahkan ke halaman/modal ubah password.");
  };

  const getAccountStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "aktif":
        return <CheckCircle size={20} className="text-spotify-green" />;
      case "nonaktif":
        return <Ban size={20} className="text-red-500" />;
      case "suspended":
        return <Ban size={20} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-screen-md mx-auto bg-spotify-card-bg rounded-xl shadow-2xl p-4 space-y-6 md:p-6 md:space-y-8">
        {/* Header Halaman */}
        <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white leading-tight">
          Pengaturan <span className="text-spotify-green">Akun</span>
        </h1>
        <p className="text-spotify-text-light-grey text-sm md:text-base mb-8">
          Kelola informasi pribadi dan keamanan akun Anda.
        </p>

        {/* Bagian Informasi Profil */}
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader className="flex flex-col items-center text-center pb-4">
            \
            <Avatar className="w-24 h-24 mb-4 border-4 border-spotify-green shadow-md">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback className="bg-spotify-green/20 text-spotify-green text-4xl font-bold">
                {currentUser.avatarInitials}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">
              {currentUser.name}
            </CardTitle>
            <CardDescription className="text-spotify-text-light-grey text-base">
              {currentUser.membershipTier}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6">
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <UserIcon size={20} className="text-spotify-green" />
              <span>
                Username:{" "}
                <span className="font-semibold text-spotify-text-white">
                  {currentUser.username}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <Phone size={20} className="text-spotify-green" />
              <span>
                Telepon:{" "}
                <span className="font-semibold text-spotify-text-white">
                  {currentUser.phoneNumber}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <Tag size={20} className="text-spotify-green" />
              <span>
                Role:{" "}
                <span className="font-semibold capitalize text-spotify-text-white">
                  {currentUser.role}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              {getAccountStatusIcon(currentUser.accountStatus)}
              <span>
                Status Akun:{" "}
                <span className="font-semibold capitalize text-spotify-text-white">
                  {currentUser.accountStatus}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <Calendar size={20} className="text-spotify-green" />
              <span>
                Bergabung sejak:{" "}
                <span className="font-semibold text-spotify-text-white">
                  {formattedJoinDate}
                </span>
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-4 px-6 flex-col gap-y-5">
            <Button
              onClick={handleEditProfile}
              className="w-full bg-spotify-green text-spotify-black font-bold py-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant={"destructive"}
              className="w-full text-spotify-black font-bold py-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
        {/* --- AKHIR BAGIAN BARU: KODE REFERRAL SAYA --- */}
      </div>
    </div>
  );
};

export default AccountPage;
