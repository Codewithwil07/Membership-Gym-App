import { useParams } from "react-router-dom";
import MemberForm from "@/components/admin/MemberForm";

export default function MemberFormPage() {
  const { id } = useParams();

  const handleSubmit = (data: any) => {
    if (id) {
      console.log("Update member", id, data);
      // call API update
    } else {
      console.log("Create member", data);
      // call API create
    }
  };

  return (
    <MemberForm
      initialData={
        id
          ? {
              username: "dummy",
              email: "dummy@mail.com",
              no_hp: "000",
              status_akun: "Aktif",
            }
          : undefined
      }
      onSubmit={handleSubmit}
    />
  );
}
