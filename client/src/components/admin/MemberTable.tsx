// src/pages/admin/MemberTable.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Member {
  id: number;
  username: string;
  no_hp: string;
  email: string;
  status_akun: "Active" | "Inactive";
  role: "admin" | "member";
  foto: string;
}

const itemsPerPage = 5;

// Utility to generate initials
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function MemberTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState<Member[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin/user-data", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
        },
        withCredentials: true,
      });
      setMembers(res.data.data.data);
      setTotal(res.data.data.pagination.total);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

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
        {loading ? (
          <div className="text-center text-muted-foreground py-4">
            Loading members...
          </div>
        ) : (
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
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-muted/50">
                    <td className="py-2">
                      {member.foto ? (
                        <img
                          src={member.foto}
                          alt={member.username}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-spotify-green text-black flex items-center justify-center text-xs font-bold uppercase">
                          {getInitials(member.username)}
                        </div>
                      )}
                    </td>
                    <td className="py-2">{member.username}</td>
                    <td className="py-2">{member.no_hp}</td>
                    <td className="py-2">{member.email}</td>
                    <td className="py-2 capitalize">{member.role}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          member.status_akun === "Active"
                            ? "bg-spotify-green text-black"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {member.status_akun}
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
        )}

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
