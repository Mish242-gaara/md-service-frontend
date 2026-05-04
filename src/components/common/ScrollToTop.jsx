// =============================================
// LOKEA - Utilitaires UI partagés
// =============================================
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ── Scroll to top à chaque changement de route ──
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
