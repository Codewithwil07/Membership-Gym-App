import React, { useEffect, useState, useRef } from "react";
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  QrCode,
  Download,
  Dumbbell,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  getDay,
  parseISO,
} from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { useAuth } from "@/context/AuthContext";
import * as htmlToImage from "html-to-image";
import clsx from "clsx";
import api from "@/api/axios";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  no_hp: string;
  role: string;
  status_akun: string;
  foto: string | null;
}

interface Absensi {
  id: number;
  tanggal: string;
  jam: string;
}

interface KartuMember {
  id: number;
  qr_code: string;
  berlaku_dari: string;
  berlaku_sampai: string;
  status: string;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const DashboardMember: React.FC = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [absensiList, setAbsensiList] = useState<Absensi[]>([]);
  const [kartuMember, setKartuMember] = useState<KartuMember | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [imageError, setImageError] = useState(false);

  const id = user?.id;

  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/user/profile/${id}`, {
        withCredentials: true,
      })
      .then((res) => setUserProfile(res.data.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/absensi/member/${id}`, {
        withCredentials: true,
      })
      .then((res) => setAbsensiList(res.data.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/api/card/${id}`, { withCredentials: true })
      .then((res) => setKartuMember(res.data.data))
      .catch(console.error);
  }, [id]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  const startDay = getDay(startOfMonth(currentMonth));
  const emptyLeadingDays = Array.from({ length: startDay }, () => null);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const hasAttendance = (date: Date) =>
    absensiList.some((absen) => isSameDay(parseISO(absen.tanggal), date));

  const lastAttendance =
    absensiList.length > 0 ? absensiList[absensiList.length - 1] : null;

  const downloadQR = () => {
    if (!qrRef.current) return;
    htmlToImage.toPng(qrRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `kartu_member_${userProfile?.username}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  if (!userProfile) {
    return <div className="text-white text-center mt-10">Memuat profil...</div>;
  }

  return (
    <div className="mx-auto p-5 md:p-0 xl:p-0">
      <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white">
        Selamat Datang,{" "}
        <span className="text-spotify-green">{userProfile.username}!</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 py-10">
        <div className="flex flex-col items-center">
          {/* --- KARTU MEMBER V2: Desain Premium Hitam-Hijau --- */}
          <div
            ref={qrRef}
            className={clsx(
              // Ukuran & Bentuk: Landscape seperti kartu kredit/ATM
              "w-96 aspect-video rounded-2xl",

              // Warna & Latar: Gradient gelap dengan shadow hijau untuk efek premium
              "bg-gradient-to-br from-gray-900 to-black text-gray-100",
              "shadow-2xl shadow-green-900/30",

              // Layout & Padding: Flexbox untuk mengatur konten dengan padding
              "p-5 flex flex-col justify-between",

              // Efek Tambahan: Posisi relatif untuk elemen dekoratif
              "relative overflow-hidden"
            )}
          >
            {/* Elemen Dekoratif: Watermark ikon di latar belakang */}
            <Dumbbell className="absolute text-white/5 text-[12rem] -right-10 -top-10 rotate-12" />

            {/* Bagian Atas: Judul dan Logo */}
            <div className="flex justify-between items-start">
              <h1 className="font-bold text-xl tracking-wide">
                PLATINUM MEMBER 
              </h1>
              <p className="font-semibold text-green-400">PLATINUM GYM</p>
            </div>

            {/* Bagian Bawah: Konten Utama (Info & QR) */}
            <div className="flex justify-between items-end">
              {/* Kiri: Foto dan Detail Member */}
              <div className="flex items-center gap-4">
                {userProfile.foto && !imageError ? (
                  <img
                    src={userProfile.foto}
                    alt={userProfile.username}
                    onError={() => setImageError(true)}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-green-500 text-black flex items-center justify-center font-bold text-2xl uppercase">
                    {getInitials(userProfile.username)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-lg">
                    {userProfile.username}
                  </p>
                  <p className="text-sm font-medium uppercase tracking-widest text-green-400">
                    {kartuMember ? kartuMember.status : "Status"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {kartuMember
                      ? `Berlaku Hingga: ${format(
                          parseISO(kartuMember.berlaku_sampai),
                          "dd MMM yyyy",
                          { locale: idLocale }
                        )}`
                      : "Tidak Aktif"}
                  </p>
                </div>
              </div>

              {/* Kanan: QR Code */}
              <div className="flex flex-col items-center gap-2">
                {kartuMember ? (
                  <div className="bg-white p-1.5 rounded-lg">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${kartuMember.qr_code}`}
                      alt="QR Code"
                      className="w-20 h-20"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center">
                    <QrCode size={80} className="text-white opacity-20" />
                  </div>
                )}
                <p className="font-mono text-xs text-gray-500">
                  {kartuMember
                    ? kartuMember.qr_code.slice(0, 12) + "..."
                    : "---"}
                </p>
              </div>
            </div>
          </div>

          {/* Tombol Unduh QR */}
          {kartuMember && (
            <div className="flex py-5">
              <button
                onClick={downloadQR}
                className="bg-spotify-green text-black px-4 py-2 rounded-full font-semibold flex items-center gap-1 hover:bg-opacity-80 transition"
              >
                <Download size={18} /> Unduh Kartu QR
              </button>
            </div>
          )}
        </div>

        {/* Kalender Absensi */}
        <section className="bg-spotify-card-bg p-5 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-spotify-light-card-bg text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-base font-semibold text-white">
              {format(currentMonth, "MMMM yyyy", { locale: idLocale })}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-spotify-light-card-bg text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {emptyLeadingDays.map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square"></div>
            ))}
            {daysInMonth.map((date) => {
              const isAttended = hasAttendance(date);
              const isCurrentDay = isToday(date);
              return (
                <div
                  key={format(date, "yyyy-MM-dd")}
                  className={`aspect-square flex items-center justify-center rounded-md text-xs relative
                  ${
                    isAttended
                      ? "bg-spotify-green/20 text-spotify-green font-bold"
                      : "text-white"
                  }
                  ${isCurrentDay ? "border border-spotify-green" : ""}`}
                >
                  {format(date, "d")}
                  {isAttended && (
                    <CheckCircle
                      size={12}
                      className="absolute bottom-1 right-1 text-spotify-green"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Absensi Terakhir */}
        {lastAttendance && (
          <div className="bg-spotify-card-bg p-4 rounded-xl shadow-lg flex items-center gap-3">
            <CalendarCheck size={20} className="text-spotify-green" />
            <p className="text-white text-sm">
              Absensi terakhir:{" "}
              <span className="font-semibold">
                {format(parseISO(lastAttendance.tanggal), "dd MMMM yyyy", {
                  locale: idLocale,
                })}
              </span>{" "}
              - <Clock size={14} className="inline-block mb-0.5" />{" "}
              {lastAttendance.jam}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardMember;
