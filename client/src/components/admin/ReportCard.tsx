import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ReportCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

export default function ReportCard({ title, value, icon }: ReportCardProps) {
  return (
    <Card className="flex items-center justify-between p-4 shadow-sm hover:shadow-md transition">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
      <div className="text-primary">{icon}</div>
    </Card>
  );
}
