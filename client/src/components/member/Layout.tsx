import React, { ReactNode } from "react"; // FIX: Impor React dan ReactNode
import { Link, NavLink } from "react-router-dom";
import { Home, Package, Percent, User, DumbbellIcon } from "lucide-react";
import { useProfile } from "@/context/ProfileContext";
import clsx from "clsx";

// ===================================
// == KOMPONEN-KOMPONEN HELPER ==
// ===================================

// Komponen ini bisa dipindah ke file sendiri (e.g., src/components/AvatarFallback.tsx)
const AvatarFallback = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={clsx(
      "w-full h-full rounded-full bg-spotify-light-border flex items-center justify-center",
      className
    )}
  >
    {children || <User size={"60%"} />}
  </div>
);

// REFACTOR: Komponen baru untuk membungkus semua logika tampilan avatar
const ProfileAvatar = ({ size = "w-8 h-8" }) => {
  const { profile } = useProfile();

  // FIX: Logika yang aman untuk menampilkan avatar
  if (profile?.foto) {
    return (
      <img
        src={profile.foto}
        alt="Profile"
        className={clsx("object-cover rounded-full", size)}
      />
    );
  }

  if (profile?.username) {
    return (
      <div className={clsx("rounded-full", size)}>
        <AvatarFallback className="bg-spotify-green/20 text-spotify-green text-lg font-bold">
          {profile.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </div>
    );
  }
  
  // Default jika tidak ada profile sama sekali
  return (
    <div className={clsx("rounded-full", size)}>
      <AvatarFallback />
    </div>
  );
};

// REFACTOR: Fungsi untuk mengurangi duplikasi className pada NavLink
const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  clsx("transition-colors", {
    "text-white": isActive,
    "text-spotify-dimmed hover:text-white": !isActive,
  });

// ===================================
// ==       KOMPONEN UTAMA          ==
// ===================================

const mobileNavLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/packages", label: "Paket", icon: Package },
  { href: "/payment/history", label: "Payments", icon: Percent },
  { href: "/account", label: "Akun", icon: User }, // Ikon User tetap sebagai fallback
];

const desktopNavLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/packages", label: "Paket" },
  { href: "/payment/history", label: "Payments" },
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-spotify-dark min-h-screen text-white">
      {/* ======================= */}
      {/* == DESKTOP TOP BAR == */}
      {/* ======================= */}
      <header className="hidden md:flex justify-between items-center px-8 h-16 border-b border-spotify-light-border">
        <Link to="/" className="text-xl font-bold text-gold flex gap-x-1 items-center">
          <DumbbellIcon className="text-spotify-green" />
          <span>Platinum Gym</span>
        </Link>
        <nav className="flex items-center space-x-8 h-full">
          {desktopNavLinks.map((link) => (
            <NavLink key={link.href} to={link.href} className={navLinkClasses}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/account" className="block">
            <ProfileAvatar />
          </NavLink>
        </nav>
      </header>

      {/* ======================= */}
      {/* == MOBILE BOTTOM BAR == */}
      {/* ======================= */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-spotify-light-border z-50">
        <nav className="flex justify-around items-center h-16">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={(props) =>
                clsx(
                  "flex flex-col items-center justify-center w-full h-full",
                  navLinkClasses(props)
                )
              }
            >
              {link.href === "/account" ? (
                // KONSISTENSI: Gunakan ProfileAvatar juga di mobile
                <ProfileAvatar size="w-6 h-6" />
              ) : (
                <link.icon size={24} />
              )}
              <span className="text-[10px] mt-1">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </footer>
      
      {/* ======================= */}
      {/* ==  KONTEN HALAMAN   == */}
      {/* ======================= */}
    <main className="sm:p-10 pb-24 md:pb-6">{children}</main>
    </div>
  );
};

export default Layout;