// =============================================
// MD SERVICE - Context Favoris
// src/context/FavoritesContext.js
// =============================================
import { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const favoritesData = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext doit être dans <FavoritesProvider>');
  return ctx;
}