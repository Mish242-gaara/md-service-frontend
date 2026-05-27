// =============================================
// LOKEA - Point d'entrée React
// =============================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext'; // ← ajouter


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>  {/* ← wrapper ici */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);






