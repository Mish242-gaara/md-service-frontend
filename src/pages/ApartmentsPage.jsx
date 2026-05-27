// =============================================
// MD SERVICE - Page Liste des Appartements (Dark Mode)
// =============================================
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Building2, ChevronLeft, ChevronRight, FilterX } from 'lucide-react';
import { apartmentsAPI } from '../utils/api';
import { ApartmentCard } from '../components/listings/ListingCard';

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({
    available: '', minPrice: '', maxPrice: '', location: '',
  });
  const [page, setPage] = useState(1);

  useEffect(() => { document.title = 'Appartements - MD Service'; }, []);

  const fetchApartments = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9, ...filters };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const { data } = await apartmentsAPI.getAll(params);
      setApartments(data.apartments);
      setPagination(data.pagination);
    } catch {
      setApartments([]);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { fetchApartments(); }, [fetchApartments]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Building2 size={40} className="text-white/60 mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Nos Appartements
            </h1>
            <p className="text-white/70 text-lg">
              {pagination.total} logement{pagination.total > 1 ? 's' : ''} disponible{pagination.total > 1 ? 's' : ''}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filtres */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card
                        border border-transparent dark:border-gray-700 p-5 mb-8">
          <div className="flex flex-wrap gap-4 items-center">

            {/* Recherche localisation */}
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2
                                           text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher par quartier..."
                value={filters.location}
                onChange={e => handleFilterChange('location', e.target.value)}
                className="input-field pl-9"
              />
            </div>

            {/* Disponibilité */}
            <select
              value={filters.available}
              onChange={e => handleFilterChange('available', e.target.value)}
              className="input-field w-auto"
            >
              <option value="">Tous les statuts</option>
              <option value="true">Disponibles uniquement</option>
            </select>

            {/* Prix min */}
            <input
              type="number"
              placeholder="Prix min (XAF)"
              value={filters.minPrice}
              onChange={e => handleFilterChange('minPrice', e.target.value)}
              className="input-field w-40"
            />

            {/* Prix max */}
            <input
              type="number"
              placeholder="Prix max (XAF)"
              value={filters.maxPrice}
              onChange={e => handleFilterChange('maxPrice', e.target.value)}
              className="input-field w-40"
            />

            {/* Reset corrigé (utilisation d'une icône au lieu du texte seul si souhaité) */}
            {Object.values(filters).some(Boolean) && (
              <button
                onClick={() => {
                  setFilters({ available: '', minPrice: '', maxPrice: '', location: '' });
                  setPage(1);
                }}
                className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm font-semibold
                           hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all"
              >
                <FilterX size={16} />
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Grille */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton h-52" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-20" />
                </div>
              </div>
            ))}
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-24">
            <Building2 size={64} className="mx-auto mb-4 text-gray-200 dark:text-gray-700" />
            <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-2">
              Aucun appartement trouvé
            </h3>
            <p className="text-gray-400 dark:text-gray-600 text-sm">
              Essayez d'autres critères de recherche
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
              <span className="font-semibold text-primary-600 dark:text-primary-400">{pagination.total}</span>
              <span>résultat{pagination.total > 1 ? 's' : ''}</span>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span>Page {pagination.page} sur {pagination.totalPages}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {apartments.map((apt, i) => (
                <ApartmentCard key={apt._id} apartment={apt} delay={i} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={!pagination.hasPrev}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700
                             disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800
                             text-gray-600 dark:text-gray-400 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all ${
                      page === i + 1
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-none'
                        : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!pagination.hasNext}
                  className="p-2 rounded-xl border border-gray-200 dark:border-gray-700
                             disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800
                             text-gray-600 dark:text-gray-400 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}