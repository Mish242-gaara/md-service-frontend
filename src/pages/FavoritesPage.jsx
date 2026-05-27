// =============================================
// MD SERVICE - Page Favoris
// src/pages/FavoritesPage.jsx
// =============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Building2, Car, Trash2, ArrowRight } from 'lucide-react';
import { useFavoritesContext } from '../context/FavoritesContext';
import { getImageUrl } from '../utils/api';

function FavCard({ item, onRemove }) {
  const to = item.type === 'car'
    ? `/voitures/${item.id}`
    : `/appartements/${item.id}`;

  const imgSrc = item.image
    ? getImageUrl(item.image)
    : item.type === 'car'
      ? 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=70'
      : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=70';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                 border border-transparent dark:border-gray-700
                 shadow-card hover:shadow-card-hover transition-all duration-300
                 hover:-translate-y-1 group"
    >
      {/* Image */}
      <Link to={to} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={imgSrc}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=70'; }}
        />
        {/* Badge type */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase
                          tracking-wider px-2.5 py-1 rounded-full
                          ${item.type === 'car'
                            ? 'bg-yellow-100 dark:bg-yellow-900/70 text-yellow-700 dark:text-yellow-300'
                            : 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300'
                          }`}>
          {item.type === 'car' ? 'Voiture' : 'Appartement'}
        </span>
        {/* Bouton supprimer */}
        <button
          onClick={(e) => { e.preventDefault(); onRemove(item); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full
                     bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                     flex items-center justify-center shadow-sm
                     text-red-400 hover:text-red-600 hover:scale-110
                     transition-all duration-200"
          aria-label="Retirer des favoris"
        >
          <Heart size={15} className="fill-red-400" />
        </button>
      </Link>

      {/* Corps */}
      <div className="p-4">
        <Link to={to}>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1
                         hover:text-primary-600 dark:hover:text-primary-400
                         transition-colors line-clamp-1">
            {item.title}
          </h3>
        </Link>
        {item.location && (
          <p className="text-gray-400 dark:text-gray-500 text-xs mb-3">{item.location}</p>
        )}
        <div className="flex items-center justify-between">
          {item.price && (
            <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">
              {new Intl.NumberFormat('fr-FR').format(item.price)} {item.currency}
            </span>
          )}
          <Link
            to={to}
            className="text-xs font-semibold text-gray-500 dark:text-gray-400
                       hover:text-primary-600 dark:hover:text-primary-400
                       flex items-center gap-1 transition-colors"
          >
            Voir <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function FavoritesPage() {
  const { favorites, toggle, clear, count } = useFavoritesContext();

  React.useEffect(() => {
    document.title = `Favoris (${count}) - MD Service`;
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-primary-900 py-14 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <Heart size={28} className="text-red-400 fill-red-400" />
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Syne' }}>
                Mes favoris
              </h1>
            </div>
            <p className="text-white/60 text-sm">
              {count === 0
                ? 'Aucun bien sauvegardé pour l\'instant'
                : `${count} bien${count > 1 ? 's' : ''} sauvegardé${count > 1 ? 's' : ''}`
              }
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {count === 0 ? (
          /* État vide */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full
                            flex items-center justify-center mx-auto mb-5">
              <Heart size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Aucun favori pour l'instant
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 max-w-sm mx-auto">
              Cliquez sur le cœur sur n'importe quelle annonce pour la sauvegarder ici.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/appartements"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700
                           text-white font-semibold px-6 py-3 rounded-xl transition-all"
              >
                <Building2 size={18} /> Voir les appartements
              </Link>
              <Link
                to="/voitures"
                className="inline-flex items-center gap-2 border border-gray-200
                           dark:border-gray-700 text-gray-700 dark:text-gray-300
                           hover:bg-gray-100 dark:hover:bg-gray-800
                           font-semibold px-6 py-3 rounded-xl transition-all"
              >
                <Car size={18} /> Voir les voitures
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Barre d'actions */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {count} bien{count > 1 ? 's' : ''} sauvegardé{count > 1 ? 's' : ''}
              </p>
              <button
                onClick={clear}
                className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400
                           hover:text-red-700 dark:hover:text-red-300 font-medium
                           transition-colors"
              >
                <Trash2 size={15} /> Tout effacer
              </button>
            </div>

            {/* Grille */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(item => (
                <FavCard
                  key={`${item.type}-${item.id}`}
                  item={item}
                  onRemove={toggle}
                />
              ))}
            </div>

            {/* CTA bas de page */}
            <div className="mt-12 text-center">
              <p className="text-gray-400 dark:text-gray-600 text-sm mb-4">
                Vous avez trouvé ce qu'il vous faut ?
              </p>
              <a
                href={`https://wa.me/${process.env.REACT_APP_WHATSAPP || '242068758827'}?text=${encodeURIComponent('Bonjour MD Service ! Je suis intéressé(e) par plusieurs de vos annonces.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600
                           text-white font-bold px-6 py-3 rounded-xl transition-all
                           hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Contacter MD Service
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}