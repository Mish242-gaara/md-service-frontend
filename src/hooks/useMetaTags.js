// =============================================
// MD SERVICE - Hook Meta Tags dynamiques
// src/hooks/useMetaTags.js
// =============================================

/**
 * Met à jour les meta tags de la page pour le SEO et
 * les previews WhatsApp / réseaux sociaux.
 *
 * Usage :
 *   useMetaTags({
 *     title:       'Toyota RAV4 2022 - MD Service',
 *     description: 'Louez cette voiture à Pointe-Noire...',
 *     image:       'https://...',  // URL absolue de l'image
 *     url:         window.location.href,
 *   });
 */
export function useMetaTags({ title, description, image, url } = {}) {
  const siteUrl  = process.env.REACT_APP_SITE_URL || window.location.origin;
  const siteName = 'MD Service - Pointe-Noire';

  const finalTitle = title
    ? `${title} | MD Service`
    : 'MD Service - Location Appartements & Voitures Pointe-Noire';

  const finalDesc = description ||
    'Votre agence de location d\'appartements et de véhicules à Pointe-Noire, Congo. Disponible 7j/7, réponse en 1h.';

  const finalUrl = url || window.location.href;

  const finalImage = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : `${siteUrl}/og-image.jpg`;   // Image par défaut à placer dans /public/og-image.jpg

  // Helper pour upsert un tag
  const setMeta = (selector, attr, content) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const [attrName, attrVal] = selector.match(/\[(\w+(?::?\w+)*)="([^"]+)"\]/)?.slice(1) || [];
      if (attrName) el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, content);
  };

  // Titre
  document.title = finalTitle;

  // Meta description
  setMeta('meta[name="description"]', 'content', finalDesc);

  // Open Graph (Facebook, WhatsApp)
  setMeta('meta[property="og:title"]',       'content', finalTitle);
  setMeta('meta[property="og:description"]', 'content', finalDesc);
  setMeta('meta[property="og:image"]',       'content', finalImage);
  setMeta('meta[property="og:url"]',         'content', finalUrl);
  setMeta('meta[property="og:type"]',        'content', 'website');
  setMeta('meta[property="og:site_name"]',   'content', siteName);
  setMeta('meta[property="og:locale"]',      'content', 'fr_CG');

  // Twitter Card
  setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]',       'content', finalTitle);
  setMeta('meta[name="twitter:description"]', 'content', finalDesc);
  setMeta('meta[name="twitter:image"]',       'content', finalImage);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', finalUrl);
}