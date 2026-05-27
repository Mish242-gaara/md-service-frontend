// =============================================
// MD SERVICE - Barre de garanties
// src/components/home/GuaranteesBar.jsx
// =============================================
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, ThumbsUp, HeadphonesIcon } from 'lucide-react';

const guarantees = [
  {
    icon: Shield,
    title: 'Biens vérifiés',
    desc: 'Chaque annonce est inspectée personnellement',
  },
  {
    icon: Clock,
    title: 'Réponse en 1h',
    desc: 'Disponible 24h/24, 7j/7 sur WhatsApp',
  },
  {
    icon: ThumbsUp,
    title: 'Prix transparents',
    desc: 'Aucun frais caché, tarifs affichés nets',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support dédié',
    desc: 'Un interlocuteur unique pour votre location',
  },
];

export default function GuaranteesBar() {
  return (
    <section className="bg-gray-900 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {guarantees.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="w-10 h-10 bg-primary-600/20 rounded-xl
                              flex items-center justify-center mb-1">
                <Icon size={20} className="text-primary-400" />
              </div>
              <div className="font-bold text-white text-sm">{title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
