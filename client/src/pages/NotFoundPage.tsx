import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Ghost size={80} className="text-spotify-green mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold mb-2 text-center">404 - Page Not Found</h1>
        <p className="text-spotify-text-light-grey text-center mb-6 max-w-md">
          Oops! Halaman yang kamu cari tidak ditemukan atau mungkin telah dipindahkan.
        </p>
        <Button asChild className="bg-spotify-green text-black font-semibold px-6 py-3 rounded-full hover:bg-green-400 transition">
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </motion.div>
    </div>
  );
}