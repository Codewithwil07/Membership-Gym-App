import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "@/routes/AdminRoute";
import MemberRoute from "@/routes/MemberRoute";

// Admin Pages
import DashboardPage from "@/pages/admin/DashboardPage";
import MemberPage from "@/pages/admin/MemberPage";
import PaketPage from "@/pages/admin/PaketPage";
import PaymentPage from "@/pages/admin/PaymentPage";
import AbsensiPage from "@/pages/admin/AbsensiPage";
import ReportPage from "@/pages/admin/ReportPage";
import PaketFormPage from "@/pages/admin/PackageFormPage";
import MemberFormPage from "@/pages/admin/MemberFormPage";

// Member Pages
import MemberDashboardPage from "@/pages/member/DashboardPage";
import EditProfilePage from "@/pages/member/EditProfilePage";
import PaketListPage from "@/pages/member/PaketListPage";
import RiwayatPembayaranPage from "@/pages/member/RiwayatPembayaranPage";
import RiwayatAbsensiPage from "@/pages/member/RiwayatAbsensiPage";

// Common Pages
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import LandingPage from "@/pages/LandingPage";
import GymLandingPage from "@/pages/LandingPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
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

        {/* Member */}
        <Route element={<MemberRoute />}>
          <Route index element={<GymLandingPage />} />
          <Route path="/dashboard" element={<MemberDashboardPage />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/paket-list" element={<PaketListPage />} />
          <Route path="/riwayat-pembayaran" element={<RiwayatPembayaranPage />} />
          <Route path="/riwayat-absensi" element={<RiwayatAbsensiPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
