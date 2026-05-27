// =============================================
// MD SERVICE - Bouton Partager
// src/components/common/ShareButton.jsx
// =============================================
import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Bouton partage avec menu : Copier le lien + WhatsApp.
 *
 * @param {string} title   - Titre du bien
 * @param {string} text    - Texte WhatsApp pré-rempli (optionnel)
 * @param {string} className
 *
 * Exemple :
 *   <ShareButton title={car.title} text={`Regarde cette voiture : ${car.title}`} />
 */
export default function ShareButton({ title = '', text = '', className = '' }) {
  const [open, setOpen]       = useState(false);
  const [copied, setCopied]   = useState(false);

  const url = window.location.href;
  const waNumber = process.env.REACT_APP_WHATSAPP || '242064149149';
  const waMsg = encodeURIComponent(
    text || `Bonjour ! Regarde cette annonce sur MD Service : ${title}\n${url}`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => { setCopied(false); setOpen(false); }, 2000);
  };

  // Utiliser l'API Web Share si disponible (mobile)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url }).catch(() => {});
      return;
    }
    setOpen(o => !o);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 text-sm font-semibold
                   text-gray-500 dark:text-gray-400
                   hover:text-primary-600 dark:hover:text-primary-400
                   bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                   px-3 py-2 rounded-xl transition-all duration-200"
        aria-label="Partager"
      >
        <Share2 size={15} />
        <span className="hidden sm:inline">Partager</span>
      </button>

      {/* Dropdown menu (desktop uniquement si pas de Web Share API) */}
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-40 w-56
                         bg-white dark:bg-gray-800 rounded-xl shadow-xl
                         border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Copier le lien */}
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm
                           font-medium text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {copied
                  ? <Check size={16} className="text-green-500 flex-shrink-0" />
                  : <Copy size={16} className="text-gray-400 flex-shrink-0" />
                }
                {copied ? 'Lien copié !' : 'Copier le lien'}
              </button>

              {/* Partager sur WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm
                           font-medium text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                           border-t border-gray-100 dark:border-gray-700"
              >
                <MessageCircle size={16} className="text-green-500 flex-shrink-0" />
                Envoyer sur WhatsApp
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}