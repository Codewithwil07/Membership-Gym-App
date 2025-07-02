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
import EditProfilePage from "@/components/member/EditProfilePage";
import RiwayatPembayaranPage from "@/components/member/RiwayatPembayaranPage";
import RiwayatAbsensiPage from "@/components/member/RiwayatAbsensiPage";
import CheckoutPage from "@/pages/member/CheckoutPage";
import PackagesPage from "@/pages/member/PackagesPage";
import AccountPage from "@/pages/member/AccountPage";

// Common Pages
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
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
        <Route index element={<GymLandingPage />} />
        <Route element={<MemberRoute />}>
          <Route path="/dashboard" element={<MemberDashboardPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/payment" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/profile" element={<EditProfilePage />} />
          <Route
            path="/riwayat-pembayaran"
            element={<RiwayatPembayaranPage />}
          />
          <Route path="/riwayat-absensi" element={<RiwayatAbsensiPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
