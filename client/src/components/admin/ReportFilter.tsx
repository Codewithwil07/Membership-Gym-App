// src/components/admin/ReportFilter.tsx

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import { Button } from "@/components/ui/button"; // Import Button
import { Label } from "@/components/ui/label"; // Import Label
import { format } from "date-fns"; // Import format dari date-fns
import { id as idLocale } from "date-fns/locale"; // Import locale ID

interface ReportFilterProps {
  onFilterChange: (filters: { month: number; year: number }) => void; // Filter sekarang menerima bulan dan tahun
}

export default function ReportFilter({ onFilterChange }: ReportFilterProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Bulan 1-indexed (Jan = 1)

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Buat array bulan (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  // Buat array tahun (misal: 5 tahun ke belakang dan 2 tahun ke depan)
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i); // Contoh range tahun

  const handleApplyFilter = () => {
    onFilterChange({ month: selectedMonth, year: selectedYear });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-md bg-spotify-card-bg w-1/2"> 
      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="month-select" className="sr-only">Pilih Bulan</Label>
        <Select value={String(selectedMonth)} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
          <SelectTrigger id="month-select" className="w-full bg-spotify-light-card-bg border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green h-10 text-base">
            <SelectValue placeholder="Pilih Bulan" />
          </SelectTrigger>
          <SelectContent className="bg-spotify-card-bg border-spotify-border text-spotify-text-white"> 
            {months.map(m => (
              <SelectItem key={m} value={String(m)} className="hover:bg-spotify-light-card-bg focus:bg-spotify-light-card-bg"> {/* Styling hover/focus */}
                {format(new Date(currentYear, m - 1, 1), 'MMMM', { locale: idLocale })} 
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[100px]">
        <Label htmlFor="year-select" className="sr-only">Pilih Tahun</Label>
        <Select value={String(selectedYear)} onValueChange={(value) => setSelectedYear(parseInt(value))}>
          <SelectTrigger id="year-select" className="w-full bg-spotify-light-card-bg border-spotify-border text-spotify-text-white focus-visible:ring-spotify-green h-10 text-base">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent className="bg-spotify-card-bg border-spotify-border text-spotify-text-white">
            {years.map(y => (
              <SelectItem key={y} value={String(y)} className="hover:bg-spotify-light-card-bg focus:bg-spotify-light-card-bg">
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleApplyFilter} 
        className="bg-spotify-green text-spotify-black hover:bg-opacity-90 w-full md:w-auto font-bold py-2.5 rounded-full"
      >
        Terapkan Filter
      </Button>
    </div>
  );
}