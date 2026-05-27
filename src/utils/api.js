// =============================================
// MD SERVICE - Configuration Axios & API helpers
// =============================================
import axios from 'axios';

// Configuration des URLs (Onrender)
const API_URL = 'https://md-service-backend.onrender.com/api';
export const UPLOADS_URL = 'https://md-service-backend.onrender.com';

// Instance axios configurée
export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Injecter le token JWT dans chaque requête pour les routes protégées
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mds_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer les erreurs de réponse (notamment 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expirée ou non autorisée");
      localStorage.removeItem('mds_token');
      localStorage.removeItem('mds_admin');
      
      // Éviter la redirection si on est déjà sur la page login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Helpers image ──────────────────────────────
export const getImageUrl = (url) => {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  // S'assurer qu'il n'y a pas de double slash
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${UPLOADS_URL}${cleanUrl}`;
};

// ── Formatage prix (XAF) ────────────────────────
export const formatPrice = (amount, currency = 'XAF') => {
  if (!amount && amount !== 0) return 'Prix à définir';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

// ── WhatsApp URL ───────────────────────────────
export const getWhatsAppUrl = (message = '') => {
  // Numéro mis à jour selon votre composant Navbar
  const number = '242068758827'; // Remplacez par votre numéro WhatsApp complet (sans espaces ni tirets)
  const encoded = encodeURIComponent(message || 'Bonjour MD Service !');
  return `https://wa.me/${number}?text=${encoded}`;
};

// ── API Appartements ───────────────────────────
export const apartmentsAPI = {
  getAll: (params) => api.get('/apartments', { params }),
  getFeatured: () => api.get('/apartments/featured'),
  getById: (id) => api.get(`/apartments/${id}`),
  create: (data) => api.post('/apartments', data),
  update: (id, data) => api.put(`/apartments/${id}`, data),
  toggleAvailability: (id, isAvailable) =>
    api.patch(`/apartments/${id}/availability`, { isAvailable }),
  delete: (id) => api.delete(`/apartments/${id}`),
};

// ── API Voitures ───────────────────────────────
export const carsAPI = {
  getAll: (params) => api.get('/cars', { params }),
  getFeatured: () => api.get('/cars/featured'),
  getById: (id) => api.get(`/cars/${id}`),
  create: (data) => api.post('/cars', data),
  update: (id, data) => api.put(`/cars/${id}`, data),
  toggleAvailability: (id, isAvailable) =>
    api.patch(`/cars/${id}/availability`, { isAvailable }),
  delete: (id) => api.delete(`/cars/${id}`),
};

// ── API Réservations ───────────────────────────
export const reservationsAPI = {
  create: (data) => api.post('/reservations', data),
  getAll: (params) => api.get('/reservations', { params }),
  getById: (id) => api.get(`/reservations/${id}`),
  updateStatus: (id, status, adminNotes) =>
    api.patch(`/reservations/${id}/status`, { status, adminNotes }),
  delete: (id) => api.delete(`/reservations/${id}`),
};

// ── API Auth ───────────────────────────────────
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// ── API Upload ─────────────────────────────────
export const uploadAPI = {
  images: (formData) =>
    api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  video: (formData) =>
    api.post('/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (type, filename) => api.delete(`/upload/${type}/${filename}`),
};

// ── API Stats & Recherche ──────────────────────
export const statsAPI = {
  get: () => api.get('/stats'),
};

export const searchAPI = {
  global: (query) => api.get('/search', { params: { q: query } }),
};

// ── API Favoris (Optionnel) ─────────────────────
// Si vous décidez de sauvegarder les favoris sur le compte utilisateur
export const favoritesAPI = {
  get: () => api.get('/favorites'),
  add: (type, id) => api.post('/favorites', { type, id }),
  remove: (id) => api.delete(`/favorites/${id}`),
};

export default api;