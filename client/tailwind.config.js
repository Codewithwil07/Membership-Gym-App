/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Existing HSL variable colors (keep these!)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // --- NEW SPOTIFY COLORS ---
        "spotify-dark": "#121212", // Main background
        "spotify-light-border": "#282828", // Borders and subtle separators
        "spotify-green": "#1DB954", // Accent green
        "spotify-dimmed": "#B3B3B3", // Dimmed/inactive text/icons
        "spotify-light-text": "#E0E0E0", // Slightly lighter text
        "spotify-card-hover": "#282828", // Hover background for interactive elements
        "spotify-card-active": "#2A2A2A", // Background for active navigation items
        "gold ": "#FFD700",
        "gold-light": "#FFEB80", // Varian lebih terang jika diperlukan
        "gold-dark": "#B8860B", // Varian lebih gelap jika diperlukan
        "gold-translucent": "rgba(255, 215, 0, 0.2)", // Emas transparan untuk background
        "spotify-card-bg-darker": "#191414", // Background untuk kartu 'Most Popular' (lebih gelap)
        "spotify-text-black": "#000000", // Teks hitam untuk kontras di atas hijau
        "spotify-soft-grey": "#999999",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
