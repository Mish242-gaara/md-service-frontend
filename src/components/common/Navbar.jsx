// =============================================
// MD SERVICE - Barre de Navigation
// =============================================
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Building2, Car, Phone, Shield } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',             label: 'Accueil',      icon: Home },
  { to: '/appartements', label: 'Appartements', icon: Building2 },
  { to: '/voitures',     label: 'Voitures',     icon: Car },
  { to: '/contact',      label: 'Contact',      icon: Phone },
];

// Logo MD Service SVG inline (reprend les couleurs du vrai logo)
const MDLogo = ({ size = 40 }) => (
  <div style={{ width: size, height: size }} className="shrink-0">
    <img src="/logo-md-service.jpg" alt="MD Service" style={{ width: size, height: size, objectFit: 'contain', borderRadius: 8 }} />
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/96 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo + Nom */}
            <Link to="/" className="flex items-center gap-2.5">
              <MDLogo size={38} />
              <div className="leading-tight">
                <span className="block text-lg font-bold text-dark" style={{fontFamily:'Syne'}}>
                  MD Service
                </span>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wider">
                  Agence Immobilière
                </span>
              </div>
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-blue'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* CTA desktop */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-xl
                           hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Burger mobile */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-white shadow-xl rounded-b-3xl md:hidden"
          >
            <div className="p-6 space-y-2">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon size={20} /> {label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp w-full justify-center"
                >
                  Contacter sur WhatsApp
                </a>
              </div>
              <Link to="/admin" className="flex items-center gap-2 text-gray-400 text-xs justify-center pt-2">
                <Shield size={12} /> Espace Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16 md:h-20" />
    </>
  );
}
