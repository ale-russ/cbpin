import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from '../../features/auth/auth.guard';
import AppLayout from '../layouts/AppLayout';

// Public Auth Page components
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';
import ForgotPasswordPage from '../../pages/auth/ForgotPasswordPage';

// Protected Page components
import DashboardPage from '../../pages/dashboard/DashboardPage';
import OpportunitiesPage from '../../pages/opportunities/OpportunitiesPage';
import OpportunityDetailsPage from '../../pages/opportunities/OpportunityDetailsPage';
import OrganizationsPage from '../../pages/organizations/OrganizationsPage';
import OrganizationDetailsPage from '../../pages/organizations/OrganizationDetailsPage';
import SuppliersPage from '../../pages/suppliers/SuppliersPage';
import SupplierDetailsPage from '../../pages/suppliers/SupplierDetailsPage';
import IntelligencePage from '../../pages/intelligence/IntelligencePage';
import PartnershipsPage from '../../pages/partnerships/PartnershipsPage';
import ReportsPage from '../../pages/reports/ReportsPage';
import SettingsPage from '../../pages/settings/SettingsPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected App Routes */}
        <Route path="/" element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="organizations/:id" element={<OrganizationDetailsPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="suppliers/:id" element={<SupplierDetailsPage />} />
          <Route path="intelligence" element={<IntelligencePage />} />
          <Route path="partnerships" element={<PartnershipsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback Routing */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
