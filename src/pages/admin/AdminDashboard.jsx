// =============================================
// MD SERVICE - Tableau de Bord Admin
// =============================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Car, CalendarCheck, TrendingUp,
  Clock, CheckCircle, XCircle, Plus, ArrowRight
} from 'lucide-react';
import { statsAPI, formatPrice } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

function StatCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-dark mb-1">{value}</p>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </motion.div>
  );
}

const STATUS_BADGE = {
  en_attente: 'badge-pending',
  confirmée: 'badge-available',
  annulée: 'bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full',
  terminée: 'bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full',
};
const STATUS_LABEL = {
  en_attente: '⏳ En attente',
  confirmée: '✓ Confirmée',
  annulée: '✗ Annulée',
  terminée: '✔ Terminée',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    statsAPI.get()
      .then(r => setStats(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <AdminLayout title="Tableau de bord">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-36 rounded-2xl" />
        ))}
      </div>
      <div className="skeleton h-64 rounded-2xl" />
    </AdminLayout>
  );

  const cards = [
    { icon: Building2, label: 'Appartements', value: stats?.apartments?.total || 0, sub: `${stats?.apartments?.available || 0} disponibles`, color: 'bg-primary-500' },
    { icon: Car, label: 'Voitures', value: stats?.cars?.total || 0, sub: `${stats?.cars?.available || 0} disponibles`, color: 'bg-indigo-500' },
    { icon: CalendarCheck, label: 'Réservations', value: stats?.reservations?.total || 0, sub: `${stats?.reservations?.pending || 0} en attente`, color: 'bg-amber-500' },
    { icon: TrendingUp, label: 'Revenus estimés', value: formatPrice(stats?.revenue?.total, 'XAF'), sub: 'Réservations confirmées', color: 'bg-green-500' },
  ];

  return (
    <AdminLayout title="Tableau de bord">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((c, i) => <StatCard key={c.label} {...c} delay={i * 0.1} />)}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
            <Building2 size={18} className="text-primary-600" />
            Actions rapides – Appartements
          </h3>
          <div className="space-y-3">
            <Link
              to="/admin/appartements/nouveau"
              className="btn-primary flex items-center gap-2 w-full justify-center"
            >
              <Plus size={18} /> Nouvel appartement
            </Link>
            <Link
              to="/admin/appartements"
              className="btn-outline flex items-center gap-2 w-full justify-center"
            >
              Gérer les appartements <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
            <Car size={18} className="text-primary-600" />
            Actions rapides – Voitures
          </h3>
          <div className="space-y-3">
            <Link
              to="/admin/voitures/nouveau"
              className="btn-primary flex items-center gap-2 w-full justify-center"
            >
              <Plus size={18} /> Nouvelle voiture
            </Link>
            <Link
              to="/admin/voitures"
              className="btn-outline flex items-center gap-2 w-full justify-center"
            >
              Gérer les voitures <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Dernières réservations */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-dark">Dernières réservations</h3>
          <Link to="/admin/reservations" className="text-primary-600 text-sm font-medium hover:underline">
            Voir tout →
          </Link>
        </div>
        {!stats?.recentReservations?.length ? (
          <div className="p-12 text-center text-gray-400">
            <CalendarCheck size={40} className="mx-auto mb-3 opacity-30" />
            <p>Aucune réservation pour l'instant</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stats.recentReservations.map((r) => (
              <div key={r._id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                    {r.type === 'apartment' ? <Building2 size={16} className="text-primary-600" /> : <Car size={16} className="text-primary-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-dark text-sm">{r.client?.name || '—'}</p>
                    <p className="text-xs text-gray-400">{r.listingTitle || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {r.totalPrice && (
                    <span className="text-sm font-semibold text-primary-700 hidden sm:block">
                      {formatPrice(r.totalPrice, 'XAF')}
                    </span>
                  )}
                  <span className={STATUS_BADGE[r.status] || 'badge-pending'}>
                    {STATUS_LABEL[r.status] || r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
