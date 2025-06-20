import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface AttendanceChartProps {
  mode: "hourly" | "daily";
  data: { label: string; count: number }[];
}

export default function AttendanceChart({ mode, data }: AttendanceChartProps) {
  return (
    <Card className="p-4">
      <h2 className="text-sm font-semibold mb-2">
        {mode === "hourly"
          ? "Today's Attendance by Hour"
          : "Attendance Last 7 Days"}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        {mode === "hourly" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
