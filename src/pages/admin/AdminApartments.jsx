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
      // On s'assure de récupérer les appartements et la pagination
      setApartments(data.apartments || []);
      setPagination(data.pagination || {});
    } catch (err) {
      console.error("Erreur fetch:", err);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchApartments(); 
  }, [page]);

  const handleToggle = async (id, current) => {
    if (!id) return toast.error("ID manquant");
    try {
      await apartmentsAPI.toggleAvailability(id, !current);
      setApartments(prev =>
        prev.map(a => (a.id === id || a._id === id) ? { ...a, isAvailable: !current } : a)
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
      setApartments(prev => prev.filter(a => (a.id !== id && a._id !== id)));
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
        <Link to="/admin/appartements/nouveau" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
          <Plus size={18} /> Ajouter un appartement
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-24 rounded-2xl w-full" />
          ))}
        </div>
      ) : apartments.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
          <Building2 size={48} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Aucun appartement trouvé</h3>
          <Link to="/admin/appartements/nouveau" className="text-primary-600 font-medium inline-flex items-center gap-2 mt-4 hover:underline">
            <Plus size={18} /> Ajouter votre première annonce
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {apartments.map((apt, i) => {
              // SECURITÉ: Extraction de l'ID qu'il soit nommé id ou _id (PostgreSQL vs MongoDB)
              const currentId = apt.id || apt._id;

              return (
                <motion.div
                  key={currentId || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={apt.images?.[0] ? getImageUrl(apt.images[0].url) : ''}
                      alt={apt.title}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=60'; }}
                    />
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{apt.title}</h4>
                    <p className="text-sm text-gray-500 truncate">{apt.location}</p>
                    <p className="text-sm font-bold text-primary-600">
                      {formatPrice(apt.pricePerNight, apt.currency || 'XAF')}/nuit
                    </p>
                  </div>

                  {/* Statut (Desktop) */}
                  <div className="hidden sm:block">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.isAvailable ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {apt.isAvailable ? 'Disponible' : 'Loué'}
                    </span>
                  </div>

                  {/* Vues (Desktop) */}
                  <div className="hidden md:flex items-center gap-1 text-gray-400 text-sm w-16">
                    <Eye size={14} /> {apt.views || 0}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Toggle disponibilité */}
                    <button
                      onClick={() => handleToggle(currentId, apt.isAvailable)}
                      className={`p-2 rounded-lg transition-colors ${
                        apt.isAvailable ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={apt.isAvailable ? 'Marquer comme loué' : 'Marquer comme disponible'}
                    >
                      {apt.isAvailable ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    </button>

                    {/* Modifier - C'est ici que l'ID doit être correct */}
                    <Link
                      to={`/admin/appartements/${currentId}/modifier`}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Modifier l'annonce"
                    >
                      <Pencil size={18} />
                    </Link>

                    {/* Supprimer */}
                    <button
                      onClick={() => handleDelete(currentId, apt.title)}
                      disabled={deleting === currentId}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30"
                      title="Supprimer définitivement"
                    >
                      {deleting === currentId ? (
                        <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-50 bg-gray-50/50">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={!pagination.hasPrev}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white disabled:opacity-40 hover:bg-gray-50 transition-all"
              >
                Précédent
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {pagination.page} sur {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!pagination.hasNext}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white disabled:opacity-40 hover:bg-gray-50 transition-all"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}