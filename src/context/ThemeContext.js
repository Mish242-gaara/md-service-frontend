import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Préférence sauvegardée
    const saved = localStorage.getItem('mds-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // 2. Préférence système de l'utilisateur
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement; // <html>

    // Bloquer les transitions pendant le switch pour éviter le flash
    root.classList.add('no-transition');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('mds-theme', theme);

    // Réactiver les transitions après un tick
    const timer = setTimeout(() => root.classList.remove('no-transition'), 50);
    return () => clearTimeout(timer);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook custom
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé dans <ThemeProvider>');
  return ctx;
}
