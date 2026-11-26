import go13 from '../assets/shop/go-13.webp';
import nova5 from '../assets/shop/nova-5.webp';
import novaMini from '../assets/shop/nova-mini.webp';
import pulseX from '../assets/shop/pulse-x.webp';
import slate14 from '../assets/shop/slate-14.webp';
import studio16 from '../assets/shop/studio-16.webp';

// Catalogue stills, pre-rendered from models.js so the page never draws them live.
const images = {
  'nova-5': nova5,
  'slate-14': slate14,
  'pulse-x': pulseX,
  'studio-16': studio16,
  'nova-mini': novaMini,
  'go-13': go13,
};

// Sample catalogue for the Voltway demo. Every model, specification and price is invented.
const catalogue = [
  {
    id: 'nova-5',
    kind: 'phone',
    name: 'Nova 5',
    title: ['A brighter', 'everyday phone'],
    description: 'A 6.7-inch screen that stays readable in full sun, with a battery built for long days.',
    price: 1850000,
    specs: [['Display', '6.7" OLED, 120 Hz'], ['Storage', '256 GB'], ['Camera', '50 MP dual'], ['Battery', '5,000 mAh']],
    body: '#6a52e0',
    screen: ['#2b1a8f', '#8c5cff', '#ff8f6b'],
    backdrop: ['#e6defe', '#a99bd6'],
    accent: '#6440f5',
  },
  {
    id: 'slate-14',
    kind: 'laptop',
    name: 'Slate 14',
    title: ['Light enough', 'to carry daily'],
    description: 'A thin 14-inch laptop for study, business and travel, with quiet all-day performance.',
    price: 3400000,
    specs: [['Display', '14" 2.8K'], ['Memory', '16 GB'], ['Storage', '512 GB SSD'], ['Weight', '1.2 kg']],
    body: '#c9c6d6',
    screen: ['#10163f', '#3b3fc4', '#ff9d7a'],
    backdrop: ['#ffe3d6', '#e0a592'],
    accent: '#ff7a5c',
  },
  {
    id: 'pulse-x',
    kind: 'phone',
    name: 'Pulse X',
    title: ['Made for', 'photographs'],
    description: 'Three cameras and a large sensor for sharp portraits, wide scenes and night shots.',
    price: 2750000,
    specs: [['Display', '6.5" OLED, 120 Hz'], ['Storage', '256 GB'], ['Camera', '108 MP triple'], ['Battery', '4,800 mAh']],
    body: '#ff7a5c',
    screen: ['#5a1230', '#e8497a', '#ffb25c'],
    backdrop: ['#ffe0ea', '#d99ab4'],
    accent: '#d6336c',
    cameras: 3,
  },
  {
    id: 'studio-16',
    kind: 'laptop',
    name: 'Studio 16',
    title: ['Room for', 'serious work'],
    description: 'A 16-inch workstation for design, video and development, with dedicated graphics.',
    price: 6900000,
    specs: [['Display', '16" 3.2K, 120 Hz'], ['Memory', '32 GB'], ['Storage', '1 TB SSD'], ['Graphics', 'Dedicated 8 GB']],
    body: '#4a4668',
    screen: ['#08051c', '#4524b8', '#c04ad0'],
    backdrop: ['#dfe3ff', '#98a0d4'],
    accent: '#4b2ccb',
  },
  {
    id: 'nova-mini',
    kind: 'phone',
    name: 'Nova Mini',
    title: ['Small phone,', 'full features'],
    description: 'A compact 6.1-inch phone that fits one hand without giving up speed or storage.',
    price: 1200000,
    specs: [['Display', '6.1" OLED, 90 Hz'], ['Storage', '128 GB'], ['Camera', '50 MP dual'], ['Battery', '4,200 mAh']],
    body: '#ded7f7',
    screen: ['#12385c', '#2f8fd0', '#c8baff'],
    backdrop: ['#f3e6fb', '#bfa0cf'],
    accent: '#8b3fb8',
  },
  {
    id: 'go-13',
    kind: 'laptop',
    name: 'Go 13',
    title: ['A first laptop', 'that lasts'],
    description: 'An affordable 13-inch laptop for school and small business, with a sturdy hinge.',
    price: 1950000,
    specs: [['Display', '13.3" Full HD'], ['Memory', '8 GB'], ['Storage', '256 GB SSD'], ['Battery', 'Up to 11 hours']],
    body: '#8f80e8',
    screen: ['#2a0f52', '#7a3fd0', '#ffc3b3'],
    backdrop: ['#ffeadb', '#d6aa9c'],
    accent: '#c4532f',
  },
];

export const products = catalogue.map((product) => ({ ...product, image: images[product.id] }));

export const formatPrice = (value) => `UGX ${value.toLocaleString('en-US')}`;
