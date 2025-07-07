// src/pages/PackagesPage.tsx

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/api/axios";

interface PackageData {
  id: number;
  nama_paket: string;
  deskripsi: string;
  durasi_hari: number;
  harga: string;
}

const PackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/admin/paket", {
          withCredentials: true,
        });
        setPackages(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat paket.");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-white mt-10">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">{error}</p>
    );
  }

  return (
    <div className="space-y-8 p-10 md:p-0 xl:p-0">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Pilih <span className="text-spotify-green">Membership</span>
        </h1>
        <p className="text-spotify-dimmed mt-2">
          Pilih paket yang paling sesuai dengan kebutuhan Anda.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => {
          const isPopular = index === 1; // contoh: tandai paket kedua sebagai populer
          return (
            <Card
              key={pkg.id}
              className={`flex flex-col ${isPopular ? "border-yellow-400" : ""} hover:scale-[1.01] hover:duration-300 hover:ease-in-out`}
            >
              <CardHeader className="relative">
                {isPopular && (
                  <Badge className="absolute bottom-[85px] left-40 w-fit">PALING POPULER</Badge>
                )}
                <CardTitle>{pkg.nama_paket}</CardTitle>
                <CardDescription>{pkg.deskripsi}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold text-white my-4">
                  Rp {parseInt(pkg.harga).toLocaleString("id-ID")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="text-spotify-green" size={20} />
                    <span className="text-spotify-dimmed text-sm">
                      Masa aktif {pkg.durasi_hari} hari
                    </span>
                  </li>
                  {/* Tambahkan fitur default */}
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="text-spotify-green" size={20} />
                    <span className="text-spotify-dimmed text-sm">
                      Akses semua alat
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-spotify-green text-black font-bold hover:bg-spotify-green/90"
                >
                  <Link to={`/packages/checkout/${pkg.id}`}>
                    Pilih Paket
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PackagesPage;
