import { useParams } from "react-router-dom";
import PackageForm from "@/components/admin/PackageForm";

export default function PaketFormPage() {
  const { id } = useParams();

  const handleSubmit = (data: any) => {
    if (id) {
      console.log("Update package", id, data);
      // call API update
    } else {
      console.log("Create package", data);
      // call API create
    }
  };

  return (
    <PackageForm
      initialData={
        id
          ? {
              nama_paket: "Gold",
              durasi_hari: 30,
              harga: 500000,
              deskripsi: "Premium package",
            }
          : undefined
      }
      onSubmit={handleSubmit}
    />
  );
}
