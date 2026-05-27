// =============================================
// LOKEA - Formulaire de Réservation (CORRIGÉ SEQUELIZE + DARK MODE)
// =============================================
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { reservationsAPI, getWhatsAppUrl, formatPrice } from '../../utils/api';

export default function BookingForm({ listing, type }) {
  const [form, setForm] = useState({
    name: '', 
    phone: '', 
    email: '',
    startDate: '', 
    endDate: '', 
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pricePerDay = type === 'apartment'
    ? listing.pricePerNight
    : listing.pricing?.perDay;

  const calcTotal = () => {
    if (!form.startDate || !form.endDate) return null;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) return null;
    return { days, total: days * pricePerDay };
  };

  const totalInfo = calcTotal();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.startDate || !form.endDate) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (new Date(form.endDate) <= new Date(form.startDate)) {
      toast.error('La date de fin doit être après la date de début');
      return;
    }

    setLoading(true);
    try {
      const reservationData = {
        type: type,
        listingId: parseInt(listing.id || listing._id),
        listingModel: type === 'car' ? 'Car' : 'Apartment',
        listingTitle: listing.title,
        clientName: form.name,
        clientPhone: form.phone,
        clientEmail: form.email || '',
        startDate: form.startDate,
        endDate: form.endDate,
        message: form.message,
        totalPrice: totalInfo ? totalInfo.total : 0,
        durationValue: totalInfo ? totalInfo.days : 0,
        durationUnit: 'jours',
        currency: listing.currency || 'XAF'
      };

      await reservationsAPI.create(reservationData);
      setSuccess(true);
      toast.success('Demande envoyée ! Nous vous contactons bientôt.');
    } catch (err) {
      console.error("Erreur API détaillée:", err.response?.data);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  const waMessage = `Bonjour Lokea ! 👋
Je souhaite réserver : *${listing.title}*
📅 Du : ${form.startDate || '...'}
📅 Au : ${form.endDate || '...'}
👤 Nom : ${form.name || '...'}
📞 Tel : ${form.phone || '...'}`;

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
      >
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">Demande envoyée !</h3>
        <p className="text-green-600 dark:text-green-300/80 mb-6">
          Nous allons vous contacter très prochainement pour confirmer votre réservation.
        </p>
        <a href={getWhatsAppUrl(waMessage)} target="_blank" rel="noreferrer" className="btn-whatsapp inline-flex">
          Confirmer sur WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 border border-transparent dark:border-gray-700 transition-colors">
      <h3 className="text-xl font-bold text-dark dark:text-white mb-1">Réserver maintenant</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Réponse garantie sous 1h</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Votre nom *
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jean Mabiala"
              className="input-field pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              required
            />
          </div>
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Téléphone * <span className="text-gray-400">(WhatsApp)</span>
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+242 06 XXX XX XX"
              className="input-field pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Début *
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fin *
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              min={form.startDate || new Date().toISOString().split('T')[0]}
              className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        {/* Total calculé */}
        {totalInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl p-4"
          >
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>{formatPrice(pricePerDay, listing.currency)} × {totalInfo.days} j</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-dark dark:text-white">Total estimé</span>
              <span className="text-primary-700 dark:text-primary-400 font-bold text-lg">
                {formatPrice(totalInfo.total, listing.currency)}
              </span>
            </div>
          </motion.div>
        )}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message (optionnel)
          </label>
          <div className="relative">
            <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Précisez vos besoins..."
              rows={2}
              className="input-field pl-10 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* Boutons */}
        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={loading || !listing.isAvailable}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 shadow-lg shadow-primary-600/20"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <Send size={18} />
            )}
            {!listing.isAvailable ? 'Déjà réservé' : loading ? 'Envoi...' : 'Réserver par Email'}
          </button>

          <a
            href={getWhatsAppUrl(waMessage)}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp w-full justify-center py-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.564 4.14 1.54 5.876L.057 23.569a.75.75 0 00.921.921l5.662-1.498A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.96-1.362l-.355-.212-3.683.974.985-3.6-.232-.369A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            Réserver par WhatsApp
          </a>
        </div>
      </form>
    </div>
  );
}