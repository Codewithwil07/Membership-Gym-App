import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  QrCode,
  X,
  Download,
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
  const [showQR, setShowQR] = useState(false);
  const [imageError, setImageError] = useState(false);

  const id = user?.id;

  const qrRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:3000/user/profile/${id}`, { withCredentials: true })
      .then((res) => setUserProfile(res.data.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:3000/api/absensi/member/${id}`, { withCredentials: true })
      .then((res) => setAbsensiList(res.data.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:3000/api/card/${id}`, { withCredentials: true })
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
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-spotify-text-white text-center">
        Selamat Datang, <span className="text-spotify-green">{userProfile.username}!</span>
      </h1>

      {/* Kartu Member */}
      {kartuMember && (
        <div
          ref={qrRef}
          className={clsx(
            "rounded-2xl shadow-xl p-4 text-black relative overflow-hidden",
            "bg-gradient-to-b from-yellow-100 to-yellow-200 w-full aspect-[2/3] flex flex-col justify-between items-center"
          )}
        >
          <div className="w-full flex flex-col items-center mt-3">
            {userProfile.foto && !imageError ? (
              <img
                src={userProfile.foto}
                alt={userProfile.username}
                onError={() => setImageError(true)}
                className="w-20 h-20 rounded-full object-cover border-4 border-spotify-green"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-spotify-green text-black flex items-center justify-center font-bold text-xl uppercase">
                {getInitials(userProfile.username)}
              </div>
            )}
            <p className="font-bold text-lg mt-2">{userProfile.username}</p>
            <p className="text-sm font-medium capitalize">{kartuMember.status}</p>
          </div>
          <div className="flex justify-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${kartuMember.qr_code}`}
              alt="QR Code"
              className="w-32 h-32"
            />
          </div>
          <div className="text-center text-sm mb-3">
            <p>Kode: {kartuMember.qr_code.slice(0, 12)}...</p>
            <p>
              Berlaku:{" "}
              {format(parseISO(kartuMember.berlaku_dari), "dd MMM yyyy", { locale: idLocale })} -{" "}
              {format(parseISO(kartuMember.berlaku_sampai), "dd MMM yyyy", { locale: idLocale })}
            </p>
          </div>
        </div>
      )}

      {/* Tombol Unduh QR */}
      {kartuMember && (
        <div className="flex justify-center">
          <button
            onClick={downloadQR}
            className="bg-spotify-green text-black px-4 py-2 rounded-full font-semibold flex items-center gap-1 hover:bg-opacity-80 transition"
          >
            <Download size={18} /> Unduh Kartu QR
          </button>
        </div>
      )}

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
                  ${isAttended ? "bg-spotify-green/20 text-spotify-green font-bold" : "text-white"}
                  ${isCurrentDay ? "border border-spotify-green" : ""}`}
              >
                {format(date, "d")}
                {isAttended && (
                  <CheckCircle size={12} className="absolute bottom-1 right-1 text-spotify-green" />
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
              {format(parseISO(lastAttendance.tanggal), "dd MMMM yyyy", { locale: idLocale })}
            </span>{" "}
            - <Clock size={14} className="inline-block mb-0.5" /> {lastAttendance.jam}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardMember;
