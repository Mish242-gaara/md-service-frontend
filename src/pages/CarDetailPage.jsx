// =============================================
// LOKEA - Page Détail Voiture (Optimisée)
// =============================================
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, Fuel, Users, Settings, ChevronLeft, ChevronRight,
  X, ArrowLeft, CheckCircle, Eye, Play
} from 'lucide-react';
import { carsAPI, getImageUrl, getWhatsAppUrl, formatPrice } from '../utils/api';
import BookingForm from '../components/booking/BookingForm';

function CarGallery({ images, video, title }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images?.length || 0;

  const prev = (e) => {
    e.stopPropagation();
    setCurrent(c => (c - 1 + total) % total);
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent(c => (c + 1) % total);
  };

  if (total === 0) return (
    <div className="w-full h-72 bg-gray-200 rounded-2xl flex items-center justify-center">
      <Car size={48} className="text-gray-300" />
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[380px] rounded-2xl overflow-hidden">
        <div
          className="col-span-3 row-span-2 relative cursor-pointer group overflow-hidden"
          onClick={() => setLightbox(true)}
        >
          <img
            src={getImageUrl(images[0]?.url)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80'; }}
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5
                        rounded-xl backdrop-blur-sm flex items-center gap-2">
            <Eye size={14} /> Voir toutes les photos
          </div>
        </div>
        <div className="col-span-1 row-span-2 flex flex-col gap-2">
          {images.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="flex-1 cursor-pointer overflow-hidden relative group"
              onClick={() => { setCurrent(i + 1); setLightbox(true); }}
            >
              <img
                src={getImageUrl(img.url)}
                alt={`${title} ${i + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80'; }}
              />
              {i === 1 && total > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                  +{total - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-xl z-[110]">
              <X size={24} />
            </button>
            
            {total > 1 && (
              <>
                <button onClick={prev} className="absolute left-4 text-white bg-white/10 p-3 rounded-xl z-[110] hover:bg-white/20">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="absolute right-4 text-white bg-white/10 p-3 rounded-xl z-[110] hover:bg-white/20">
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.img
              key={current}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={getImageUrl(images[current]?.url)}
              alt={title}
              className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80'; }}
            />
            <div className="absolute bottom-6 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
              {current + 1} / {total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {video?.url && (
        <div className="mt-6">
          <h4 className="font-semibold text-dark mb-3 flex items-center gap-2">
            <Play size={18} className="text-primary-600" /> Vidéo du véhicule
          </h4>
          <video controls className="w-full rounded-2xl max-h-80 bg-black shadow-lg" src={getImageUrl(video.url)} />
        </div>
      )}
    </>
  );
}

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined') {
      setError('Identifiant du véhicule manquant');
      setLoading(false);
      return;
    }

    setLoading(true);
    carsAPI.getById(id)
      .then(r => { 
        if (r.data) {
          setCar(r.data); 
          document.title = `${r.data.title || 'Véhicule'} - Lokea`; 
        } else {
          setError('Véhicule introuvable');
        }
      })
      .catch((err) => {
        console.error("Erreur récupération voiture:", err);
        setError('Une erreur est survenue lors de la récupération du véhicule');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
      <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
      <div className="h-[380px] bg-gray-200 animate-pulse rounded-2xl" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded" />
          <div className="h-40 bg-gray-200 animate-pulse rounded-2xl" />
        </div>
        <div className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
      </div>
    </div>
  );

  if (error || !car) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-card text-center max-w-md">
        <Car size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">Oups !</h2>
        <p className="text-gray-500 mb-6">{error || 'Véhicule introuvable'}</p>
        <Link to="/voitures" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
          <ArrowLeft size={18} /> Retour au catalogue
        </Link>
      </div>
    </div>
  );

  const { title, brand, model, year, description, pricing, currency,
          transmission, fuel, seats, color, features, images, video,
          isAvailable } = car;

  const pricingRows = [
    { label: '24h (1 jour)', price: pricing?.perDay },
    { label: '48h (2 jours)', price: pricing?.per2Days },
    { label: '72h (3 jours)', price: pricing?.per3Days },
    { label: '7 jours', price: pricing?.perWeek },
  ].filter(r => r.price);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/voitures" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6 text-sm font-medium">
          <ArrowLeft size={16} /> Retour aux voitures
        </Link>

        <CarGallery images={images} video={video} title={title} />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Section Infos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-card border border-white">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-dark leading-tight">{title}</h1>
                  <p className="text-gray-500 mt-2 font-medium">
                    {brand} {model} <span className="mx-1">•</span> {year} {color ? <><span className="mx-1">•</span> {color}</> : ''}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                  isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isAvailable ? '✓ Disponible' : '✗ Déjà loué'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Settings, label: 'Boîte', val: transmission },
                  { icon: Fuel, label: 'Énergie', val: fuel },
                  { icon: Users, label: 'Capacité', val: `${seats} places` },
                  { icon: Car, label: 'Année', val: year },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 transition-hover hover:border-primary-100">
                    <Icon size={22} className="text-primary-600 mb-2" />
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">{label}</p>
                    <p className="text-sm font-bold text-dark">{val || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card border border-white">
              <h2 className="text-xl font-bold text-dark mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                {description || "Aucune description supplémentaire pour ce véhicule."}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card border border-white">
              <h2 className="text-xl font-bold text-dark mb-4">Grille tarifaire</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pricingRows.map(({ label, price }, i) => (
                  <div key={label} className={`flex items-center justify-between p-4 rounded-xl border ${i === 0 ? 'border-primary-200 bg-primary-50/50' : 'border-gray-100 bg-gray-50/50'}`}>
                    <span className="font-semibold text-gray-700">{label}</span>
                    <span className="font-bold text-lg text-primary-700">{formatPrice(price, currency)}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-[11px] mt-4 italic font-medium">
                * Les prix peuvent varier selon la saison. Contactez-nous pour les services avec chauffeur.
              </p>
            </div>

            {features?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card border border-white">
                <h2 className="text-xl font-bold text-dark mb-4">Options & Équipements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {features.map(f => (
                    <div key={f} className="flex items-center gap-3 text-gray-700 py-1">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle size={14} className="text-green-600" />
                      </div>
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Réservation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl p-2 shadow-xl shadow-primary-900/5">
                {/* Sécurité : On affiche le formulaire SEULEMENT si car est chargé et possède un id */}
                {car && car.id && (
                  <BookingForm listing={car} type="car" />
                )}
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-card text-center border border-white">
                <p className="text-gray-500 text-sm mb-4 font-medium">Besoin d'une assistance immédiate ?</p>
                <a
                  href={getWhatsAppUrl(`Bonjour Lokea, je souhaite réserver la ${title} (${brand} ${model} ${year}). Est-elle disponible ?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-200 transition-all active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Contact WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}