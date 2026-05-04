// =============================================
// MD SERVICE - Footer
// =============================================
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-md-service.jpg" alt="MD Service" className="w-12 h-12 object-contain rounded-xl" />
              <div>
                <p className="text-white font-bold text-xl" style={{fontFamily:'Syne'}}>MD Service</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Votre Agence Immobilière</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Spécialiste de la location d'appartements et de voitures à Pointe-Noire.
              Service rapide, prix transparents, disponible 7j/7.
            </p>
            <a
              href={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-all text-sm"
            >
              Nous contacter sur WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-3">
              {[['/', 'Accueil'], ['/appartements', 'Appartements'], ['/voitures', 'Voitures'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary-500 rounded-full" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                Pointe-Noire, Congo-Brazzaville
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-primary-400 shrink-0" />
                <a href={`tel:+${process.env.REACT_APP_WHATSAPP}`} className="hover:text-white transition-colors">
                  +{process.env.REACT_APP_WHATSAPP}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-primary-400 shrink-0" />
                emoukouanga@gmail.com
              </li>
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">Disponibilité</p>
              <p className="text-sm text-green-400 font-semibold">7j/7 · 24h/24</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {year} MD Service. Tous droits réservés.</p>
          <Link to="/admin" className="flex items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors text-xs">
            <Shield size={12} /> Espace administrateur
          </Link>
        </div>
      </div>
    </footer>
  );
}
