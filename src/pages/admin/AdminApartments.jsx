// =============================================
// MD SERVICE - Admin - Gestion des Appartements
// =============================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Eye, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { apartmentsAPI, getImageUrl, formatPrice } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminApartments() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const { data } = await apartmentsAPI.getAll({ page, limit: 10 });
      setApartments(data.apartments);
      setPagination(data.pagination);
    } catch {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApartments(); }, [page]);

  const handleToggle = async (id, current) => {
    try {
      await apartmentsAPI.toggleAvailability(id, !current);
      setApartments(prev =>
        prev.map(a => a.id === id ? { ...a, isAvailable: !current } : a)
      );
      toast.success(`Marqué comme ${!current ? 'disponible' : 'loué'}`);
    } catch {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id, title) => {
    if (!id) {
      toast.error("Identifiant manquant");
      return;
    }
    if (!window.confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return;
    
    setDeleting(id);
    try {
      await apartmentsAPI.delete(id);
      setApartments(prev => prev.filter(a => a.id !== id));
      toast.success('Appartement supprimé');
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout title="Appartements">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">{pagination.total || 0} appartement(s)</p>
        <Link to="/admin/appartements/nouveau" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Ajouter un appartement
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
      ) : apartments.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-card">
          <Building2 size={48} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">Aucun appartement</h3>
          <Link to="/admin/appartements/nouveau" className="btn-primary inline-flex items-center gap-2 mt-4">
            <Plus size={18} /> Ajouter le premier
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="divide-y divide-gray-50">
            {apartments.map((apt, i) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Image */}
                <img
                  src={apt.images?.[0] ? getImageUrl(apt.images[0].url) : ''}
                  alt={apt.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=60'; }}
                />

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-dark truncate">{apt.title}</h4>
                  <p className="text-sm text-gray-400 truncate">{apt.location}</p>
                  <p className="text-sm font-medium text-primary-600">
                    {formatPrice(apt.pricePerNight, apt.currency)}/nuit
                  </p>
                </div>

                {/* Statut */}
                <div className="hidden sm:block">
                  <span className={apt.isAvailable ? 'badge-available' : 'badge-occupied'}>
                    {apt.isAvailable ? 'Disponible' : 'Loué'}
                  </span>
                </div>

                {/* Vues */}
                <div className="hidden md:flex items-center gap-1 text-gray-400 text-sm">
                  <Eye size={14} /> {apt.views || 0}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle disponibilité */}
                  <button
                    onClick={() => handleToggle(apt.id, apt.isAvailable)}
                    className={`p-2 rounded-xl transition-all ${
                      apt.isAvailable
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={apt.isAvailable ? 'Marquer loué' : 'Marquer disponible'}
                  >
                    {apt.isAvailable ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                  </button>

                  {/* Modifier */}
                  <Link
                    to={`/admin/appartements/${apt.id}/modifier`}
                    className="p-2 rounded-xl text-primary-600 hover:bg-primary-50 transition-all"
                    title="Modifier"
                  >
                    <Pencil size={18} />
                  </Link>

                  {/* Supprimer */}
                  <button
                    onClick={() => handleDelete(apt.id, apt.title)}
                    disabled={deleting === apt.id}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-all disabled:opacity-40"
                    title="Supprimer"
                  >
                    {deleting === apt.id
                      ? <span className="animate-spin block w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full" />
                      : <Trash2 size={18} />
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 p-4 border-t border-gray-100">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={!pagination.hasPrev}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                ← Précédent
              </button>
              <span className="text-sm text-gray-500">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!pagination.hasNext}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                Suivant →
              </button>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}