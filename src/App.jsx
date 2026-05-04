// =============================================
// LOKEA - Application Principale & Routing
// =============================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages publiques
import HomePage from './pages/HomePage';
import ApartmentsPage from './pages/ApartmentsPage';
import CarsPage from './pages/CarsPage';
import ApartmentDetailPage from './pages/ApartmentDetailPage';
import CarDetailPage from './pages/CarDetailPage';
import ContactPage from './pages/ContactPage';

// Pages admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApartments from './pages/admin/AdminApartments';
import AdminCars from './pages/admin/AdminCars';
import AdminReservations from './pages/admin/AdminReservations';
import AdminListingForm from './pages/admin/AdminListingForm';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFAB from './components/common/WhatsAppFAB';
import ScrollToTop from './components/common/ScrollToTop';

// Route protégée admin
const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
  </div>;
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

// Layout public (avec navbar et footer)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
    <WhatsAppFAB />
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* ── Routes Publiques ── */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/appartements" element={<PublicLayout><ApartmentsPage /></PublicLayout>} />
      <Route path="/appartements/:id" element={<PublicLayout><ApartmentDetailPage /></PublicLayout>} />
      <Route path="/voitures" element={<PublicLayout><CarsPage /></PublicLayout>} />
      <Route path="/voitures/:id" element={<PublicLayout><CarDetailPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

      {/* ── Routes Admin ── */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/appartements" element={<ProtectedRoute><AdminApartments /></ProtectedRoute>} />
      <Route path="/admin/appartements/nouveau" element={<ProtectedRoute><AdminListingForm type="apartment" /></ProtectedRoute>} />
      <Route path="/admin/appartements/:id/modifier" element={<ProtectedRoute><AdminListingForm type="apartment" /></ProtectedRoute>} />
      <Route path="/admin/voitures" element={<ProtectedRoute><AdminCars /></ProtectedRoute>} />
      <Route path="/admin/voitures/nouveau" element={<ProtectedRoute><AdminListingForm type="car" /></ProtectedRoute>} />
      <Route path="/admin/voitures/:id/modifier" element={<ProtectedRoute><AdminListingForm type="car" /></ProtectedRoute>} />
      <Route path="/admin/reservations" element={<ProtectedRoute><AdminReservations /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              borderRadius: '12px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
      </Router>
    </AuthProvider>
  );
}
