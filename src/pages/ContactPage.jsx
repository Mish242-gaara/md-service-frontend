// =============================================
// MD SERVICE - Page Contact
// =============================================
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../utils/api';

export default function ContactPage() {
  React.useEffect(() => { document.title = 'Contact - MD Service'; }, []);

  const contacts = [
    { icon: Phone, label: 'Téléphone', val: `+${process.env.REACT_APP_WHATSAPP || '242 06 414 91 49'}`, href: `tel:+${process.env.REACT_APP_WHATSAPP}` },
    { icon: Mail, label: 'Email', val: 'emoukouanga@gmail.com', href: 'mailto:emoukouanga@gmail.com' },
    { icon: MapPin, label: 'Adresse', val: 'Pointe-Noire, Congo-Brazzaville', href: null },
    { icon: Clock, label: 'Horaires', val: '7j/7 · 24h/24', href: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-3">Contactez-nous</h1>
            <p className="text-white/70 text-lg">Nous répondons sous 1 heure</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Infos contact */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-dark mb-6">Nos coordonnées</h2>
            {contacts.map(({ icon: Icon, label, val, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="text-primary-600" size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-dark hover:text-primary-600 transition-colors">
                      {val}
                    </a>
                  ) : (
                    <p className="font-semibold text-dark">{val}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-card p-8 flex flex-col items-center justify-center text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="text-green-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-dark mb-3">WhatsApp</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Le moyen le plus rapide pour nous joindre. Réponse garantie en moins d'une heure,
              même le weekend.
            </p>
            <a
              href={getWhatsAppUrl('Bonjour MD Service ! Je souhaite avoir des informations.')}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp whatsapp-pulse text-lg px-8 py-4"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              Ouvrir WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
