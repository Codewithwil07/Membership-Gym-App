import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const packages = [
  {
    id: 1,
    name: "Gold Package",
    duration: 30,
    price: 500_000,
    status: "Active",
  },
  {
    id: 2,
    name: "Silver Package",
    duration: 15,
    price: 300_000,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Platinum Package",
    duration: 60,
    price: 900_000,
    status: "Active",
  },
];

export default function PaketTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Package List</CardTitle>
          <NavLink to={'/admin/packages/add'}>
            <Button size="sm">Add Package</Button>
          </NavLink>
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Duration (days)</th>
              <th className="py-2 text-left">Price</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-b hover:bg-muted/50">
                <td className="py-2">{pkg.name}</td>
                <td className="py-2">{pkg.duration}</td>
                <td className="py-2">Rp {pkg.price.toLocaleString()}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      pkg.status === "Active"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {pkg.status}
                  </span>
                </td>
                <td className="py-2 space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
