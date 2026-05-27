// =============================================
// MD SERVICE - Page 404
// src/pages/NotFoundPage.jsx
// =============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Building2, Car, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  React.useEffect(() => { document.title = 'Page introuvable - MD Service'; }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900
                    flex items-center justify-center px-4">
      <div className="text-center max-w-lg w-full">

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Gros 404 */}
          <div className="relative inline-block">
            <span className="text-[10rem] font-black text-gray-100 dark:text-gray-800
                             leading-none select-none"
                  style={{ fontFamily: 'Syne' }}>
              404
            </span>
            {/* Icônes flottantes */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute top-8 -left-6 w-12 h-12 bg-primary-100 dark:bg-primary-900/40
                         rounded-2xl flex items-center justify-center shadow-sm"
            >
              <Building2 size={22} className="text-primary-600 dark:text-primary-400" />
            </motion.div>
            <motion.div
              animate={{ y: [6, -6, 6], rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute bottom-8 -right-6 w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30
                         rounded-2xl flex items-center justify-center shadow-sm"
            >
              <Car size={22} className="text-yellow-600 dark:text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: 'Syne' }}>
            Page introuvable
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            La page que vous cherchez n'existe pas ou a été déplacée.
            Retournez à l'accueil pour trouver votre appartement ou voiture idéale.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2
                       bg-primary-600 hover:bg-primary-700 text-white
                       font-semibold px-6 py-3 rounded-xl transition-all duration-200
                       hover:shadow-lg hover:shadow-primary-200 dark:hover:shadow-primary-900/30"
          >
            <Home size={18} />
            Retour à l'accueil
          </Link>
          <Link
            to="/appartements"
            className="inline-flex items-center justify-center gap-2
                       border border-gray-200 dark:border-gray-700
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100
                       dark:hover:bg-gray-800 font-semibold px-6 py-3
                       rounded-xl transition-all duration-200"
          >
            <Building2 size={18} />
            Voir les appartements
          </Link>
        </motion.div>

        {/* Liens rapides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-1
                     text-sm text-gray-400 dark:text-gray-600"
        >
          <ArrowLeft size={14} />
          <span>Ou naviguez vers :</span>
          <Link to="/voitures"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400
                       font-medium ml-1 hover:underline transition-colors">
            Voitures
          </Link>
          <span className="mx-1">·</span>
          <Link to="/contact"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400
                       font-medium hover:underline transition-colors">
            Contact
          </Link>
        </motion.div>
      </div>
    </div>
  );
}