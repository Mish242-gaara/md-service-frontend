// =============================================
// MD SERVICE - Footer
// src/components/common/Footer.jsx
// =============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Car, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

const WaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
);

export default function Footer() {
  const waNumber = process.env.REACT_APP_WHATSAPP || '242064149149';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Bonjour MD Service !')}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">

      {/* Bande supérieure — CTA */}
      

      {/* Corps du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Colonne 1 — Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <Building2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-white text-lg"
                    style={{ fontFamily: 'Syne' }}>
                MD <span className="text-primary-400">Service</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Votre agence immobilière et location de véhicules de confiance à
              Pointe-Noire, République du Congo.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-800 dark:bg-gray-800 hover:bg-green-600
                           rounded-lg flex items-center justify-center
                           text-gray-400 hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <WaIcon />
              </a>
              <a
                href="mailto:emoukouanga@gmail.com"
                className="w-9 h-9 bg-gray-800 hover:bg-primary-600
                           rounded-lg flex items-center justify-center
                           text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { to: '/',             label: 'Accueil'      },
                { to: '/appartements', label: 'Appartements' },
                { to: '/voitures',     label: 'Voitures'     },
                { to: '/a-propos',     label: 'À propos'     },
                { to: '/contact',      label: 'Contact'      },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-white text-sm
                               transition-colors duration-200 hover:translate-x-1
                               inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Services */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Nos Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { icon: Building2, label: 'Location d\'appartements' },
                { icon: Building2, label: 'Location de villas'       },
                { icon: Car,       label: 'Location de voitures'     },
                { icon: Car,       label: 'Location avec chauffeur'  },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon size={13} className="text-primary-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Pointe-Noire,<br />République du Congo
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-primary-400 flex-shrink-0" />
                <a
                  href={`tel:+${waNumber}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  +{waNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:emoukouanga@gmail.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  emoukouanga@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Disponible 7j/7<br />
                  <span className="text-green-400 font-medium">● Réponse en 1h</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barre de bas */}
      <div className="border-t border-gray-800 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              © {year} MD Service. Tous droits réservés.
            </p>
            <p className="text-gray-600 text-xs flex items-center gap-1.5">
              Fait avec <Heart size={11} className="text-red-500 fill-current" /> à Pointe-Noire
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
