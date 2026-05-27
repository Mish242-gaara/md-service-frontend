// =============================================
// MD SERVICE - Page Détail Appartement (Dark Mode)
// =============================================
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, ChevronLeft, ChevronRight, X, 
  Play, ArrowLeft, Eye, CheckCircle
} from 'lucide-react';

// API et Utilitaires
import { apartmentsAPI, getImageUrl, getWhatsAppUrl } from '../utils/api';

// Composants
import BookingForm from '../components/booking/BookingForm';
import FavoriteButton from '../components/common/FavoriteButton';
import ShareButton from '../components/common/ShareButton';

// ── Galerie d'images ────────────────────────────
function ImageGallery({ images, video, title }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const allMedia = [...(images || [])];
  const total = allMedia.length;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  if (total === 0) {
    return (
      <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl
                      flex items-center justify-center">
        <span className="text-gray-400 dark:text-gray-500">Aucune photo disponible</span>
      </div>
    );
  }

  return (
    <>
      {/* Galerie principale */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-2xl overflow-hidden">
        <div
          className="col-span-3 row-span-2 relative cursor-pointer group overflow-hidden"
          onClick={() => setLightbox(true)}
        >
          <img
            src={getImageUrl(allMedia[0]?.url)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80'; }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5
                          rounded-xl backdrop-blur-sm flex items-center gap-2">
            <Eye size={14} /> Voir toutes les photos
          </div>
        </div>

        <div className="col-span-1 row-span-2 flex flex-col gap-2">
          {allMedia.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="flex-1 cursor-pointer overflow-hidden relative group"
              onClick={() => { setCurrent(i + 1); setLightbox(true); }}
            >
              <img
                src={getImageUrl(img.url)}
                alt={`${title} ${i + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80'; }}
              />
              {i === 1 && total > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center
                                justify-center text-white font-bold text-xl">
                  +{total - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 text-white bg-white/10
                         hover:bg-white/20 p-2 rounded-xl"
            >
              <X size={24} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-xl"
            >
              <ChevronLeft size={24} />
            </button>
            <motion.img
              key={current}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={getImageUrl(allMedia[current]?.url)}
              alt={title}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80'; }}
            />
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-xl"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-6 text-white/60 text-sm">
              {current + 1} / {total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vidéo */}
      {video?.url && (
        <div className="mt-4">
          <h4 className="font-semibold text-dark dark:text-white mb-3 flex items-center gap-2">
            <Play size={18} className="text-primary-600 dark:text-primary-400" />
            Vidéo de présentation
          </h4>
          <video
            controls
            className="w-full rounded-2xl max-h-80 bg-black shadow-lg"
            src={getImageUrl(video.url)}
          />
        </div>
      )}
    </>
  );
}

// ── Page principale ──────────────────────────────
export default function ApartmentDetailPage() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apartmentsAPI.getById(id)
      .then(r => { setApartment(r.data); document.title = `${r.data.title} - MD Service`; })
      .catch(() => setError('Appartement introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
      <div className="skeleton h-10 w-64" />
      <div className="skeleton h-[420px] rounded-2xl" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-40" />
        </div>
        <div className="skeleton h-96 rounded-2xl" />
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4
                    bg-gray-50 dark:bg-gray-900 px-4">
      <p className="text-gray-400 dark:text-gray-500 text-lg">{error}</p>
      <Link to="/appartements" className="btn-primary">Retour aux appartements</Link>
    </div>
  );

  const { 
    title, description, location, pricePerNight, currency,
    rooms, bathrooms, maxGuests, amenities, images, video,
    isAvailable, views 
  } = apartment;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Barre de retour et Actions rapides */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/appartements"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400
                       hover:text-primary-600 dark:hover:text-primary-400
                       transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Retour aux appartements
          </Link>

          <div className="flex items-center gap-2">
             <ShareButton 
                title={title} 
                text={`Découvrez cet appartement sur MD Service : ${title}`} 
             />
             <FavoriteButton 
                item={apartment} 
                type="apartment" 
                className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
             />
          </div>
        </div>

        {/* Galerie */}
        <ImageGallery images={images} video={video} title={title} />

        {/* Contenu */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Infos principales */}
          <div className="lg:col-span-2 space-y-6">

            {/* En-tête Titre */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card
                            border border-transparent dark:border-gray-700">
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-dark dark:text-white">
                  {title}
                </h1>
                <span className={isAvailable ? 'badge-available' : 'badge-occupied'}>
                  {isAvailable ? '✓ Disponible' : '✗ Loué'}
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-4">
                <MapPin size={16} className="text-primary-500 dark:text-primary-400" />
                {location}
                {views > 0 && (
                  <span className="ml-4 flex items-center gap-1 text-xs text-gray-400">
                    <Eye size={12} /> {views} vues
                  </span>
                )}
              </div>

              {/* Caractéristiques rapides */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: '🛏', label: `${rooms} pièce${rooms > 1 ? 's' : ''}` },
                  { icon: '🚿', label: `${bathrooms} salle${bathrooms > 1 ? 's' : ''} de bain` },
                  { icon: '👤', label: `${maxGuests} pers. max` },
                ].map(({ icon, label }) => (
                  <div key={label}
                    className="bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl
                               flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card
                            border border-transparent dark:border-gray-700">
              <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Description</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Équipements */}
            {amenities?.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card
                              border border-transparent dark:border-gray-700">
                <h2 className="text-xl font-bold text-dark dark:text-white mb-4">
                  Équipements inclus
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map(a => (
                    <div key={a} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle size={18} className="text-green-500 dark:text-green-400 shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tarif */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card
                            border border-transparent dark:border-gray-700">
              <h2 className="text-xl font-bold text-dark dark:text-white mb-4">Tarif</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {new Intl.NumberFormat('fr-FR').format(pricePerNight)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{currency} / nuit</span>
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Tarif pour 24h. Contactez-nous pour des durées prolongées.
              </p>
            </div>
          </div>

          {/* Sidebar Réservation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-2 shadow-xl
                              shadow-primary-900/5 border border-transparent dark:border-gray-700">
                <BookingForm listing={apartment} type="apartment" />
              </div>

              {/* Contact direct */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-card
                              border border-transparent dark:border-gray-700 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  Des questions ? Contactez-nous directement
                </p>
                <a
                  href={getWhatsAppUrl(`Bonjour, je suis intéressé par l'appartement : ${title}`)}
                  target="_blank" rel="noreferrer"
                  className="btn-whatsapp w-full justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Poser une question
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}