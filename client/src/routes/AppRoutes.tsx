import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "@/routes/AdminRoute";
import DashboardPage from "@/pages/admin/DashboardPage";
import MemberPage from "@/pages/admin/MemberPage";
import PaketPage from "@/pages/admin/PaketPage";
import PaymentPage from "@/pages/admin/PaymentPage";
import AbsensiPage from "@/pages/admin/AbsensiPage";
import ReportPage from "@/pages/admin/ReportPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import PaketFormPage from "@/pages/admin/PackageFormPage";
import MemberFormPage from "@/pages/admin/MemberFormPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/members" element={<MemberPage />} />
          <Route path="/admin/members/edit/:id" element={<MemberFormPage />} />

          <Route path="/admin/packages" element={<PaketPage />} />
          <Route path="/admin/packages/add" element={<PaketFormPage />} />
          <Route path="/admin/packages/edit/:id" element={<PaketFormPage />} />

          <Route path="/admin/transactions" element={<PaymentPage />} />
          <Route path="/admin/attendance" element={<AbsensiPage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
