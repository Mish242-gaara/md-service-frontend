// =============================================
// MD SERVICE - Admin - Gestion des Voitures
// =============================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Eye, Car } from 'lucide-react';
import toast from 'react-hot-toast';
import { carsAPI, getImageUrl, formatPrice } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchCars = async () => {
    setLoading(true);
    try {
      // Utilisation de la pagination renvoyée par ton backend Sequelize
      const { data } = await carsAPI.getAll({ page, limit: 10 });
      setCars(data.cars);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Erreur lors du chargement des voitures');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [page]);

  const handleToggle = async (id, current) => {
    try {
      await carsAPI.toggleAvailability(id, !current);
      // Correction : Utilisation de c.id au lieu de c._id
      setCars(prev => prev.map(c => c.id === id ? { ...c, isAvailable: !current } : c));
      toast.success(`Marqué comme ${!current ? 'disponible' : 'loué'}`);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer définitivement "${title}" ?`)) return;
    setDeleting(id);
    try {
      await carsAPI.delete(id);
      // Correction : Utilisation de c.id au lieu de c._id
      setCars(prev => prev.filter(c => c.id !== id));
      toast.success('Voiture supprimée avec succès');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout title="Voitures">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">
          {pagination.total || 0} voiture(s) répertoriée(s)
        </p>
        <Link to="/admin/voitures/nouveau" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
          <Plus size={18} /> Ajouter une voiture
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-24 rounded-2xl w-full" />
          ))}
        </div>
      ) : cars.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
          <Car size={48} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">Aucune voiture trouvée</h3>
          <Link to="/admin/voitures/nouveau" className="text-primary-600 font-medium inline-flex items-center gap-2 mt-4 hover:underline">
            <Plus size={18} /> Ajouter votre premier véhicule
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {cars.map((car, i) => (
              <motion.div
                key={car.id} // CORRECTION : Utilisation de car.id (PostgreSQL) pour la clé unique
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Image principale */}
                <img
                  src={car.images?.[0] ? getImageUrl(car.images[0].url) : ''}
                  alt={car.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100 border border-gray-50"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=60'; }}
                />

                {/* Infos véhicule */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{car.title}</h4>
                  <p className="text-sm text-gray-500">{car.brand} {car.model} · {car.year}</p>
                  <p className="text-sm font-bold text-primary-600">
                    {/* Correction : On accède à pricing.perDay car c'est un objet JSON */}
                    {formatPrice(car.pricing?.perDay, car.currency)} / jour
                  </p>
                </div>

                {/* Status Badge */}
                <div className="hidden sm:block">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    car.isAvailable 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                  }`}>
                    {car.isAvailable ? 'Disponible' : 'Loué'}
                  </span>
                </div>

                {/* Vues */}
                <div className="hidden md:flex items-center gap-1 text-gray-400 text-sm w-16">
                  <Eye size={14} /> {car.views || 0}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleToggle(car.id, car.isAvailable)}
                    title={car.isAvailable ? "Marquer comme loué" : "Rendre disponible"}
                    className={`p-2 rounded-xl transition-all ${
                      car.isAvailable ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {car.isAvailable ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  </button>

                  <Link
                    to={`/admin/voitures/${car.id}/modifier`}
                    className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(car.id, car.title)}
                    disabled={deleting === car.id}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-all disabled:opacity-40"
                  >
                    {deleting === car.id
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
            <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-50 bg-gray-50/30">
              <button 
                onClick={() => setPage(p => p - 1)} 
                disabled={!pagination.hasPrev} 
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white disabled:opacity-40 hover:bg-gray-50 transition-all"
              >
                ← Précédent
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {pagination.page} sur {pagination.totalPages}
              </span>
              <button 
                onClick={() => setPage(p => p + 1)} 
                disabled={!pagination.hasNext} 
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white disabled:opacity-40 hover:bg-gray-50 transition-all"
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