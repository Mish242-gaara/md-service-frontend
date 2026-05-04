// =============================================
// MD SERVICE - Layout Admin avec Sidebar
// =============================================
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Building2, Car, CalendarCheck,
  LogOut, Menu, X, Shield, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const NAV = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/admin/appartements', label: 'Appartements', icon: Building2 },
  { to: '/admin/voitures', label: 'Voitures', icon: Car },
  { to: '/admin/reservations', label: 'Réservations', icon: CalendarCheck },
];

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Déconnecté');
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logo-md-service.jpg" alt="MD Service" className="w-10 h-10 object-contain rounded-xl bg-white/10 p-0.5" />
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: 'Syne' }}>MD Service</p>
            <p className="text-white/40 text-xs">{admin?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? 'bg-white text-primary-700 shadow-md'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70
                     hover:bg-red-500/20 hover:text-red-300 transition-all w-full text-sm font-medium"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-primary-900 to-primary-800 shrink-0">
        <SidebarContent />
      </aside>

      {/* Sidebar mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-gradient-to-b
                         from-primary-900 to-primary-800 lg:hidden"
            >
              <div className="absolute top-4 right-4">
                <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-bold text-dark text-lg" style={{ fontFamily: 'Syne' }}>{title}</h1>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>Admin</span>
                <ChevronRight size={12} />
                <span>{title}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              Voir le site →
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
