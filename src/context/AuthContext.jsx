// =============================================
// MD SERVICE - Contexte Authentification Admin
// =============================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au démarrage, vérifier si un token valide existe
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('mds_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await authAPI.me();
        setAdmin(data.admin);
      } catch {
        localStorage.removeItem('mds_token');
        localStorage.removeItem('mds_admin');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await authAPI.login(email, password);
    localStorage.setItem('mds_token', data.token);
    localStorage.setItem('mds_admin', JSON.stringify(data.admin));
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('mds_token');
    localStorage.removeItem('mds_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuth: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
