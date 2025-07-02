import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Package, History, User, DumbbellIcon } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
};

// Data untuk link navigasi mobile
const mobileNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/packages', label: 'Paket', icon: Package },
  { href: '/riwayat', label: 'Riwayat', icon: History },
  { href: '/profile', label: 'Profil', icon: User },
];

// Data untuk link navigasi desktop (tanpa profil)
const desktopNavLinks = [
  { href: '/dashboard', label: 'Home' },
  { href: '/packages', label: 'Paket' },
  { href: '/riwayat', label: 'Riwayat' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-spotify-dark min-h-screen text-white">
      
      {/* ======================= */}
      {/* == DESKTOP TOP BAR == */}
      {/* ======================= */}
      <header className="hidden md:flex justify-between items-center px-8 h-16 border-b border-spotify-light-border">
        <Link to="/" className="text-xl font-bold text-gold flex gap-x-1">
          <DumbbellIcon className='text-spotify-green'/> <span>Platinum Gym</span>
        </Link>
        <nav className="flex items-center space-x-8 h-full">
          {desktopNavLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-white' : 'text-spotify-dimmed hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {/* Link Profil tetap terpisah karena stylenya berbeda */}
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              `p-2 rounded-full transition-colors ${
                isActive ? 'bg-spotify-light-border text-white' : 'text-spotify-dimmed hover:text-white'
              }`
            }
          >
            <User size={20} />
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
              end={link.href === '/'} // Prop 'end' hanya untuk link root
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? 'text-white' : 'text-spotify-dimmed hover:text-white'
                }`
              }
            >
              <link.icon size={24} />
              <span className="text-[10px] mt-1">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </footer>

      {/* ======================= */}
      {/* ==   KONTEN HALAMAN  == */}
      {/* ======================= */}
      <main className="p-4 sm:p-6 pb-24 md:pb-6 md:pt-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;