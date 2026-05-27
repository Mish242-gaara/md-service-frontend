// =============================================
// MD SERVICE - Page d'Accueil (Dark Mode Optimized)
// =============================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Car, Shield, Clock, Star, ArrowRight,
  MapPin, Phone, CheckCircle2
} from 'lucide-react';
import { apartmentsAPI, carsAPI, getWhatsAppUrl } from '../utils/api';
import { ApartmentCard, CarCard } from '../components/listings/ListingCard';

// ── Nouveaux Imports Ajoutés ──
import SEO from '../components/SEO';
import TrustBar from '../components/home/GuaranteesBar';
import Testimonials from '../components/home/TestimonialsSection';

// ── Hero Section ────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden
                        bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
      {/* Décors */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Texte */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                               text-white text-sm font-medium px-4 py-2 rounded-full mb-6
                               border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                MD Service · Pointe-Noire 🇨🇬
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'Syne' }}
            >
              MD Service
              <span className="block text-yellow-400">Appartements</span>
              <span className="text-3xl md:text-4xl text-white/80">& Voitures</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-lg mb-8 max-w-lg"
            >
              Des logements confortables et des véhicules fiables pour toutes vos occasions.
              Réservation simple, prix transparents, service impeccable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/appartements"
                className="btn-primary bg-white text-primary-700 hover:bg-gray-100
                           flex items-center justify-center gap-2">
                <Building2 size={20} /> Voir les appartements
              </Link>
              <Link to="/voitures"
                className="btn-outline border-white/40 text-white
                           hover:bg-white hover:text-primary-700
                           flex items-center justify-center gap-2">
                <Car size={20} /> Voir les voitures
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex gap-8 mt-12"
            >
              {[
                { n: '50+', label: 'Clients satisfaits' },
                { n: '24h', label: 'Réponse garantie' },
                { n: '7j/7', label: 'Disponibilité' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{n}</div>
                  <div className="text-white/60 text-sm">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Cards flottantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Card 1 */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="bg-white rounded-2xl p-5 shadow-2xl max-w-xs mb-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Building2 className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">Appartement Deluxe</p>
                    <p className="text-gray-400 text-xs">Quartier Lumumba</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-bold">25 000 XAF/nuit</span>
                  <span className="badge-available">Disponible</span>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="bg-white rounded-2xl p-5 shadow-2xl max-w-xs ml-auto"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Car className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">Toyota RAV4 2022</p>
                    <p className="text-gray-400 text-xs">Climatisé · GPS</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-bold">35 000 XAF/jour</span>
                  <span className="badge-available">Disponible</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
          className="w-full h-16 fill-gray-50 dark:fill-gray-900">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}

// ── Avantages ────────────────────────────────────
function FeaturesSection() {
  const features = [
    { icon: Shield, title: 'Sécurisé & Fiable', desc: 'Toutes nos annonces sont vérifiées. Vous louez en toute confiance.' },
    { icon: Clock,  title: 'Disponible 24h/24', desc: 'Réservation possible à tout moment. Réponse sous 1 heure.' },
    { icon: Star,   title: 'Service Premium',   desc: 'Appartements propres et voitures entretenues. Qualité garantie.' },
    { icon: MapPin, title: 'Pointe-Noire',      desc: 'Locations stratégiquement situées dans les meilleurs quartiers.' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="section-title"
          >
            Pourquoi choisir MD Service ?
          </motion.h2>
          <p className="section-subtitle mx-auto">
            Votre agence de confiance pour des locations sans tracas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card
                         hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1
                         text-center border border-transparent dark:border-gray-700"
            >
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/40 rounded-2xl
                              flex items-center justify-center mx-auto mb-4">
                <Icon className="text-primary-600 dark:text-primary-400" size={28} />
              </div>
              <h3 className="font-bold text-dark dark:text-white mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section Appartements ────────────────────────
function ApartmentsSection({ apartments, loading }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center
                        justify-between mb-12 gap-4">
          <div>
            <h2 className="section-title">Appartements en vedette</h2>
            <p className="section-subtitle">Nos logements les plus prisés</p>
          </div>
          <Link to="/appartements"
            className="btn-outline whitespace-nowrap flex items-center gap-2">
            Voir tout <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card">
                <div className="skeleton h-52" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <Building2 size={48} className="mx-auto mb-4 opacity-30" />
            <p>Aucun appartement disponible pour l'instant</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apt, i) => (
              <ApartmentCard key={apt._id} apartment={apt} delay={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Section Voitures ────────────────────────────
function CarsSection({ cars, loading }) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center
                        justify-between mb-12 gap-4">
          <div>
            <h2 className="section-title">Voitures disponibles</h2>
            <p className="section-subtitle">Nos véhicules pour tous vos déplacements</p>
          </div>
          <Link to="/voitures"
            className="btn-outline whitespace-nowrap flex items-center gap-2">
            Voir tout <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card">
                <div className="skeleton h-48" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <Car size={48} className="mx-auto mb-4 opacity-30" />
            <p>Aucune voiture disponible pour l'instant</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, i) => (
              <CarCard key={car._id} car={car} delay={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── CTA Section (Modifiée pour supprimer la redondance) ──────────
function CTASection() {
  return (
    <section className="py-24 bg-primary-800 relative overflow-hidden">
      {/* Texture subtile en arrière-plan */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100" stroke="white" fill="transparent" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Nouveau Badge de confiance (Remplace le premier bouton) */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full mb-8 border border-white/20">
            <CheckCircle2 size={16} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-widest">Service Client 24/7</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Syne' }}>
            Prêt à trouver votre bonheur ?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Que ce soit pour un séjour inoubliable ou un déplacement professionnel, 
            notre équipe à Pointe-Noire s'occupe de tout.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Bouton Principal de conversion */}
            <a
              href={getWhatsAppUrl('Bonjour MD Service ! Je souhaite obtenir des informations pour une réservation.')}
              target="_blank" rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-500 text-white px-10 py-4
                         rounded-2xl font-bold text-lg hover:bg-green-600 transition-all
                         hover:scale-105 shadow-2xl shadow-green-900/20"
            >
              <Phone size={20} />
              Réserver via WhatsApp
            </a>

            {/* Alternative Professionnelle */}
            <Link 
              to="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white/80 hover:text-white border-b border-white/20 hover:border-white transition-all py-2 font-medium"
            >
              Plus d'options de contact <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Page Principale ──────────────────────────────
export default function HomePage() {
  const [apartments, setApartments] = useState([]);
  const [cars, setCars] = useState([]);
  const [loadingApt, setLoadingApt] = useState(true);
  const [loadingCar, setLoadingCar] = useState(true);

  useEffect(() => {
    // Note: Le titre est maintenant géré par le composant <SEO />
    apartmentsAPI.getFeatured()
      .then(r => setApartments(r.data)).catch(() => setApartments([]))
      .finally(() => setLoadingApt(false));
    carsAPI.getFeatured()
      .then(r => setCars(r.data)).catch(() => setCars([]))
      .finally(() => setLoadingCar(false));
  }, []);

  return (
    <>
      {/* ── SEO & Meta-données ── */}
      <SEO 
        title="Accueil - Location d'Appartements & Voitures" 
        description="Réservez les meilleurs appartements et voitures à Pointe-Noire avec MD Service. Qualité premium, sécurité garantie et service client 24/7."
      />

      <HeroSection />

      {/* ── Section Confiance Immédiate ── */}
      <TrustBar />

      <FeaturesSection />

      <ApartmentsSection apartments={apartments} loading={loadingApt} />

      {/* ── Section Témoignages (Preuve Sociale) ── */}
      <Testimonials />

      <CarsSection cars={cars} loading={loadingCar} />
      
      <CTASection />
    </>
  );
}