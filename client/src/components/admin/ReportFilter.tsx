import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ReportFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: { mode: string; date: string }) => void;
}) {
  const [mode, setMode] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (newMode: string, newDate: string) => {
    setMode(newMode);
    setDate(newDate);
    onFilterChange({ mode: newMode, date: newDate });
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Select value={mode} onValueChange={(val) => handleChange(val, date)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select filter type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">One Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectContent>
      </Select>

      {mode && (
        <Input
          type={
            mode === "day"
              ? "date"
              : mode === "week"
              ? "week"
              : mode === "month"
              ? "month"
              : "number"
          }
          placeholder={mode === "year" ? "Enter year" : undefined}
          value={date}
          onChange={(e) => handleChange(mode, e.target.value)}
          className="w-40"
        />
      )}
    </div>
  );
}
