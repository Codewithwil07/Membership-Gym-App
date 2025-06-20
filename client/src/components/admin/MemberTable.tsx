import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, NavLink } from "react-router-dom";

interface Member {
  id: number;
  username: string;
  phone: string;
  email: string;
  accountStatus: string;
  role: string;
  photo: string;
}

const allMembers: Member[] = [
  {
    id: 1,
    username: "johndoe",
    phone: "088278782832",
    email: "john@example.com",
    accountStatus: "Active",
    role: "member",
    photo: "https://source.unsplash.com/40x40/?person",
  },
  {
    id: 2,
    username: "janesmith",
    phone: "088278782832",
    email: "jane@example.com",
    accountStatus: "Inactive",
    role: "admin",
    photo: "https://source.unsplash.com/40x40/?woman",
  },
];

export default function MemberTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = allMembers.filter((member) =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle>Member List</CardTitle>
          <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
            <Input
              placeholder="Search username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />
            {/* <NavLink to={"/admin/members/add"}>
              <Button size="sm">Add Member</Button>
            </NavLink> */}
          </div>
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
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
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
                <td>{member.role}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      member.accountStatus === "Active"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {member.accountStatus}
                  </span>
                </td>
                <td className="py-2 space-x-2">
                  <NavLink to={'/admin/members/'}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </NavLink>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-2 text-center text-muted-foreground"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
