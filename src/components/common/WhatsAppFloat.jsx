// =============================================
// MD SERVICE - Bouton WhatsApp Flottant
// src/components/common/WhatsAppFloat.jsx
// =============================================
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [visible, setVisible]   = useState(false);
  const [tooltip, setTooltip]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const waNumber = process.env.REACT_APP_WHATSAPP || '242064149149';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    'Bonjour MD Service ! Je souhaite avoir des informations sur vos biens.'
  )}`;

  // Afficher après 3 secondes
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Afficher le tooltip après 5 secondes
  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setTooltip(true), 5000);
    const t2 = setTimeout(() => setTooltip(false), 9000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [visible, dismissed]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

      {/* Tooltip bulle */}
      <AnimatePresence>
        {tooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl
                       border border-gray-100 dark:border-gray-700
                       px-4 py-3 max-w-[220px] mr-2"
          >
            {/* Flèche */}
            <div className="absolute -right-2 bottom-4 w-4 h-4 overflow-hidden">
              <div className="w-3 h-3 bg-white dark:bg-gray-800 rotate-45
                              border-r border-b border-gray-100 dark:border-gray-700
                              translate-x-0.5" />
            </div>
            <button
              onClick={() => setTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 dark:bg-gray-700
                         rounded-full flex items-center justify-center
                         text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={10} />
            </button>
            <p className="text-xs font-semibold text-gray-800 dark:text-white mb-0.5">
              Besoin d'aide ?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Réponse garantie en moins d'1 heure 🕐
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="relative"
      >
        {/* Anneau pulsant */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-25" />

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Contacter MD Service sur WhatsApp"
          className="relative flex items-center justify-center w-14 h-14
                     bg-green-500 hover:bg-green-600 rounded-full
                     shadow-lg hover:shadow-xl hover:shadow-green-300/40
                     dark:hover:shadow-green-900/40
                     transition-all duration-300 hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
        </a>
      </motion.div>
    </div>
  );
}
