import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

interface data {
  id: number;
  user: string;
  date: string;
  method: string;
  note: string;
}

const absensi: data[] = [
  {
    id: 1,
    user: "sudi",
    date: "2022-2-1",
    method: "scan qr",
    note: "-",
  },
];

type Button = {
  onClick: () => void;
};

export default function AbsensiTable({ onClick }: Button) {
  return (
    <Card>
      <CardHeader>
      <div className="flex justify-end">
        <Button className="" size="sm" onClick={onClick}>
          Manual Attendance
        </Button>
      </div>
        <CardTitle>Attendance Records</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">User</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Method</th>
              <th className="py-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {absensi.map((a) => (
              <tr key={a.id} className="border-b hover:bg-muted/50">
                <td className="py-2">{a.user}</td>
                <td className="py-2">{a.date}</td>
                <td className="py-2">{a.method}</td>
                <td className="py-2">{a.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
