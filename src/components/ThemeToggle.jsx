import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Bouton toggle thème clair / sombre.
 * Place-le dans ta Navbar :  <ThemeToggle />
 *
 * @param {string}  className  - classes Tailwind supplémentaires (optionnel)
 * @param {string}  size       - 'sm' | 'md' (défaut)
 */
export default function ThemeToggle({ className = '', size = 'md' }) {
  const { isDark, toggleTheme } = useTheme();

  const dim = size === 'sm'
    ? 'w-8 h-8'
    : 'w-10 h-10';

  const iconSize = size === 'sm' ? 15 : 18;

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className={`
        relative ${dim} rounded-full flex items-center justify-center
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-gray-500 dark:text-gray-400
        hover:bg-gray-100 dark:hover:bg-gray-700
        hover:text-primary-600 dark:hover:text-yellow-400
        hover:border-primary-300 dark:hover:border-gray-500
        transition-colors duration-200 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        ${className}
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate:  90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute flex items-center justify-center text-yellow-400"
          >
            <Sun size={iconSize} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute flex items-center justify-center text-gray-500"
          >
            <Moon size={iconSize} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
