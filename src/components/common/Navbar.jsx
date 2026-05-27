// =============================================
// MD SERVICE - Navbar complète (Favoris & Admin)
// src/components/common/Navbar.jsx
// =============================================
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Building2, Car, Phone, Info, Home, Lock, Heart 
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

// Configuration des liens de navigation
const links = [
  { to: '/',            label: 'Accueil',      icon: Home      },
  { to: '/appartements', label: 'Appartements', icon: Building2 },
  { to: '/voitures',     label: 'Voitures',     icon: Car       },
  { to: '/favoris',      label: 'Mes Favoris',  icon: Heart     }, // Ajout des favoris
  { to: '/a-propos',     label: 'À propos',     icon: Info      },
  { to: '/contact',      label: 'Contact',      icon: Phone     },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile au changement de page
  useEffect(() => { 
    setOpen(false); 
  }, [location]);

  // Gestion du scroll pour l'effet de transparence/ombre
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const waNumber = process.env.REACT_APP_WHATSAPP || '242064149149';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent('Bonjour MD Service ! Je souhaite avoir des informations.')}`;

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border-b border-gray-100 dark:border-gray-800
        ${scrolled ? 'shadow-md dark:shadow-gray-900/50 py-1' : 'py-2'}`}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 bg-white">
                <img 
                  src="/logo-md-service.jpg" 
                  alt="MD Service Logo" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-base text-gray-900 dark:text-white
                                  tracking-tight" style={{ fontFamily: 'Syne' }}>
                  MD <span className="text-primary-600">Service</span>
                </span>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium
                                leading-none hidden sm:block uppercase tracking-wider">
                  Pointe-Noire
                </p>
              </div>
            </Link>

            {/* Liens desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${isActive
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Actions desktop */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              
              {/* Petit séparateur */}
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              <Link 
                to="/login" 
                className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                title="Espace Admin"
              >
                <Lock size={18} />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600
                           text-white text-sm font-bold px-4 py-2.5 rounded-xl
                           transition-all duration-200 hover:shadow-lg hover:shadow-green-200
                           dark:hover:shadow-green-900/30 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Mobile — ThemeToggle + Burger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setOpen(o => !o)}
                aria-label="Menu"
                className="p-2 rounded-xl text-gray-600 dark:text-gray-400
                           hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72
                         bg-white dark:bg-gray-900
                         border-l border-gray-100 dark:border-gray-800
                         shadow-2xl md:hidden flex flex-col"
            >
              {/* Header Menu Mobile */}
              <div className="flex items-center justify-between px-5 py-5
                              border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                   <img src="/logo-md-service.jpg" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
                   <span className="font-bold text-gray-900 dark:text-white"
                        style={{ fontFamily: 'Syne' }}>
                    MD <span className="text-primary-600">Service</span>
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-gray-500 dark:text-gray-400
                             hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Liens principaux Mobile */}
              <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                {links.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold
                       transition-all duration-200
                       ${isActive
                         ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shadow-sm shadow-primary-500/10'
                         : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                       }`
                    }
                  >
                    <Icon size={20} className={location.pathname === to ? "text-primary-600 dark:text-primary-400" : "text-gray-400"} />
                    {label}
                  </NavLink>
                ))}
              </nav>

              {/* Pied du menu mobile - WhatsApp & Administration */}
              <div className="p-4 space-y-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3
                             bg-green-500 hover:bg-green-600 text-white
                             font-bold py-4 rounded-xl transition-all w-full shadow-lg shadow-green-500/20 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  Nous contacter
                </a>

                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold
                             text-gray-400 dark:text-gray-500 hover:text-primary-600 
                             dark:hover:text-primary-400 transition-colors uppercase tracking-[0.2em]"
                >
                  <Lock size={12} />
                  Espace Admin
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}