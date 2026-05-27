// =============================================
// MD SERVICE - Card Annonce (Appartement ou Voiture)
// =============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Car, Fuel, Star, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { getImageUrl, formatPrice } from '../../utils/api';

// ── Card Appartement ────────────────────────────
export function ApartmentCard({ apartment, delay = 0 }) {
  // CORRECTION : Utilisation de 'id' au lieu de '_id'
  const { id, title, location, pricePerNight, currency, rooms, maxGuests,
          images, isAvailable, amenities } = apartment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      {/* CORRECTION : Lien vers 'id' */}
      <Link to={`/appartements/${id}`} className="card block group dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={images?.[0] ? getImageUrl(images[0].url) : '/placeholder-apt.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-110"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'; }}
          />
          {/* Badge disponibilité */}
          <div className="absolute top-3 left-3">
            <span className={isAvailable ? 'badge-available' : 'badge-occupied'}>
              {isAvailable ? '✓ Disponible' : '✗ Loué'}
            </span>
          </div>
          {/* Prix overlay */}
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm
                          px-3 py-1.5 rounded-xl transition-colors">
            <span className="text-primary-700 dark:text-primary-400 font-bold text-sm">
              {formatPrice(pricePerNight, currency)}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">/nuit</span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="font-bold text-dark dark:text-white text-lg mb-1 line-clamp-1 group-hover:text-primary-600
                         dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-3">
            <MapPin size={14} className="text-primary-500" />
            {location}
          </div>

          {/* Caractéristiques */}
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span className="flex items-center gap-1">
              <span className="text-primary-500">🛏</span>
              {rooms} pièce{rooms > 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} className="text-primary-500" />
              {maxGuests} pers.
            </span>
          </div>

          {/* Amenities (3 max) */}
          {amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {amenities.slice(0, 3).map((a) => (
                <span key={a} className="text-xs bg-primary-50 dark:bg-primary-900/20 text-primary-700
                                         dark:text-primary-300 px-2 py-0.5 rounded-full border border-transparent dark:border-primary-900/30">
                  {a}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                  +{amenities.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="text-primary-600 dark:text-primary-400 font-bold">
              {formatPrice(pricePerNight, currency)}
              <span className="text-gray-400 dark:text-gray-500 font-normal text-xs"> /nuit</span>
            </span>
            <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-medium
                             group-hover:gap-2 transition-all">
              Voir détails <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Card Voiture ────────────────────────────────
export function CarCard({ car, delay = 0 }) {
  // CORRECTION : Utilisation de 'id' au lieu de '_id'
  const { id, title, brand, model, year, pricing, currency, transmission,
          fuel, seats, images, isAvailable, features } = car;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      {/* CORRECTION : Lien vers 'id' */}
      <Link to={`/voitures/${id}`} className="card block group dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img
            src={images?.[0] ? getImageUrl(images[0].url) : '/placeholder-car.jpg'}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500
                       group-hover:scale-110"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'; }}
          />
          <div className="absolute top-3 left-3">
            <span className={isAvailable ? 'badge-available' : 'badge-occupied'}>
              {isAvailable ? '✓ Disponible' : '✗ Loué'}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-dark/70 dark:bg-black/70 text-white text-xs
                          px-2 py-1 rounded-lg font-medium backdrop-blur-sm">
            {brand} {year}
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <h3 className="font-bold text-dark dark:text-white text-lg mb-3 line-clamp-1 group-hover:text-primary-600
                         dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2 text-center transition-colors">
              <Car size={14} className="text-primary-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-300">{transmission}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2 text-center transition-colors">
              <Fuel size={14} className="text-primary-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-300">{fuel}</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2 text-center transition-colors">
              <Users size={14} className="text-primary-500 mx-auto mb-1" />
              <span className="text-xs text-gray-600 dark:text-gray-300">{seats} pl.</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <div>
              <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                {formatPrice(pricing?.perDay, currency)}
              </span>
              <span className="text-gray-400 dark:text-gray-500 text-xs"> /jour</span>
            </div>
            <span className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-medium
                             group-hover:gap-2 transition-all">
              Voir détails <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}