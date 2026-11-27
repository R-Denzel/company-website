import amberCard from './images/amber-tide-card.webp';
import amberDetail from './images/amber-tide-detail.webp';
import amberHero from './images/amber-tide-hero.webp';
import cedarCard from './images/cedar-smoke-card.webp';
import cedarDetail from './images/cedar-smoke-detail.webp';
import cedarHero from './images/cedar-smoke-hero.webp';
import jasmineCard from './images/golden-jasmine-card.webp';
import jasmineDetail from './images/golden-jasmine-detail.webp';
import jasmineHero from './images/golden-jasmine-hero.webp';
import oudCard from './images/oud-nocturne-card.webp';
import oudDetail from './images/oud-nocturne-detail.webp';
import oudHero from './images/oud-nocturne-hero.webp';
import roseCard from './images/rose-noir-card.webp';
import roseDetail from './images/rose-noir-detail.webp';
import roseHero from './images/rose-noir-hero.webp';
import saffronCard from './images/saffron-veil-card.webp';
import saffronDetail from './images/saffron-veil-detail.webp';
import saffronHero from './images/saffron-veil-hero.webp';
import cinnamonPhoto from './images/photo-cinnamon.webp';
import clovesPhoto from './images/photo-cloves.webp';
import rosePhoto from './images/photo-rose.webp';
import silkPhoto from './images/photo-silk.webp';
import spicesPhoto from './images/photo-spices.webp';
import anisePhoto from './images/photo-star-anise.webp';

export const BASE = '/work/karafuu';
export const productPath = (id) => `${BASE}/products/${id}`;
export const collectionPath = (query = '') => `${BASE}/collection${query}`;

export const navigation = [
  { name: 'All perfumes', to: collectionPath() },
  { name: 'For women', to: collectionPath('?for=women') },
  { name: 'For men', to: collectionPath('?for=men') },
  { name: 'Gift ideas', to: `${BASE}#gifts` },
  { name: 'Our story', to: `${BASE}#story` },
];

// Karafuu is an invented perfume house. Fragrances, notes and prices are all made up.
export const products = [
  {
    id: 'saffron-veil',
    name: 'Saffron Veil',
    audience: 'women',
    price: 980000,
    volume: '75 ml',
    concentration: '25%',
    family: 'Oriental',
    notes: { Top: ['Saffron', 'Pink pepper'], Heart: ['Rose', 'Clove'], Base: ['Amber', 'Oud'] },
    description: 'Warm saffron over rose and clove, settling into amber. A fragrance that arrives softly and stays late into the evening.',
    inspiration: 'The last orange light on a market stall, where saffron threads and clove buds are weighed out by hand.',
    images: [saffronHero, saffronCard, saffronDetail],
  },
  {
    id: 'rose-noir',
    name: 'Rose Noir',
    audience: 'women',
    price: 860000,
    volume: '75 ml',
    concentration: '22%',
    family: 'Floral',
    notes: { Top: ['Blackcurrant', 'Pink pepper'], Heart: ['Rose', 'Clove'], Base: ['Patchouli', 'Musk'] },
    description: 'A deep red rose, darkened with blackcurrant and patchouli. Rich without being sweet.',
    inspiration: 'A rose cut after dark, when its scent is heavier than its colour.',
    images: [roseHero, roseCard, roseDetail],
  },
  {
    id: 'golden-jasmine',
    name: 'Golden Jasmine',
    audience: 'women',
    price: 790000,
    volume: '75 ml',
    concentration: '20%',
    family: 'Floral',
    notes: { Top: ['Mandarin', 'Bergamot'], Heart: ['Jasmine', 'Ylang-ylang'], Base: ['Sandalwood', 'Vanilla'] },
    description: 'Bright citrus opening onto jasmine and ylang-ylang, with sandalwood underneath. Made for daytime.',
    inspiration: 'Jasmine along a garden wall at the hour the stones are still warm.',
    images: [jasmineHero, jasmineCard, jasmineDetail],
  },
  {
    id: 'oud-nocturne',
    name: 'Oud Nocturne',
    audience: 'men',
    price: 1250000,
    volume: '105 ml',
    concentration: '25%',
    family: 'Oriental',
    notes: { Top: ['Cardamom', 'Saffron'], Heart: ['Oud', 'Leather'], Base: ['Amber', 'Smoke'] },
    description: 'Oud and leather lifted by cardamom, ending in smoke and amber. The deepest scent in the house.',
    inspiration: 'A long night drive with the windows down, past wood fires on the edge of town.',
    images: [oudHero, oudCard, oudDetail],
  },
  {
    id: 'cedar-smoke',
    name: 'Cedar & Smoke',
    audience: 'men',
    price: 840000,
    volume: '105 ml',
    concentration: '20%',
    family: 'Woody',
    notes: { Top: ['Juniper', 'Black pepper'], Heart: ['Cedar', 'Clove'], Base: ['Vetiver', 'Smoke'] },
    description: 'Dry cedar and clove with a thread of smoke. Quiet, steady and easy to wear to work.',
    inspiration: 'Fresh-cut timber stacked beside a charcoal stove after rain.',
    images: [cedarHero, cedarCard, cedarDetail],
  },
  {
    id: 'amber-tide',
    name: 'Amber Tide',
    audience: 'men',
    price: 760000,
    volume: '105 ml',
    concentration: '18%',
    family: 'Fresh',
    notes: { Top: ['Sea salt', 'Bergamot'], Heart: ['Sage', 'Neroli'], Base: ['Amber', 'Driftwood'] },
    description: 'Salt air, sage and bergamot over warm driftwood. A clean scent that holds through heat.',
    inspiration: 'The coast at low tide, with dhows drawn up on pale sand.',
    images: [amberHero, amberCard, amberDetail],
  },
];

export const findProduct = (id) => products.find((product) => product.id === id);
export const notesOf = (product) => Object.values(product.notes).flat();
export const families = [...new Set(products.map((product) => product.family))].sort();
export const featuredNotes = ['Saffron', 'Clove', 'Rose', 'Jasmine', 'Oud', 'Amber'];
export const allNotes = [...new Set(products.flatMap(notesOf))].sort();
export const formatPrice = (value) => `UGX ${value.toLocaleString('en-US')}`;
export const audienceLabel = (audience) => (audience === 'women' ? 'For women' : 'For men');

const credit = (name, slug) => ({ credit: name, creditUrl: `https://unsplash.com/photos/${slug}` });

// Unsplash photographs used under the Unsplash License.
export const photos = {
  silk: { src: silkPhoto, alt: 'Gold silk caught mid-air against a dark wall', ...credit('ilgmyzin', '-nTnw6JazMg') },
  cinnamon: { src: cinnamonPhoto, alt: 'Cinnamon sticks and star anise in warm low light', ...credit('Laura Wahrheit', '9UGdmC8mnNQ') },
  rose: { src: rosePhoto, alt: 'A single red rose on a black background', ...credit('Victoria Feliniak', '6EnWL3pIybs') },
  cloves: { src: clovesPhoto, alt: 'A deep layer of dried clove buds', ...credit('Mo Farhan Badar', 'dc9TXRRp9MQ') },
  spices: { src: spicesPhoto, alt: 'Spices set out in small dishes on a dark table', ...credit('Kirsty Hughes', 'PRm0l_NcpFs') },
  anise: { src: anisePhoto, alt: 'Close view of a dried star anise pod', ...credit('Vivek Doshi', 'qHfG8E111cQ') },
};

/** Decodes a page's first pictures before it is shown, so they do not pop in. */
export const preloadImagesFor = (pathname) => {
  const product = findProduct(pathname.split('/products/')[1]);
  const sources = product ? [product.images[0]] : pathname === BASE ? [silkPhoto] : [];
  return Promise.all(sources.map((src) => {
    const image = new Image();
    image.src = src;
    return image.decode().catch(() => {});
  }));
};
