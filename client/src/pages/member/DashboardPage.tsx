// src/pages/DashboardMember.tsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  CalendarCheck,
  QrCode,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
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
} from "date-fns";
import { id as idLocale } from "date-fns/locale";

import PromoCard from "@/components/member/PromoCard";

const DashboardMember: React.FC = () => {
  const currentUser = {
    name: "Budi Santoso",
    avatarInitials: "BS",
    membershipTier: "Gold Member",
  };

  const today = new Date();
  const expiresDate = new Date();
  expiresDate.setDate(today.getDate() + 30);

  const activeMembership = {
    packageName: "Premium Bulanan",
    expiresDate: format(expiresDate, "dd MMMM yyyy", { locale: idLocale }),
    isActive: true,
    qrCodeUrl: "https://example.com/qr/budi123",
    memberId: "GYM-BS-001",
  };

  const hasActiveMembership = activeMembership && activeMembership.isActive;

  const lastAttendance = {
    date: format(new Date(2025, 5, 28), "dd MMMM yyyy", { locale: idLocale }),
    time: "18:30 WIB",
    method: "QR Scan",
  };

  const dummyAttendanceDates: Date[] = [
    new Date(2025, 5, 10),
    new Date(2025, 5, 15),
    new Date(2025, 5, 20),
    new Date(2025, 5, 28),
    new Date(2025, 6, 1),
    new Date(2025, 6, 5),
    new Date(2025, 6, 8),
    new Date(2025, 6, 10),
    new Date(2025, 6, 12),
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
  const startDay = getDay(startOfMonth(currentMonth));
  const emptyLeadingDays = Array.from({ length: startDay }, () => null);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const hasAttendance = (date: Date) => {
    return dummyAttendanceDates.some((attDate) => isSameDay(attDate, date));
  };

  const isGoldMember = currentUser.membershipTier === "Gold Member";
  const avatarBgClass = isGoldMember
    ? "bg-gold-translucent"
    : "bg-spotify-green/30";
  const avatarTextClass = isGoldMember ? "text-gold" : "text-spotify-green";
  const avatarBorderClass = isGoldMember
    ? "border-gold"
    : "border-spotify-green";
  const mainCardBgClass = isGoldMember
    ? "bg-gradient-to-br from-gold-gradient-start to-gold-gradient-end"
    : "bg-gradient-to-br from-spotify-card-bg to-spotify-card-bg";
  const mainCardTextColor = isGoldMember
    ? "text-spotify-black"
    : "text-spotify-text-white";
  const mainCardDimmedTextColor = isGoldMember
    ? "text-gray-700"
    : "text-spotify-text-light-grey";
  const mainCardLinkColor = isGoldMember
    ? "text-blue-800"
    : "text-spotify-green";

  return (
    <div className="bg-spotify-dark rounded-xl shadow-2xl space-y-6 md:space-y-8">
      <h1 className="text-2xl font-bold text-spotify-text-white leading-tight mb-3 md:text-3xl md:mb-4 text-center md:text-left">
        Selamat Datang Kembali, <br className="md:hidden" />
        <span className="text-spotify-green">{currentUser.name}!</span>
      </h1>

      {/* Kartu Member */}
      <div className="grid md:grid-cols-2">
        <section
          className={`relative p-5 md:p-6 rounded-lg shadow-xl overflow-hidden h-fit ${mainCardBgClass}`}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/graphy.png")',
              backgroundSize: "200px",
            }}
          ></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between space-y-5 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="flex flex-col items-center text-center md:items-start">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-md mb-2 ${avatarBgClass} ${avatarTextClass} ${avatarBorderClass}`}
              >
                {currentUser.avatarInitials}
              </div>
              <h2 className={`text-xl font-bold ${mainCardTextColor}`}>
                {currentUser.name}
              </h2>
              <p className={`${mainCardDimmedTextColor} text-xs`}>
                {currentUser.membershipTier}
              </p>
            </div>

            {/* Status Membership */}
            {hasActiveMembership ? (
              <div className="flex flex-col items-center text-center space-y-3 md:items-end">
                <div
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    isGoldMember
                      ? "bg-gold-dark text-white"
                      : "bg-spotify-green text-white"
                  }`}
                >
                  <Award size={16} /> Membership Aktif
                </div>
                <p className={`${mainCardTextColor} text-base font-bold`}>
                  Paket:{" "}
                  <span className={mainCardLinkColor}>
                    {activeMembership.packageName}
                  </span>
                </p>
                <p className={`${mainCardDimmedTextColor} text-xs`}>
                  Berlaku hingga:{" "}
                  <span className={`${mainCardTextColor} font-semibold`}>
                    {activeMembership.expiresDate}
                  </span>
                </p>
                <button
                  onClick={() => alert("Menampilkan QR Code untuk scan!")}
                  className="px-5 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition duration-200 flex items-center gap-1.5 shadow-md"
                >
                  <QrCode size={18} /> Tunjukkan Kartu Member
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-3 md:items-end">
                <p className={`${mainCardTextColor} text-base font-bold`}>
                  Anda belum memiliki membership aktif.
                </p>
                <p className={`${mainCardDimmedTextColor} text-xs`}>
                  Ayo mulai perjalanan kebugaran Anda!
                </p>
                <Link
                  to="/membership"
                  className="px-5 py-2 bg-spotify-green text-white font-bold rounded-full hover:bg-opacity-90 transition duration-200 flex items-center gap-1.5 shadow-md"
                >
                  <Award size={16} /> Dapatkan Membership Sekarang
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Grid Absensi dan Promo */}
        {/* Kalender Absensi */}
        <section className="p-5 bg-spotify-card-bg rounded-xl shadow-lg md:p-6">
          <h2 className="text-xl font-semibold text-white mb-3 text-center">
            Riwayat Absensi
          </h2>
          {/* Kalender */}
          <div className="mx-auto max-w-sm">
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
                    className={`aspect-square flex items-center justify-center rounded-md text-xs
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
          </div>

          {/* Absensi Terakhir */}
          <div className="mt-4 md:mx-36">
            <h3 className="text-white font-semibold mb-2">Absensi Terakhir</h3>
            <div className="text-white text-sm flex items-center gap-2">
              <CalendarCheck size={16} /> {lastAttendance.date} -{" "}
              <Clock size={14} /> {lastAttendance.time}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardMember;
