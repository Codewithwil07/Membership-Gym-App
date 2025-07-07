// src/pages/EditProfilePage.tsx

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import api from "@/api/axios";

interface ProfileData {
  username: string;
  email: string;
  phoneNumber: string;
  foto: string | null;
}

const EditProfilePage: React.FC = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProfileData>({
    username: "",
    email: "",
    phoneNumber: "",
    foto: null,
  });

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { fetchProfile } = useProfile(); //

  // Fetch data user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(
          `/user/profile/${userId}`,
          { withCredentials: true }
        );
        const data = res.data.data;
        setFormData({
          username: data.username,
          email: data.email,
          phoneNumber: data.no_hp ?? "",
          foto: data.foto,
        });
        setAvatarPreviewUrl(data.foto ?? "");
      } catch (err) {
        console.error(err);
        setError("Gagal memuat profil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  // Handle input text
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Upload foto profil ke backend (Cloudinary)
  const handleUploadProfilePhoto = async (file: File) => {
    const formDataUpload = new FormData();
    formDataUpload.append("photo", file);

    try {
      const res = await api.put(
        `/user/profile/${userId}/photo`,
        formDataUpload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await fetchProfile()

      const uploadedUrl = res.data.url;
      setAvatarPreviewUrl(uploadedUrl);

      toast({
        title: "Foto profil diperbarui",
        description: "Foto profil berhasil diunggah.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Gagal upload foto",
        description: "Terjadi kesalahan saat upload foto profil.",
      });
    }
  };

  // Trigger input file
  const handleClickAvatarChange = () => {
    fileInputRef.current?.click();
  };

  // Saat file dipilih
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreviewUrl(URL.createObjectURL(file)); // preview cepat
      handleUploadProfilePhoto(file); // upload ke Cloudinary langsung
    }
  };

  // Update data profile (tanpa foto)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        no_hp: formData.phoneNumber,
      };

      await api.put(`/user/profile/${userId}`, payload, {
        withCredentials: true,
      });

      await fetchProfile();

      toast({
        title: "Profil berhasil diperbarui",
        description: "Perubahan telah disimpan.",
      });

      navigate("/account");
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Gagal memperbarui profil",
        description: "Terjadi kesalahan saat menyimpan data.",
      });
    }
  };

  if (loading) {
    return (
      <p className="text-center text-spotify-text-white mt-10">Loading...</p>
    );
  }
  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-screen-md mx-auto bg-spotify-card-bg rounded-xl shadow-2xl p-4 space-y-6 md:p-6 md:space-y-8">
        {/* Back */}
        <Link
          to="/account"
          className="inline-flex items-center text-spotify-text-light-grey hover:text-spotify-text-white transition-colors text-sm font-semibold mb-4"
        >
          <ChevronLeft size={20} className="mr-1" /> Kembali ke Akun
        </Link>

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white leading-tight mb-4 text-center">
          Edit <span className="text-spotify-green">Profil</span>
        </h1>
        <p className="text-spotify-text-light-grey text-sm md:text-base mb-8 text-center">
          Perbarui informasi pribadi dan foto Anda.
        </p>

        {/* Form */}
        <Card className="bg-spotify-card-bg border border-spotify-border text-spotify-text-white rounded-xl shadow-lg p-5 md:p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">
              Informasi Pribadi
            </CardTitle>
            <CardDescription className="text-spotify-text-light-grey text-sm">
              Perbarui detail akun Anda di sini.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar className="w-32 h-32 border-4 border-spotify-green shadow-md relative group">
                  {avatarPreviewUrl ? (
                    <AvatarImage src={avatarPreviewUrl} alt="Foto Profil" />
                  ) : null}
                  <AvatarFallback className="bg-spotify-green/20 text-spotify-green text-5xl font-bold">
                    {formData.username?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>

                  {/* Overlay edit */}
                  <div
                    onClick={handleClickAvatarChange}
                    className="absolute inset-0 bg-spotify-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                    title="Ubah Foto"
                  >
                    <Camera size={32} className="text-spotify-text-white" />
                  </div>
                </Avatar>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={handleClickAvatarChange}
                  type="button"
                  variant="ghost"
                  className="text-spotify-green hover:text-spotify-text-white"
                >
                  Ubah Foto Profil
                </Button>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-spotify-text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green placeholder:text-spotify-placeholder-grey"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-spotify-text-white"
                >
                  Nomor Telepon
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green placeholder:text-spotify-placeholder-grey"
                />
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                type="submit"
                className="w-full bg-spotify-green text-spotify-black font-bold py-2 rounded-full hover:bg-opacity-90 transition-colors"
              >
                Simpan Perubahan
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;
