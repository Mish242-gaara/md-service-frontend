/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Active le dark mode via la classe "dark" sur <html>
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // ── Couleurs "primary" utilisées dans tout le CSS ──
        // (bg-primary-600, text-primary-600, etc.)
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',  // ← couleur principale du thème-color meta
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3058',
        },

        // ── text-dark utilisé dans section-title ──
        dark: '#0f172a',

        // ── Couleurs MD Service (logo : bleu marine + teal) ──
        navy: {
          50:  '#f0f4f8',
          100: '#d9e4f0',
          400: '#3B6FA0',
          500: '#254D78',
          600: '#1B3A5C',
          700: '#142d48',
          800: '#0e2035',
          900: '#0a1828',
        },
        teal: {
          400: '#3AADA0',
          500: '#2A8B7F',
          600: '#1E6B61',
        },
      },

      boxShadow: {
        // ── shadow-card et shadow-card-hover utilisés dans .card ──
        card:       '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.14)',

        // ── shadow-blue utilisé dans .btn-primary ──
        blue: '0 4px 20px rgba(29, 78, 216, 0.35)',
      },

      fontFamily: {
        sans:  ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        syne:  ['Syne', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
