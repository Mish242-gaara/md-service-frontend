// =============================================
// MD SERVICE - Hook Favoris (localStorage)
// src/hooks/useFavorites.js
// =============================================
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'mds_favorites';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function save(favs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

/**
 * Hook favoris — stockage localStorage, aucun compte requis.
 *
 * Usage :
 *   const { favorites, isFav, toggle, count } = useFavorites();
 *   toggle({ id: '123', type: 'apartment', title: '...', ... });
 *   isFav('123', 'apartment') // → true | false
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  const isFav = useCallback(
    (id, type) => favorites.some(f => f.id === String(id) && f.type === type),
    [favorites]
  );

  const toggle = useCallback((item) => {
    const key = String(item.id || item._id);
    setFavorites(prev => {
      const exists = prev.some(f => f.id === key && f.type === item.type);
      const next = exists
        ? prev.filter(f => !(f.id === key && f.type === item.type))
        : [
            ...prev,
            {
              id:       key,
              type:     item.type,           // 'apartment' | 'car'
              title:    item.title,
              price:    item.pricePerNight ?? item.pricing?.perDay ?? item.price,
              currency: item.currency ?? 'XAF',
              location: item.location,
              image:    item.images?.[0]?.url ?? null,
              addedAt:  Date.now(),
            },
          ];
      save(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setFavorites([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    favorites,
    isFav,
    toggle,
    clear,
    count: favorites.length,
  };
}