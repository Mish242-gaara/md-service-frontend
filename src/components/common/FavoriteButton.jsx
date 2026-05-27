// =============================================
// MD SERVICE - Bouton Favori
// src/components/common/FavoriteButton.jsx
// =============================================
import React from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoritesContext } from '../../context/FavoritesContext';

/**
 * Bouton cœur à placer sur chaque card.
 *
 * @param {object} item  - L'appartement ou la voiture (doit avoir id/type)
 * @param {string} className - Classes Tailwind supplémentaires
 *
 * Exemple :
 *   <FavoriteButton item={{ ...apartment, type: 'apartment' }} />
 *   <FavoriteButton item={{ ...car, type: 'car' }} />
 */
export default function FavoriteButton({ item, className = '' }) {
  const { isFav, toggle } = useFavoritesContext();
  const id   = String(item?.id || item?._id || '');
  const type = item?.type || 'apartment';
  const fav  = isFav(id, type);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({ ...item, id, type });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={`w-9 h-9 rounded-full flex items-center justify-center
                  bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                  border border-white/50 dark:border-gray-700
                  shadow-sm transition-all duration-200
                  hover:scale-110 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1
                  ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {fav ? (
          <motion.span
            key="filled"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Heart size={16} className="text-red-500 fill-red-500" />
          </motion.span>
        ) : (
          <motion.span
            key="empty"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Heart size={16} className="text-gray-400 dark:text-gray-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}