// =============================================
// MD SERVICE - Admin - Gestion des Réservations (CORRIGÉ)
// =============================================
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, Building2, Car, Phone, Clock,
  Trash2, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import { reservationsAPI, formatPrice } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const STATUSES = [
  { val: 'en_attente', label: 'En attente', color: 'badge-pending' },
  { val: 'confirmée',  label: 'Confirmée',  color: 'badge-available' },
  { val: 'annulée',    label: 'Annulée',    color: 'bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full' },
  { val: 'terminée',   label: 'Terminée',   color: 'bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full' },
];

function ReservationCard({ reservation, onStatusChange, onDelete }) {
  // CORRECTION : Extraction des champs à plat selon ton modèle Sequelize
  const { 
    id, // Sequelize utilise 'id' par défaut, pas '_id'
    clientName, 
    clientPhone, 
    clientEmail, 
    type, 
    listingTitle, 
    startDate, 
    endDate, 
    durationValue, 
    durationUnit,
    totalPrice, 
    currency, 
    status, 
    message, 
    createdAt 
  } = reservation;

  const statusInfo = STATUSES.find(s => s.val === status) || STATUSES[0];
  const [showActions, setShowActions] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // CORRECTION : Utilisation de clientName et clientPhone directement
  const waMsg = `Bonjour ${clientName || 'Cher client'} ! Votre réservation "${listingTitle}" est confirmée. Merci de nous avoir choisi - MD Service 🏠`;
  const waUrl = `https://wa.me/${clientPhone?.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-card p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            type === 'apartment' ? 'bg-primary-100' : 'bg-amber-100'
          }`}>
            {type === 'apartment'
              ? <Building2 size={18} className="text-primary-600" />
              : <Car size={18} className="text-amber-600" />
            }
          </div>
          <div>
            <p className="font-semibold text-dark text-sm">{listingTitle || '—'}</p>
            <p className="text-xs text-gray-400">
              {type === 'apartment' ? 'Appartement' : 'Voiture'}
            </p>
          </div>
        </div>
        <span className={statusInfo.color}>{statusInfo.label}</span>
      </div>

      {/* Client : CORRIGÉ (Lecture directe) */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-1">
        <p className="font-medium text-dark text-sm">{clientName || 'Client inconnu'}</p>
        <div className="flex items-center gap-2">
          <Phone size={13} className="text-primary-500" />
          <a href={`tel:${clientPhone}`} className="text-sm text-primary-600 hover:underline">
            {clientPhone || 'Pas de numéro'}
          </a>
        </div>
        {clientEmail && <p className="text-xs text-gray-400">{clientEmail}</p>}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <p className="text-gray-400 text-xs mb-1">Date début</p>
          <p className="font-medium">{startDate ? new Date(startDate).toLocaleDateString('fr-FR') : '—'}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Date fin</p>
          <p className="font-medium">{endDate ? new Date(endDate).toLocaleDateString('fr-FR') : '—'}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Durée</p>
          <p className="font-medium">{durationValue || 0} {durationUnit || 'jours'}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Total estimé</p>
          <p className="font-bold text-primary-700">
            {totalPrice ? formatPrice(totalPrice, currency) : '—'}
          </p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-yellow-50 rounded-xl p-3 mb-4 text-sm text-gray-700">
          <p className="text-xs text-gray-400 mb-1">Message du client :</p>
          {message}
        </div>
      )}

      {/* Date réception */}
      <p className="text-xs text-gray-400 mb-4">
        <Clock size={12} className="inline mr-1" />
        Reçu le {new Date(createdAt).toLocaleDateString('fr-FR', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-green-50 text-green-700 text-xs font-semibold px-3 py-2
                     rounded-xl text-center hover:bg-green-100 transition-all"
        >
          WhatsApp
        </a>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-primary-50
                       text-primary-700 text-xs font-semibold hover:bg-primary-100 transition-all"
          >
            Statut <ChevronDown size={14} />
          </button>
          {showActions && (
            <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl
                            border border-gray-100 overflow-hidden z-10 min-w-[140px]">
              {STATUSES.map(s => (
                <button
                  key={s.val}
                  onClick={() => { onStatusChange(id, s.val); setShowActions(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 transition-colors
                              ${status === s.val ? 'bg-primary-50 font-bold text-primary-700' : 'text-gray-700'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={async () => {
            if (!window.confirm('Supprimer cette réservation ?')) return;
            setDeleting(true);
            await onDelete(id);
            setDeleting(false);
          }}
          disabled={deleting}
          className="p-2 rounded-xl text-red-400 hover:bg-red-50 transition-all disabled:opacity-40"
        >
          {deleting ? (
            <span className="animate-spin block w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full" />
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (filterStatus) params.status = filterStatus;
      if (filterType) params.type = filterType;
      const { data } = await reservationsAPI.getAll(params);
      
      // Sequelize retourne les données dans rows/count ou directement selon ton API
      setReservations(data.reservations || []);
      setPagination(data.pagination || {});
    } catch (err) {
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, [page, filterStatus, filterType]);

  const handleStatusChange = async (id, status) => {
    try {
      await reservationsAPI.updateStatus(id, status);
      setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      toast.success(`Statut mis à jour : ${status}`);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id) => {
    try {
      await reservationsAPI.delete(id);
      setReservations(prev => prev.filter(r => r.id !== id));
      toast.success('Réservation supprimée');
    } catch (err) {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <AdminLayout title="Réservations">
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
          className="input-field w-auto"
        >
          <option value="">Tous les statuts</option>
          {STATUSES.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
        </select>

        <select
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setPage(1); }}
          className="input-field w-auto"
        >
          <option value="">Tous types</option>
          <option value="apartment">Appartements</option>
          <option value="car">Voitures</option>
        </select>

        <span className="text-gray-400 text-sm self-center">
          {pagination.total || 0} réservation(s)
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
        </div>
      ) : reservations.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-card">
          <CalendarCheck size={48} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">Aucune réservation</h3>
          <p className="text-gray-400 text-sm">Les demandes de réservation apparaîtront ici</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
            {reservations.map(r => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button 
                onClick={() => setPage(p => p - 1)} 
                disabled={page === 1} 
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                ← Précédent
              </button>
              <span className="text-sm text-gray-500">{page} / {pagination.totalPages}</span>
              <button 
                onClick={() => setPage(p => p + 1)} 
                disabled={page === pagination.totalPages} 
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50"
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}