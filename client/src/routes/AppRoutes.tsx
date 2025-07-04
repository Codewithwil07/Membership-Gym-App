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
import PackagesPage from "@/pages/member/PackagesPage";
import AccountPage from "@/pages/member/AccountPage";
import PromoDetailPage from "@/components/member/DetailPromo";
import PromoPage from "@/pages/member/PromosPage";
import EditProfile from "@/components/member/EditProfile";

// Common Pages
import NotFoundPage from "@/pages/NotFoundPage";
import GymLandingPage from "@/pages/LandingPage";
import CheckoutPage from "@/components/member/CheckoutPage";
import AuthPage from "@/pages/auth/AuthPage";
import BebanOperasional from "@/pages/admin/BebanOperasional";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/members" element={<MemberPage />} />
          <Route path="/admin/members/edit/:id" element={<MemberFormPage />} />

          <Route path="/admin/packages" element={<PaketPage />} />
          <Route path="/admin/packages/add" element={<PaketFormPage />} />
          <Route path="/admin/packages/edit/:id" element={<PaketFormPage />} />
    
          <Route path="/admin/expenses" element={<BebanOperasional />} />

          <Route path="/admin/transactions" element={<PaymentPage />} />
          <Route path="/admin/attendance" element={<AbsensiPage />} />
          <Route path="/admin/reports" element={<ReportPage />} />
        </Route>

        {/* Member */}
        <Route index element={<GymLandingPage />} />
        <Route element={<MemberRoute />}>
          <Route path="/dashboard" element={<MemberDashboardPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/checkout" element={<CheckoutPage />} />
          <Route path="/promo" element={<PromoPage />} />
          <Route path="/promo/detail" element={<PromoDetailPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/edit-profile" element={<EditProfile />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
