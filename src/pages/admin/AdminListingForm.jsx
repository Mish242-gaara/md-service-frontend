// =============================================
// MD SERVICE - Formulaire Admin - Créer/Modifier annonce
// =============================================
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload, X, Image, Video, Save, ArrowLeft,
  Building2, Car, Plus, Loader
} from 'lucide-react';
import toast from 'react-hot-toast';
import { apartmentsAPI, carsAPI, uploadAPI, getImageUrl } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

// ── Listes options ──────────────────────────────
const AMENITIES = ['WiFi', 'Climatisation', 'TV', 'Cuisine équipée', 'Parking', 'Piscine', 'Sécurité 24h', 'Balcon', 'Eau chaude', 'Générateur', 'Réfrigérateur', 'Micro-ondes'];
const CAR_FEATURES = ['Climatisation', 'GPS', 'Bluetooth', 'Caméra de recul', 'Régulateur de vitesse', 'Toit ouvrant', '4x4', 'USB', 'Chauffeur disponible', 'Livraison possible'];
const TRANSMISSIONS = ['Manuelle', 'Automatique'];
const FUELS = ['Essence', 'Diesel', 'Électrique', 'Hybride'];
const CURRENCIES = ['XAF', 'USD', 'EUR'];

// ── Composant upload images ─────────────────────
function ImageUploader({ images, onAdd, onRemove }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files.length) return;
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('images', f));
    setUploading(true);
    try {
      const { data } = await uploadAPI.images(formData);
      data.files.forEach(f => onAdd({ url: f.url, filename: f.filename }));
      toast.success(`${data.files.length} image(s) uploadée(s)`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div
        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center
                   hover:border-primary-400 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-primary-600">
            <Loader size={32} className="animate-spin" />
            <p className="text-sm">Upload en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Image size={32} />
            <p className="text-sm font-medium">Glisser-déposer ou cliquer pour ajouter des photos</p>
            <p className="text-xs">JPG, PNG, WEBP · Max 50MB chacune</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-square">
              <img
                src={getImageUrl(img.url)}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover rounded-xl"
                onError={e => { e.target.src = 'https://via.placeholder.com/200'; }}
              />
              {i === 0 && (
                <div className="absolute top-1 left-1 bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-lg">
                  Principale
                </div>
              )}
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg
                           opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Composant upload vidéo ──────────────────────
function VideoUploader({ video, onSet, onRemove }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('video', file);
    setUploading(true);
    try {
      const { data } = await uploadAPI.video(formData);
      onSet({ url: data.file.url, filename: data.file.filename });
      toast.success('Vidéo uploadée');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur upload vidéo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {video?.url ? (
        <div className="relative">
          <video src={getImageUrl(video.url)} controls className="w-full rounded-2xl max-h-52 bg-black" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-xl"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center
                     hover:border-primary-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={e => handleFile(e.target.files[0])}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-primary-600">
              <Loader size={28} className="animate-spin" />
              <p className="text-sm">Upload vidéo...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Video size={28} />
              <p className="text-sm">Ajouter une vidéo (optionnel)</p>
              <p className="text-xs">MP4, MOV, AVI · Max 50MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Checkbox multi-select ───────────────────────
function CheckboxGroup({ options, selected, onChange, cols = 2 }) {
  const toggle = (val) => {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  };
  return (
    <div className={`grid grid-cols-${cols} gap-2`}>
      {options.map(opt => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="rounded text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ── Page principale ──────────────────────────────
export default function AdminListingForm({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const isApt = type === 'apartment';
  
  // Utilisation d'une ref pour verrouiller l'appel API
  const hasFetched = useRef(false);

  const defaultForm = isApt ? {
    title: '', description: '', location: '', pricePerNight: '',
    currency: 'XAF', rooms: 1, bathrooms: 1, maxGuests: 2,
    amenities: [], images: [], video: null, isAvailable: true, featured: false,
  } : {
    title: '', brand: '', model: '', year: new Date().getFullYear(),
    description: '', pricing: { perDay: '', per2Days: '', per3Days: '', perWeek: '' },
    currency: 'XAF', transmission: 'Manuelle', fuel: 'Essence', seats: 5, color: '',
    features: [], images: [], video: null, isAvailable: true, featured: false,
  };

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  // ── Chargement des données (Correction radicale boucle infinie) ──
  useEffect(() => {
    // Si on n'est pas en mode édition ou si on a déjà chargé, on stoppe.
    if (!isEdit || hasFetched.current) return;

    const loadData = async () => {
      // On verrouille immédiatement avant l'appel
      hasFetched.current = true;
      const api = isApt ? apartmentsAPI : carsAPI;
      
      try {
        const { data } = await api.getById(id);
        if (data) {
          // Utilisation de la fonction de mise à jour pour éviter de dépendre de 'form'
          setForm(prev => ({ ...prev, ...data, id: id }));
        }
      } catch (err) {
        console.error("Erreur de récupération:", err);
        toast.error('Annonce introuvable');
        hasFetched.current = false; // Permettre de réessayer si l'appel échoue vraiment
      } finally {
        setFetchLoading(false);
      }
    };

    loadData();
    // On ne dépend que de l'ID pour éviter les triggers inutiles sur les props instables
  }, [id, isEdit]); 

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const setPricing = (key, val) => setForm(prev => ({
    ...prev, pricing: { ...prev.pricing, [key]: val }
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const api = isApt ? apartmentsAPI : carsAPI;
    try {
      if (isEdit) {
        await api.update(id, form);
        toast.success('Annonce mise à jour !');
      } else {
        await api.create(form);
        toast.success('Annonce créée !');
      }
      navigate(isApt ? '/admin/appartements' : '/admin/voitures');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const title = isEdit
    ? `Modifier ${isApt ? "l'appartement" : 'la voiture'}`
    : `Ajouter ${isApt ? 'un appartement' : 'une voiture'}`;

  if (fetchLoading) return (
    <AdminLayout title={title}>
      <div className="max-w-3xl mx-auto space-y-4">
        {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-100 animate-pulse h-24 rounded-2xl" />)}
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout title={title}>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} /> Retour
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section Infos de base */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-5 flex items-center gap-2">
              {isApt ? <Building2 size={18} className="text-primary-600" /> : <Car size={18} className="text-primary-600" />}
              Informations générales
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre *</label>
                <input
                  type="text"
                  value={form.title || ''}
                  onChange={e => set('title', e.target.value)}
                  placeholder={isApt ? 'Ex: Studio moderne quartier Lumumba' : 'Ex: Toyota RAV4 2022 – Climatisé'}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  required
                />
              </div>

              {!isApt && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Marque *</label>
                    <input type="text" value={form.brand || ''} onChange={e => set('brand', e.target.value)} placeholder="Toyota" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Modèle *</label>
                    <input type="text" value={form.model || ''} onChange={e => set('model', e.target.value)} placeholder="RAV4" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Année *</label>
                    <input type="number" value={form.year || ''} onChange={e => set('year', Number(e.target.value))} min="2000" max="2030" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" required />
                  </div>
                </div>
              )}

              {isApt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Localisation *</label>
                  <input type="text" value={form.location || ''} onChange={e => set('location', e.target.value)} placeholder="Quartier Lumumba, Pointe-Noire" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" required />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea
                  value={form.description || ''}
                  onChange={e => set('description', e.target.value)}
                  rows={5}
                  placeholder="Décrivez le logement/véhicule en détail..."
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tarification */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-5">💰 Tarification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Devise</label>
                <select value={form.currency} onChange={e => set('currency', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none">
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {isApt ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix / nuit (24h) *</label>
                  <input type="number" value={form.pricePerNight || ''} onChange={e => set('pricePerNight', Number(e.target.value))} placeholder="25000" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" required />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix / jour (24h) *</label>
                    <input type="number" value={form.pricing?.perDay || ''} onChange={e => setPricing('perDay', Number(e.target.value))} placeholder="35000" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix 48h (optionnel)</label>
                    <input type="number" value={form.pricing?.per2Days || ''} onChange={e => setPricing('per2Days', Number(e.target.value))} placeholder="65000" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix 72h (optionnel)</label>
                    <input type="number" value={form.pricing?.per3Days || ''} onChange={e => setPricing('per3Days', Number(e.target.value))} placeholder="90000" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix 7 jours (optionnel)</label>
                    <input type="number" value={form.pricing?.perWeek || ''} onChange={e => setPricing('perWeek', Number(e.target.value))} placeholder="200000" min="0" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-5">⚙️ Caractéristiques</h3>
            {isApt ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pièces</label>
                  <input type="number" value={form.rooms || 1} onChange={e => set('rooms', Number(e.target.value))} min="1" max="20" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Salles de bain</label>
                  <input type="number" value={form.bathrooms || 1} onChange={e => set('bathrooms', Number(e.target.value))} min="1" max="10" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pers. max</label>
                  <input type="number" value={form.maxGuests || 1} onChange={e => set('maxGuests', Number(e.target.value))} min="1" max="20" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Transmission</label>
                  <select value={form.transmission} onChange={e => set('transmission', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none">
                    {TRANSMISSIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Carburant</label>
                  <select value={form.fuel} onChange={e => set('fuel', e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none">
                    {FUELS.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Places</label>
                  <input type="number" value={form.seats || 5} onChange={e => set('seats', Number(e.target.value))} min="1" max="15" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Couleur</label>
                  <input type="text" value={form.color || ''} onChange={e => set('color', e.target.value)} placeholder="Blanc" className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
                </div>
              </div>
            )}
          </div>

          {/* Équipements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4">✅ {isApt ? 'Équipements' : 'Options'}</h3>
            <CheckboxGroup
              options={isApt ? AMENITIES : CAR_FEATURES}
              selected={isApt ? (form.amenities || []) : (form.features || [])}
              onChange={val => set(isApt ? 'amenities' : 'features', val)}
            />
          </div>

          {/* Médias */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-5">📸 Photos & Vidéo</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Photos ({form.images?.length || 0} / 10)
                </label>
                <ImageUploader
                  images={form.images || []}
                  onAdd={img => set('images', [...(form.images || []), img])}
                  onRemove={i => set('images', form.images.filter((_, idx) => idx !== i))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Vidéo de présentation (optionnel)
                </label>
                <VideoUploader
                  video={form.video}
                  onSet={v => set('video', v)}
                  onRemove={() => set('video', null)}
                />
              </div>
            </div>
          </div>

          {/* Options d'affichage */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-dark mb-4">🔧 Options d'affichage</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={e => set('isAvailable', e.target.checked)}
                  className="rounded text-primary-600 w-5 h-5"
                />
                <div>
                  <p className="font-medium text-dark">Disponible à la location</p>
                  <p className="text-xs text-gray-400">Décocher si actuellement loué</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => set('featured', e.target.checked)}
                  className="rounded text-primary-600 w-5 h-5"
                />
                <div>
                  <p className="font-medium text-dark">Mettre en vedette</p>
                  <p className="text-xs text-gray-400">Afficher sur la page d'accueil</p>
                </div>
              </label>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-4 pb-8">
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading
                ? <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                : <Save size={18} />
              }
              {loading ? 'Sauvegarde...' : isEdit ? 'Mettre à jour' : "Créer l'annonce"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}