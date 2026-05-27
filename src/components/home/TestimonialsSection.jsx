// =============================================
// MD SERVICE - Section Témoignages
// src/components/home/TestimonialsSection.jsx
// =============================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Jean-Baptiste M.',
    role: 'Cadre d\'entreprise',
    location: 'Pointe-Noire',
    initials: 'JB',
    color: 'bg-blue-600',
    rating: 5,
    text: 'Service impeccable ! J\'ai loué un appartement pour une mission de 3 semaines. Tout était propre, bien équipé et exactement comme sur les photos. L\'équipe répond en quelques minutes sur WhatsApp. Je recommande vivement.',
    type: 'apartment',
  },
  {
    id: 2,
    name: 'Marie-Claire N.',
    role: 'Directrice commerciale',
    location: 'Brazzaville',
    initials: 'MC',
    color: 'bg-pink-600',
    rating: 5,
    text: 'J\'ai loué une voiture pour un déplacement professionnel. Le véhicule était en excellent état, climatisé et le plein fait. Prix transparent, aucune mauvaise surprise. MD Service c\'est la référence à Pointe-Noire.',
    type: 'car',
  },
  {
    id: 3,
    name: 'Patrick O.',
    role: 'Entrepreneur',
    location: 'Pointe-Noire',
    initials: 'PO',
    color: 'bg-green-600',
    rating: 5,
    text: 'Réactivité exemplaire ! J\'avais besoin d\'un appartement en urgence. En moins de 2 heures, tout était réglé. La villa correspond à 100% à ce qui était annoncé. Une agence sérieuse et professionnelle.',
    type: 'apartment',
  },
  {
    id: 4,
    name: 'Sophie K.',
    role: 'Expatriée',
    location: 'France',
    initials: 'SK',
    color: 'bg-purple-600',
    rating: 5,
    text: 'En tant qu\'expatriée, trouver un logement de confiance à distance était mon plus grand défi. MD Service m\'a accompagnée du début à la fin avec des photos réelles, des vidéos et une communication parfaite. Merci !',
    type: 'apartment',
  },
  {
    id: 5,
    name: 'Rodrigue B.',
    role: 'Gérant de société',
    location: 'Pointe-Noire',
    initials: 'RB',
    color: 'bg-orange-600',
    rating: 4,
    text: 'Je loue régulièrement des voitures pour mes équipes. MD Service propose les meilleurs tarifs de la ville avec des véhicules récents et bien entretenus. Le service client est top, toujours disponible.',
    type: 'car',
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* En-tête */}
        <div className="flex flex-col md:flex-row items-start md:items-end
                        justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest
                               text-primary-600 dark:text-primary-400 mb-2 block">
                Témoignages
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: 'Syne' }}>
                Ils nous font confiance
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
                Plus de 50 clients satisfaits à Pointe-Noire et au-delà.
              </p>
            </motion.div>
          </div>

          {/* Contrôles */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700
                         flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:bg-primary-600 hover:border-primary-600 hover:text-white
                         dark:hover:bg-primary-600 dark:hover:border-primary-600
                         transition-all duration-200"
              aria-label="Précédent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700
                         flex items-center justify-center
                         text-gray-500 dark:text-gray-400
                         hover:bg-primary-600 hover:border-primary-600 hover:text-white
                         dark:hover:bg-primary-600 dark:hover:border-primary-600
                         transition-all duration-200"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards témoignages — desktop 3 colonnes, mobile 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-6
                            border border-transparent dark:border-gray-700
                            relative flex flex-col gap-4
                            ${i === 0 ? 'md:block' : i === 1 ? 'hidden md:block' : 'hidden md:block'}`}
              >
                {/* Quote icon */}
                <Quote size={28}
                  className="text-primary-200 dark:text-primary-800 absolute top-5 right-5" />

                {/* Étoiles */}
                <StarRating count={t.rating} />

                {/* Texte */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                  "{t.text}"
                </p>

                {/* Auteur */}
                <div className="flex items-center gap-3 pt-2
                                border-t border-gray-200 dark:border-gray-700">
                  <div className={`w-10 h-10 ${t.color} rounded-xl flex items-center
                                   justify-center flex-shrink-0`}>
                    <span className="text-white font-bold text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {t.role} · {t.location}
                    </div>
                  </div>
                  <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full
                    ${t.type === 'car'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    }`}>
                    {t.type === 'car' ? 'Voiture' : 'Appart.'}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Indicateurs dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full
                ${i === current
                  ? 'w-6 h-2 bg-primary-600'
                  : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              aria-label={`Avis ${i + 1}`}
            />
          ))}
        </div>

        {/* Barre de confiance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-5
                     border border-primary-100 dark:border-primary-800
                     flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">5.0 / 5</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            <strong className="text-gray-900 dark:text-white">50+</strong> clients satisfaits
          </span>
          <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            <strong className="text-gray-900 dark:text-white">100%</strong> recommandent MD Service
          </span>
        </motion.div>
      </div>
    </section>
  );
}
