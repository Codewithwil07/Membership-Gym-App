import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Package, Percent, User, DumbbellIcon } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// Avatar fallback component
const AvatarFallback = () => (
  <div className="w-8 h-8 rounded-full bg-spotify-light-border flex items-center justify-center">
    <User size={18} />
  </div>
);

type LayoutProps = {
  children: React.ReactNode;
};

const mobileNavLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/packages", label: "Paket", icon: Package },
  { href: "/payment/history", label: "Payments", icon: Percent },
  { href: "/account", label: "Akun", icon: User },
];

const desktopNavLinks = [
  { href: "/dashboard", label: "Home" },
  { href: "/packages", label: "Paket" },
  { href: "/payment/history", label: "Payments" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const { user } = useAuth(); // pastikan AuthContext memiliki user dengan id
  const userId = user?.id || null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
          withCredentials: true,
        });
        setProfilePhoto(res.data.data.foto || null);
        console.log(res.data.data.foto);
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
        setProfilePhoto(null);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="bg-spotify-dark min-h-screen text-white">
      {/* ======================= */}
      {/* == DESKTOP TOP BAR == */}
      {/* ======================= */}
      <header className="hidden md:flex justify-between items-center px-8 h-16 border-b border-spotify-light-border">
        <Link to="/" className="text-xl font-bold text-gold flex gap-x-1">
          <DumbbellIcon className="text-spotify-green" />
          <span>Platinum Gym</span>
        </Link>
        <nav className="flex items-center space-x-8 h-full">
          {desktopNavLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-spotify-dimmed hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Foto Profil */}
          <NavLink
            to="/account"
            className="rounded-full transition-colors p-0 border border-spotify-light-border overflow-hidden w-8 h-8 flex items-center justify-center"
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <AvatarFallback />
            )}
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
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-spotify-dimmed hover:text-white"
                }`
              }
            >
              {link.href === "/account" && profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-full w-6 h-6 object-cover"
                />
              ) : (
                <link.icon size={24} />
              )}
              <span className="text-[10px] mt-1">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </footer>

      {/* ======================= */}
      {/* ==   KONTEN HALAMAN  == */}
      {/* ======================= */}
      <main className="p-4 sm:p-6 pb-24 md:pb-6 md:pt-6">{children}</main>
    </div>
  );
};

export default Layout;
