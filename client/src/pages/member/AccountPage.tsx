// src/pages/AccountPage.tsx

import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // pastikan AuthContext memiliki user dengan id

  const { profile, isLoading, error } = useProfile();

  const userId = user?.id; // sementara pakai 38 untuk testing

  const handleEditProfile = () => {
    navigate(`/account/edit-profile/${userId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const getAccountStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === "active" || lowerStatus === "aktif") {
      return <CheckCircle size={20} className="text-spotify-green" />;
    }
    return <Ban size={20} className="text-red-500" />;
  };

  if (isLoading) {
    return (
      <p className="text-center text-spotify-text-white mt-10">Loading...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  const formattedJoinDate = format(new Date(), "dd MMMM yyyy", {
    locale: idLocale,
  }); // backend tidak kirim joinDate, pakai placeholder

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-screen-md mx-auto bg-spotify-card-bg rounded-xl shadow-2xl p-4 space-y-6 md:p-6 md:space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white leading-tight">
          Pengaturan <span className="text-spotify-green">Akun</span>
        </h1>
        <p className="text-spotify-text-light-grey text-sm md:text-base mb-8">
          Kelola informasi pribadi dan keamanan akun Anda.
        </p>
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader className="flex flex-col items-center text-center pb-4">
            <Avatar className="w-24 h-24 mb-4 border-4 border-spotify-green shadow-md">
              <AvatarImage src={profile.foto ?? ""} alt={profile.username} />
              <AvatarFallback className="bg-spotify-green/20 text-spotify-green text-4xl font-bold">
                {profile.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-bold">
              {profile.username}
            </CardTitle>
            <CardDescription className="text-spotify-text-light-grey text-base">
              {profile.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6">
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <UserIcon size={20} className="text-spotify-green" />
              <span>
                Username:{" "}
                <span className="font-semibold text-spotify-text-white">
                  {profile.username}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <Phone size={20} className="text-spotify-green" />
              <span>
                Telepon:{" "}
                <span className="font-semibold text-spotify-text-white">
                  {profile.no_hp ?? "-"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              <Tag size={20} className="text-spotify-green" />
              <span>
                Role:{" "}
                <span className="font-semibold capitalize text-spotify-text-white">
                  {profile.role}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-spotify-text-light-grey">
              {getAccountStatusIcon(profile.status_akun)}
              <span>
                Status Akun:{" "}
                <span className="font-semibold capitalize text-spotify-text-white">
                  {profile.status_akun}
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
      </div>
    </div>
  );
};

export default AccountPage;
