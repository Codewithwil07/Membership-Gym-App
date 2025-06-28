import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Member {
  id: number;
  username: string;
  phone: string;
  email: string;
  accountStatus: "Active" | "Inactive";
  role: "admin" | "member";
  photo: string;
}

const allMembers: Member[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  phone: "088278782832",
  email: `user${i + 1}@example.com`,
  accountStatus: i % 2 === 0 ? "Active" : "Inactive",
  role: i % 2 === 0 ? "member" : "admin",
  photo: `https://source.unsplash.com/40x40/?person&sig=${i}`,
}));

const itemsPerPage = 5;

export default function MemberTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = allMembers.filter((member) =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>Member List</CardTitle>
          <Input
            placeholder="Search username..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-64"
          />
        </div>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Photo</th>
              <th className="py-2 text-left">Username</th>
              <th className="py-2 text-left">Phone</th>
              <th className="py-2 text-left">Email</th>
              <th className="py-2 text-left">Role</th>
              <th className="py-2 text-left">Account Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((member) => (
                <tr key={member.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">
                    <img
                      src={member.photo}
                      alt={member.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-2">{member.username}</td>
                  <td className="py-2">{member.phone}</td>
                  <td className="py-2">{member.email}</td>
                  <td className="py-2 capitalize">{member.role}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        member.accountStatus === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {member.accountStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 text-center text-muted-foreground"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
