/**
 * CENTRAL SITE CONFIGURATION
 * Edit only this file to change the WhatsApp number, social links,
 * contact details and the whole product catalogue.
 */
export const siteConfig = {
  brand: { name: 'Áurea', suffix: 'Jewellery', tagline: 'Fine Brazilian jewellery' },

  // Digits only: country code + area code + number. Example: Brazil (55) + São Paulo (11) + number
  whatsapp: {
    number: '5511999999999',
    defaultMessage: 'Hello! I would like to know more about Áurea jewellery.',
  },

  social: {
    instagram: { url: 'https://www.instagram.com/aureajoias', handle: '@aureajoias' },
    facebook: {
      url: 'https://www.facebook.com/aureajoias',
      // true = shows the official Facebook Page plugin in the Social section
      embed: false,
    },
  },

  contact: {
    email: 'contact@aureajoias.com',
    phoneLabel: '+55 11 99999-9999',
    address: 'Rua Oscar Freire, 000 · Jardins, São Paulo – SP, Brazil',
    hours: 'Mon–Sat, 10am to 7pm (BRT)',
  },

  showPrices: true, // false = hides all prices and shows "Price on request"
};

export const categories = [
  { id: 'rings', label: 'Rings', singular: 'Ring', blurb: 'Solitaires and sculpted bands set with hand-cut gemstones.', art: 'ring' },
  { id: 'necklaces', label: 'Necklaces', singular: 'Necklace', blurb: 'Delicate chains and pendants that move from day to night.', art: 'necklace' },
  { id: 'earrings', label: 'Earrings', singular: 'Earrings', blurb: 'From discreet to dramatic, with the right sparkle near the face.', art: 'earrings' },
  { id: 'bracelets', label: 'Bracelets', singular: 'Bracelet', blurb: 'Fluid links and aligned gemstones that frame the wrist.', art: 'bracelet' },
];

// Gem colours used by the illustrations
export const gems = {
  tourmaline: '#D9577F', topaz: '#E8A33D', aquamarine: '#7EC8D9',
  emerald: '#3FA37A', amethyst: '#9B6BC9', pearl: '#F6EFE4',
};

/**
 * To use real photos, set `image` to a URL (or a path inside /public).
 * If `image` is null, the site shows the automatic illustration of the piece.
 * `price: null` shows "Price on request".
 */
export const products = [
  { id: 'aurora-ring', category: 'rings', name: 'Aurora Ring', material: '18k gold · Pink tourmaline', gem: gems.tourmaline, price: 2890, image: null,
    description: 'A solitaire with a brilliant-cut pink tourmaline, held by fine gold claws.' },
  { id: 'ipanema-ring', category: 'rings', name: 'Ipanema Ring', material: '18k gold · Imperial topaz', gem: gems.topaz, price: 3450, image: null,
    description: 'An imperial topaz the colour of sunset on a smooth, comfortable band for everyday wear.' },
  { id: 'waves-ring', category: 'rings', name: 'Waves Ring', material: '18k gold · Aquamarine', gem: gems.aquamarine, price: 3190, image: null,
    description: 'A rippled band inspired by the Copacabana promenade, with an aquamarine at its centre.' },

  { id: 'amazon-necklace', category: 'necklaces', name: 'Amazon Necklace', material: '18k gold · Emerald', gem: gems.emerald, price: 2650, image: null,
    description: 'A drop-cut emerald pendant on a 45 cm Venetian chain.' },
  { id: 'paraty-necklace', category: 'necklaces', name: 'Paraty Moon Necklace', material: '18k gold · Cultured pearl', gem: gems.pearl, price: 2190, image: null,
    description: 'A cultured pearl suspended on a fine chain. A classic gift.' },
  { id: 'ouro-preto-necklace', category: 'necklaces', name: 'Ouro Preto Necklace', material: '18k gold · Topaz', gem: gems.topaz, price: 2980, image: null,
    description: 'A choker with a topaz pendant, inspired by the baroque jewels of Minas Gerais.' },

  { id: 'minas-earrings', category: 'earrings', name: 'Minas Earrings', material: '18k gold · Amethyst', gem: gems.amethyst, price: 1890, image: null,
    description: 'Drop-cut amethysts on gold posts. Light and elegant.' },
  { id: 'golden-drop-earrings', category: 'earrings', name: 'Golden Drop Earrings', material: '18k gold · Pearl', gem: gems.pearl, price: 1450, image: null,
    description: 'Pendant earrings with a pearl and a mirror-polished finish.' },
  { id: 'salvador-earrings', category: 'earrings', name: 'Salvador Sun Earrings', material: '18k gold · Topaz', gem: gems.topaz, price: 1790, image: null,
    description: 'Golden topazes that catch the light of late afternoon.' },

  { id: 'golden-river-bracelet', category: 'bracelets', name: 'Golden River Bracelet', material: '18k gold', gem: gems.pearl, price: 2390, image: null,
    description: 'Fluid solid-gold links with a secure clasp and a soft drape on the wrist.' },
  { id: 'tropical-bracelet', category: 'bracelets', name: 'Tropical Bracelet', material: '18k gold · Emeralds', gem: gems.emerald, price: 3150, image: null,
    description: 'Aligned emeralds on a rigid yet lightweight bangle.' },
  { id: 'cascade-bracelet', category: 'bracelets', name: 'Cascade Bracelet', material: '18k gold · Aquamarine', gem: gems.aquamarine, price: 3590, image: null,
    description: 'Graduated gemstones that flow down the wrist like a waterfall.' },
];

/* ---------- Helpers ---------- */
export const whatsappLink = (message = siteConfig.whatsapp.defaultMessage) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const productMessage = (p) => {
  const cat = categories.find((c) => c.id === p.category);
  return `Hello! I'm interested in the *${p.name}* (${cat?.label}). Could you share more details and availability?`;
};

export const formatPrice = (value) =>
  siteConfig.showPrices && value != null
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
    : 'Price on request';
