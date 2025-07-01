// src/components/Navbar.tsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Dumbbell, User, LogOut, Bell } from "lucide-react"; // Added Bell icon

// Props for Navbar
interface NavbarProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (expanded: boolean) => void;
  collapsedWidth: string; // E.g., 'w-20'
  expandedWidth: string; // E.g., 'w-64'
}

const navLinks = [
  { path: "/", name: "Home", icon: Home },
  { path: "/membership", name: "Membership", icon: Dumbbell },
  { path: "/account", name: "Akun", icon: User },
];

const Navbar: React.FC<NavbarProps> = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
  collapsedWidth,
  expandedWidth,
}) => {
  const location = useLocation();

  const currentUser = {
    name: "Budi Santoso",
    avatarInitials: "BS",
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleLogout = () => {
    console.log("Melakukan proses logout...");
    alert("Anda telah logout.");
    // Actual logout implementation: clear token, redirect to login, etc.
  };

  const handleNotificationClick = () => {
    console.log("Tombol Notifikasi diklik!");
    alert("Anda memiliki notifikasi baru!");
    // Implement notification handling logic
  };

  return (
    <>
      {/* Desktop Top Bar */}
      <header
        className={`fixed top-0 right-0 h-16 bg-dark border-b border-border-color z-40 hidden md:flex items-center justify-end px-6 transition-all duration-300 ease-in-out
                ${
                  isSidebarExpanded
                    ? `left-[${expandedWidth}]`
                    : `left-[${collapsedWidth}]`
                }
            `}
      >
        {/* Hanya Notifikasi Button untuk Desktop */}
        <div className="flex items-center">
          <button
            onClick={handleNotificationClick}
            className="relative p-2 rounded-full text-dimmed hover:text-light hover:bg-card transition-colors duration-200"
            title="Notifikasi"
          >
            <Bell className="h-6 w-6" />
            {/* Optional: Notification badge */}
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Bar (Tidak ada perubahan di sini) */}
      <nav className="fixed bottom-0 left-0 w-full bg-dark border-t border-border-color z-50 md:hidden">
        <ul className="flex justify-around items-center h-16">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`flex flex-col items-center justify-center text-xs font-semibold px-4 py-2 relative overflow-hidden transition-colors duration-200
                                ${
                                  isActive
                                    ? "text-accent-green"
                                    : "text-dimmed hover:text-light"
                                }`}
                >
                  {isActive && (
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent-green rounded-full opacity-0 animate-fade-in-up"></div>
                  )}
                  <link.icon
                    className={`h-6 w-6 mb-1 ${
                      isActive ? "fill-accent-green" : "fill-none"
                    }`}
                  />
                  <span className="mt-1">{link.name}</span>
                </Link>
              </li>
            );
          })}
          {/* Notification Button for Mobile */}
          <li>
            <button
              onClick={handleNotificationClick}
              className="flex flex-col items-center justify-center text-xs font-semibold px-4 py-2 relative overflow-hidden transition-colors duration-200
                                text-dimmed hover:text-light"
              title="Notifikasi"
            >
              <Bell className="h-6 w-6 mb-1 fill-none" />
              <span className="mt-1">Notifikasi</span>
              {/* Optional: Notification badge */}
              <span className="absolute top-3 right-5 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Desktop Sidebar (Fixed, Expand/Collapse - Border Kanan Sudah Ada) */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-dark border-r border-border-color p-4 hidden md:flex flex-col z-50
                            ${
                              isSidebarExpanded ? expandedWidth : collapsedWidth
                            } transition-all duration-300 ease-in-out`}
      >
        {/* Top Section: Profile Button (Logo replacement) */}
        <div
          className={`flex items-center ${
            isSidebarExpanded ? "justify-start" : "justify-center"
          } mb-8 mt-4`}
        >
          <button
            onClick={toggleSidebar}
            className={`relative group flex items-center p-2 rounded-full hover:bg-card transition-colors duration-200
                                ${
                                  isSidebarExpanded ? "w-full" : "w-12 h-12"
                                }`} /* Profile button fills sidebar width when expanded */
          >
            <div className="w-10 h-10 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center text-base font-semibold border-2 border-accent-green flex-shrink-0">
              {currentUser.avatarInitials}
            </div>
            {isSidebarExpanded && (
              <span className="ml-3 text-light font-semibold text-sm truncate flex-grow text-left">
                {currentUser.name}
              </span>
            )}
          </button>
        </div>

        {/* Main Menu Links & Logout (Conditionally rendered based on sidebar state) */}
        {isSidebarExpanded ? ( // Expanded state: show icons + text
          <ul className="space-y-2 flex-grow">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-4 p-3 rounded-md transition-all duration-200 group relative overflow-hidden
                                        ${
                                          isActive
                                            ? "bg-card text-accent-green shadow-inner-lg"
                                            : "text-dimmed hover:bg-card/50 hover:text-light"
                                        }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4/5 w-1 bg-accent-green rounded-r-md"></div>
                    )}
                    <link.icon
                      className={`h-6 w-6 z-10 ${
                        isActive ? "fill-accent-green" : "fill-none"
                      }`}
                    />
                    <span className="text-base font-semibold z-10">
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
            {/* Logout Button in expanded state */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-4 p-3 rounded-md text-red-400 hover:bg-dark transition-colors duration-150 w-full text-left"
              >
                <LogOut className="h-6 w-6" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        ) : (
          // Collapsed state: show only icons for main menus and logout
          <ul className="space-y-4 flex-grow flex flex-col items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center justify-center w-12 h-12 rounded-md ${
                      isActive
                        ? "bg-card text-accent-green"
                        : "text-dimmed hover:bg-card hover:text-light"
                    }`}
                    title={link.name} // Tooltip for collapsed icons
                  >
                    <link.icon className="h-6 w-6" />
                  </Link>
                </li>
              );
            })}
            {/* Logout icon only in collapsed state */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-12 h-12 rounded-md text-red-400 hover:bg-card transition-colors duration-150"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
