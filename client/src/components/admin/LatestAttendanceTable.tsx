// components/admin/LatestAttendanceTable.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const attendance = [
  { id: 1, user: "Rina", date: "2025-06-25", time: "08:00" },
  { id: 2, user: "Wawan", date: "2025-06-25", time: "08:15" },
];

export default function LatestAttendanceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">User</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.id} className="border-b hover:bg-muted/50">
                <td className="py-2">{a.user}</td>
                <td className="py-2">{a.date}</td>
                <td className="py-2">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
