import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "@/routes/AdminRoute";
import MemberLayout from "@/routes/MemberRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Pages
import GymLandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/auth/AuthPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Admin Pages
import DashboardPage from "@/pages/admin/DashboardPage";
import MemberPage from "@/pages/admin/MemberPage";
import PaketPage from "@/pages/admin/PaketPage";
import PaymentPage from "@/pages/admin/PaymentPage";
import AbsensiPage from "@/pages/admin/AbsensiPage";
import ReportPage from "@/pages/admin/ReportPage";
import PaketFormPage from "@/pages/admin/PackageFormPage";
import MemberFormPage from "@/pages/admin/MemberFormPage";
import BebanOperasional from "@/pages/admin/BebanOperasional";

// Member Pages
import MemberDashboardPage from "@/pages/member/DashboardPage";
import PackagesPage from "@/pages/member/PackagesPage";
import AccountPage from "@/pages/member/AccountPage";
import EditProfile from "@/components/member/EditProfile";
import PaymentHistoryPage from "@/pages/member/PaymentHistoryPage";
import { Toaster } from "@/components/ui/toaster";
import CheckoutPage from "@/pages/member/CheckoutPage";
import PaymentResultPage from "@/pages/member/PaymentResultPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route index element={<GymLandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Admin */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/members" element={<MemberPage />} />
            <Route
              path="/admin/members/edit/:id"
              element={<MemberFormPage />}
            />
            <Route path="/admin/packages" element={<PaketPage />} />
            <Route path="/admin/packages/add" element={<PaketFormPage />} />
            <Route
              path="/admin/packages/edit/:id"
              element={<PaketFormPage />}
            />
            <Route path="/admin/expenses" element={<BebanOperasional />} />
            <Route path="/admin/transactions" element={<PaymentPage />} />
            <Route path="/admin/attendance" element={<AbsensiPage />} />
            <Route path="/admin/reports" element={<ReportPage />} />
          </Route>

          {/* Member */}
          <Route element={<MemberLayout />}>
            <Route path="/dashboard" element={<MemberDashboardPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/checkout/:id" element={<CheckoutPage />} />
            <Route path="/payment/history" element={<PaymentHistoryPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/edit-profile/:id" element={<EditProfile />} />
            <Route path="/payment-result" element={<PaymentResultPage />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
