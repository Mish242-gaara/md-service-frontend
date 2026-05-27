// =============================================
// MD SERVICE - Page Liste des Voitures (Dark Mode)
// =============================================
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Car, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { carsAPI } from '../utils/api';
import { CarCard } from '../components/listings/ListingCard';

export default function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [filters, setFilters] = useState({
    available: '', transmission: '', fuel: '', maxPrice: '', brand: ''
  });
  const [page, setPage] = useState(1);

  useEffect(() => { document.title = 'Catalogue Voitures - MD Service'; }, []);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9, ...filters };
      Object.keys(params).forEach(k => {
        if (params[k] === '' || params[k] === null) delete params[k];
      });
      const { data } = await carsAPI.getAll(params);
      setCars(data.cars);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Erreur fetchCars:', err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { fetchCars(); }, [fetchCars]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({ available: '', transmission: '', fuel: '', maxPrice: '', brand: '' });
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Car size={40} className="text-white/60 mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Notre Flotte</h1>
            <p className="text-white/70 text-lg font-medium">
              {pagination.total} véhicule{pagination.total > 1 ? 's' : ''} au total
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Filtres */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-card
                        border border-transparent dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Recherche marque */}
            <div className="lg:col-span-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2
                                 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Marque (ex: Toyota)"
                value={filters.brand}
                onChange={e => handleFilterChange('brand', e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            <select
              value={filters.available}
              onChange={e => handleFilterChange('available', e.target.value)}
              className="input-field"
            >
              <option value="">Tous les états</option>
              <option value="true">Disponibles</option>
            </select>

            <select
              value={filters.transmission}
              onChange={e => handleFilterChange('transmission', e.target.value)}
              className="input-field"
            >
              <option value="">Transmissions</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </select>

            <select
              value={filters.fuel}
              onChange={e => handleFilterChange('fuel', e.target.value)}
              className="input-field"
            >
              <option value="">Carburants</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Prix Max"
                value={filters.maxPrice}
                onChange={e => handleFilterChange('maxPrice', e.target.value)}
                className="input-field flex-1"
              />
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="p-3 text-red-500 dark:text-red-400
                             hover:bg-red-50 dark:hover:bg-red-900/20
                             rounded-xl transition-colors"
                  title="Réinitialiser"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Résultats */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden
                                      shadow-sm border border-transparent dark:border-gray-700 p-4">
                <div className="skeleton h-48 w-full rounded-2xl mb-4" />
                <div className="space-y-3">
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-10 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl
                          border-2 border-dashed border-gray-100 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700 w-20 h-20 rounded-full
                            flex items-center justify-center mx-auto mb-4">
              <Car size={32} className="text-gray-300 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-dark dark:text-white mb-2">
              Aucun véhicule ne correspond
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
              Modifiez vos filtres ou réinitialisez la recherche pour voir plus d'options.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 text-primary-600 dark:text-primary-400 font-bold hover:underline"
            >
              Voir tout le catalogue
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-dark dark:text-white">
                {pagination.total} voiture{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {cars.map((car, i) => (
                <CarCard key={car.id} car={car} delay={i * 0.1} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pb-10">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={!pagination.hasPrev}
                  className="p-3 rounded-2xl border border-gray-200 dark:border-gray-700
                             disabled:opacity-30 hover:bg-white dark:hover:bg-gray-800
                             hover:shadow-md text-gray-600 dark:text-gray-400 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                      page === i + 1
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-primary-900'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!pagination.hasNext}
                  className="p-3 rounded-2xl border border-gray-200 dark:border-gray-700
                             disabled:opacity-30 hover:bg-white dark:hover:bg-gray-800
                             hover:shadow-md text-gray-600 dark:text-gray-400 transition-all"
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
