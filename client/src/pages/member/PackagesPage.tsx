// src/pages/PackagesPage.tsx

import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Import komponen dari shadcn/ui
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

const packages = [
  {
    name: "PackagesPage Basic",
    price: "150.000",
    duration: "Masa aktif 30 Hari",
    features: [
      "Akses semua alat",
      "1x Sesi dengan Personal Trainer",
      "Loker standar",
    ],
    isPopular: false,
  },
  {
    name: "PackagesPage GOLD",
    price: "400.000",
    duration: "Masa aktif 90 Hari",
    features: [
      "Akses semua alat",
      "5x Sesi dengan Personal Trainer",
      "Loker VIP",
      "Akses kelas gratis",
      "Minuman gratis",
    ],
    isPopular: true,
  },
  {
    name: "PackagesPage Silver",
    price: "250.000",
    duration: "Masa aktif 60 Hari",
    features: [
      "Akses semua alat",
      "2x Sesi dengan Personal Trainer",
      "Loker standar",
    ],
    isPopular: false,
  },
];

const PackagesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Pilih <span className="text-spotify-green">Membership</span>
        </h1>
        <p className="text-spotify-dimmed mt-2">
          Pilih paket yang paling sesuai dengan kebutuhan Anda.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card
            key={pkg.name}
            className={`flex flex-col ${pkg.isPopular ? "border-gold-light" : ""} hover:scale-[1.01] hover:duration-300 hover:ease-in-out`}
          >
            <CardHeader className="relative" >
              {pkg.isPopular && <Badge className="absolute bottom-[85px] left-40 w-fit">PALING POPULER</Badge>}
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.duration}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold text-white my-4">
                Rp {pkg.price}
              </p>
              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <CheckCircle className="text-spotify-green" size={20} />
                    <span className="text-spotify-dimmed text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-spotify-green text-black font-bold hover:bg-spotify-green/90"
              >
                <Link to="/packages/checkout">Pilih PackagesPage</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackagesPage;
