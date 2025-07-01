import  Layout  from "@/components/member/Layout";
import { Outlet } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

export default function MemberRoute() {
  // const { user } = useAuth();

  // if (!user || user.role !== "member") {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <Layout>
      <Outlet />;
    </Layout>
  );
}
