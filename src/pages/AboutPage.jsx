// =============================================
// MD SERVICE - Page À propos
// src/pages/AboutPage.jsx
// =============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Clock, Star, MapPin, Building2,
  Car, CheckCircle, Users, ArrowRight
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/api';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const values = [
  {
    icon: Shield,
    title: 'Confiance',
    desc: 'Chaque bien est inspecté avant publication. Vous louez en connaissance de cause, sans mauvaise surprise.'
  },
  {
    icon: Clock,
    title: 'Réactivité',
    desc: 'Disponibles 24h/24, 7j/7. Nous répondons à toutes vos demandes en moins d\'une heure.'
  },
  {
    icon: Star,
    title: 'Qualité',
    desc: 'Appartements propres, voitures entretenues, tarifs honnêtes. Le meilleur rapport qualité-prix de Pointe-Noire.'
  },
  {
    icon: MapPin,
    title: 'Local',
    desc: 'Nous connaissons Pointe-Noire comme notre poche. Nos biens sont stratégiquement situés.'
  },
];

const stats = [
  { n: '50+',  label: 'Clients satisfaits'  },
  { n: '20+',  label: 'Biens disponibles'   },
  { n: '1h',   label: 'Temps de réponse'    },
  { n: '7j/7', label: 'Disponibilité'       },
];

const team = [
  {
    name: 'MAMPEMBI Dalneige',
    role: 'Fondateur & Gérant',
    initials: 'MD',
    bio: 'Passionné de l\'immobilier et de la mobilité à Pointe-Noire. Fondateur de MD Service avec pour mission de simplifier la location pour tous.',
    color: 'bg-primary-600',
    
  },

  {
    name: 'MOUKOUANGA Elmish',
    role: 'Développeur Web',
    initials: 'ME',
    bio: 'Administrateur Réseau et Développeur web. Concepteur du site en ligne MD Service avec pour mission de simplifier la location pour tous.',
    color: 'bg-primary-600',
    
  },
];

const timeline = [
  { year: '2023', event: 'Création de MD Service à Pointe-Noire' },
  { year: '2024', event: 'Lancement de la flotte de véhicules' },
  { year: '2025', event: 'Expansion à plus de 20 logements disponibles' },
  { year: '2026', event: 'Lancement de la plateforme en ligne' },
];

export default function AboutPage() {
  React.useEffect(() => { document.title = 'À propos - MD Service'; }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 text-white
                             text-sm font-medium px-4 py-2 rounded-full mb-6
                             border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Notre histoire
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5"
                style={{ fontFamily: 'Syne' }}>
              Qui sommes-nous ?
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              MD Service est votre agence immobilière et location de véhicules de confiance
              à Pointe-Noire. Depuis notre création, nous aidons particuliers et professionnels
              à trouver le logement ou le véhicule idéal.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ n, label }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.08)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 text-center
                         shadow-card border border-transparent dark:border-gray-700"
            >
              <div className="text-2xl font-black text-primary-600 dark:text-primary-400 mb-1"
                   style={{ fontFamily: 'Syne' }}>
                {n}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5"
                style={{ fontFamily: 'Syne' }}>
              Notre mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">
              Chez MD Service, nous croyons que trouver un logement ou un véhicule de qualité
              à Pointe-Noire ne devrait pas être compliqué. Notre mission est de simplifier
              ce processus en proposant une sélection rigoureuse de biens, des prix transparents
              et un service irréprochable.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Que vous soyez un professionnel en déplacement, une famille en quête d'un nouveau
              logement ou un touriste souhaitant découvrir le Congo, nous avons la solution
              adaptée à vos besoins et à votre budget.
            </p>
            <ul className="space-y-3">
              {[
                'Biens vérifiés et inspectés personnellement',
                'Prix nets, sans frais cachés',
                'Réponse garantie en moins d\'une heure',
                'Support disponible 7j/7 via WhatsApp',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={18}
                    className="text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Timeline */}
          <motion.div {...fadeUp(0.15)}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-card
                            border border-transparent dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">
                Notre parcours
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-2 bottom-2 w-px
                                bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-6">
                  {timeline.map(({ year, event }, i) => (
                    <div key={year} className="flex gap-4 relative pl-12">
                      <div className="absolute left-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/40
                                      rounded-full flex items-center justify-center
                                      border-2 border-white dark:border-gray-800">
                        <span className="text-primary-600 dark:text-primary-400
                                         font-bold text-xs">{year.slice(-2)}</span>
                      </div>
                      <div>
                        <div className="text-primary-600 dark:text-primary-400
                                        font-bold text-sm mb-0.5">{year}</div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm">{event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="bg-white dark:bg-gray-950 py-20 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
                style={{ fontFamily: 'Syne' }}>
              Nos valeurs
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Les principes qui guident chacune de nos actions au quotidien
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.1)}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center
                           border border-transparent dark:border-gray-700
                           hover:shadow-card transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-xl
                                flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Équipe ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: 'Syne' }}>
            Notre équipe
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Les personnes derrière MD Service
          </p>
        </motion.div>
        <div className="flex justify-center">
          {team.map(({ name, role, initials, bio, color }, i) => (
            <motion.div
              key={name}
              {...fadeUp(i * 0.1)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-card
                         border border-transparent dark:border-gray-700 max-w-sm w-full text-center"
            >
              <div className={`w-20 h-20 ${color} rounded-2xl flex items-center
                               justify-center mx-auto mb-5 shadow-lg`}>
                <span className="text-white font-black text-2xl"
                      style={{ fontFamily: 'Syne' }}>
                  {initials}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{name}</h3>
              <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">{role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-gray-100 dark:bg-gray-800/50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                style={{ fontFamily: 'Syne' }}>
              Ce que nous proposons
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Building2, title: 'Location d\'appartements',
                items: ['Studios et appartements meublés', 'Villas et maisons', 'Location courte et longue durée', 'Tous quartiers de Pointe-Noire']
              },
              {
                icon: Car, title: 'Location de véhicules',
                items: ['Berlines, SUV et 4x4', 'Avec ou sans chauffeur', 'Location à la journée ou à la semaine', 'Véhicules récents et assurés']
              },
            ].map(({ icon: Icon, title, items }, i) => (
              <motion.div
                key={title}
                {...fadeUp(i * 0.15)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card
                           border border-transparent dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-xl
                                  flex items-center justify-center">
                    <Icon size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={15}
                        className="text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 bg-primary-700">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: 'Syne' }}>
              Prêt à travailler avec nous ?
            </h2>
            <p className="text-white/70 mb-8">
              Contactez-nous dès maintenant pour trouver le bien qui vous convient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrl('Bonjour MD Service ! Je souhaite en savoir plus sur vos services.')}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2
                           bg-green-500 hover:bg-green-400 text-white
                           font-bold px-7 py-3.5 rounded-xl transition-all
                           hover:shadow-lg hover:scale-105"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                Nous contacter
              </a>
              <Link
                to="/appartements"
                className="inline-flex items-center justify-center gap-2
                           border-2 border-white/40 text-white hover:bg-white/10
                           font-semibold px-7 py-3.5 rounded-xl transition-all"
              >
                Voir nos biens <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}