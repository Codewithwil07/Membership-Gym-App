import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const packages = [
  { id: 1, name: "Gold Membership", price: "Rp 500.000", duration: "30 Hari" },
  { id: 2, name: "Silver Membership", price: "Rp 300.000", duration: "30 Hari" },
];

export default function PaketListPage() {
  return (
    <main className="p-4 space-y-4">
      {packages.map((p) => (
        <Card key={p.id}>
          <CardHeader><CardTitle>{p.name}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p>Harga: {p.price}</p>
            <p>Durasi: {p.duration}</p>
            <Button>Pilih Paket</Button>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}