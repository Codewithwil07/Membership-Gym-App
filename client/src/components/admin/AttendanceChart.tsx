// components/admin/AttendanceChart.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Sen", attendance: 20 },
  { date: "Sel", attendance: 25 },
  { date: "Rab", attendance: 18 },
  { date: "Kam", attendance: 22 },
  { date: "Jum", attendance: 28 },
  { date: "Sab", attendance: 35 },
  { date: "Min", attendance: 30 },
];

export default function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attendance" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
