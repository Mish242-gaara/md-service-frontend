// =============================================
// MD SERVICE - Page Connexion Admin
// =============================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Remplissez tous les champs');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Connexion réussie !');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-dark
                    dark:from-black dark:via-gray-950 dark:to-primary-950
                    flex items-center justify-center p-4 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-white/10 dark:border-white/5 transition-colors">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src="/logo-md-service.jpg" 
              alt="MD Service" 
              className="w-20 h-20 object-contain rounded-2xl mx-auto mb-4 shadow-xl border border-gray-100 dark:border-gray-800" 
            />
            <h1 className="text-2xl font-bold text-dark dark:text-white" style={{ fontFamily: 'Syne' }}>
              Espace Admin
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">MD Service · Connexion sécurisée</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@md-service.com"
                  className="input-field pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2 py-3.5 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <Shield size={18} />
              )}
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 dark:border-gray-800 pt-6">
            <a href="/" className="text-gray-400 text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center justify-center gap-2">
              <span>←</span> Retour au site MD Service
            </a>
          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-white/30 dark:text-white/10 text-[10px] mt-8 uppercase tracking-[0.2em]">
          Système de gestion MD Service v4.0
        </p>
      </motion.div>
    </div>
  );
}