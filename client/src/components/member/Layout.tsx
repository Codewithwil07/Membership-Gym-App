// src/components/Layout.tsx

import React, { ReactNode, useState } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // State untuk mengontrol lebar sidebar di desktop
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Lebar sidebar saat collapsed dan expanded
  const collapsedSidebarWidth = 'w-20'; // 80px
  const expandedSidebarWidth = 'w-64'; // 256px
  const topbarHeight = 'h-16'; // Height of your desktop top bar

  // Extract numeric values from width strings for dynamic margin-left
  const collapsedPx = parseInt(collapsedSidebarWidth.replace('w-', '')) * 4; // w-20 is 20 * 4 = 80px
  const expandedPx = parseInt(expandedSidebarWidth.replace('w-', '')) * 4;   // w-64 is 64 * 4 = 256px
  const topbarPx = parseInt(topbarHeight.replace('h-', '')) * 4; // h-16 is 16 * 4 = 64px

  return (
    <div className="min-h-screen bg-dark text-light font-sans flex">
      {/* Navbar (Sidebar for Desktop, Bottom Bar for Mobile) */}
      <Navbar
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        collapsedWidth={collapsedSidebarWidth}
        expandedWidth={expandedSidebarWidth}
      />

      {/* Konten Utama */}
      {/* Apply dynamic margin-left and padding-top for desktop */}
      <main
        className={`flex-grow pb-16 md:pb-0 min-h-screen relative overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          marginLeft: isSidebarExpanded ? `${expandedPx}px` : `${collapsedPx}px`,
          paddingTop: `${topbarPx}px`, // Add padding for the topbar
        }}
      >
        {/* Background Gradient */}
        <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-gradient-to-b from-gradient-start to-transparent opacity-30 pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-full h-[300px] md:h-[400px] bg-gradient-to-l from-gradient-end to-transparent opacity-20 pointer-events-none z-0"></div>

        <div className="relative z-10 p-6"> {/* Add padding to the content inside main */}
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;