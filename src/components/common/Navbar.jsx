// =============================================
// MD SERVICE - Barre de Navigation (Version Premium 2026)
// =============================================
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Building2, Car, Phone, Shield, MessageSquare } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',         label: 'Accueil',      icon: Home },
  { to: '/appartements', label: 'Appartements', icon: Building2 },
  { to: '/voitures',     label: 'Voitures',     icon: Car },
  { to: '/contact',      label: 'Contact',      icon: Phone },
];

// Logo MD Service optimisé
const MDLogo = ({ scrolled }) => (
  <div className="flex items-center gap-2.5 group">
    <div className={`relative shrink-0 transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
      <img 
        src="/logo-md-service.jpg" 
        alt="MD Service" 
        className="w-10 h-10 object-contain rounded-xl shadow-lg group-hover:rotate-6 transition-transform"
      />
    </div>
    <div className="leading-tight">
      <span className={`block text-lg font-bold transition-colors ${scrolled ? 'text-dark' : 'text-white'}`} style={{fontFamily:'Syne'}}>
        MD Service
      </span>
      <span className={`block text-[10px] uppercase tracking-wider transition-colors ${scrolled ? 'text-gray-400' : 'text-white/60'}`}>
        Agence Immobilière
      </span>
    </div>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile lors du changement de page
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Gestion du scroll pour l'effet flottant
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 lg:px-8 ${
        scrolled ? 'top-4' : 'top-0'
      }`}>
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-white/20 py-2' 
            : 'bg-transparent py-6'
        }`}>
          <div className="flex items-center justify-between px-4">

            {/* Logo */}
            <Link to="/">
              <MDLogo scrolled={scrolled} />
            </Link>

            {/* Nav Desktop - Style Pilule */}
            <nav className="hidden md:flex items-center gap-1 bg-black/5 p-1 rounded-2xl backdrop-blur-sm">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 scale-105'
                        : scrolled 
                          ? 'text-gray-600 hover:text-primary-600 hover:bg-white/50' 
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Actions Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-105 active:scale-95 ${
                  scrolled 
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/20' 
                    : 'bg-white text-primary-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare size={18} />
                WhatsApp
              </a>
            </div>

            {/* Bouton Mobile */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className={`md:hidden p-2.5 rounded-xl transition-colors ${
                scrolled ? 'text-dark hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile - Overlay Glassmorphism */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl md:hidden border border-gray-100 overflow-hidden"
          >
            <div className="p-6 space-y-3">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                      isActive 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <div className={`p-2 rounded-lg ${location.pathname === to ? 'bg-white/20' : 'bg-gray-100'}`}>
                    <Icon size={20} />
                  </div>
                  {label}
                </NavLink>
              ))}
              
              <div className="pt-4 space-y-4">
                <a
                  href={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors"
                >
                  <MessageSquare size={20} />
                  Réservation Rapide
                </a>
                
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 text-gray-400 text-xs justify-center py-2 hover:text-primary-600 transition-colors"
                >
                  <Shield size={14} /> Espace Administration
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer pour éviter que le contenu ne passe sous la navbar au début */}
      <div className="h-4" />
    </>
  );
}