import checkinhq from '../assets/work/checkinhq.jpg';
import myduka from '../assets/work/myduka.jpg';
import payro from '../assets/work/payro.jpg';
import voltway from '../assets/work/voltway.jpg';
import karafuu from '../assets/work/karafuu.jpg';

export const sampleProjects = [
  {
    name: 'Karafuu Parfums',
    category: 'Sample website · Luxury perfume shop',
    description: 'A demo perfume house with product pages, scent filters, a wishlist and a bag.',
    url: '/work/karafuu',
    isSample: true,
    image: karafuu,
    alt: 'Karafuu sample shop showing perfume bottles on dark stones',
  },
  {
    name: 'Voltway',
    category: 'Sample website · Phone and laptop shop',
    description: 'A demo tech shop with a 3D showcase, a filterable catalogue and enquiries.',
    url: '/work/tech-shop',
    isSample: true,
    image: voltway,
    alt: 'Voltway sample shop showing a 3D phone on a plinth beside its product title',
  },
];

export const featuredProjects = [
  {
    name: 'My Duka POS',
    status: 'Beta',
    category: 'Point of sale & inventory',
    description: 'A mobile-first POS and inventory management system for small businesses.',
    url: 'https://myduka-pos-hruz.onrender.com/',
    image: myduka,
    alt: 'My Duka POS shop overview screen showing sales, tender mix and stock panels',
  },
  {
    name: 'Payro',
    status: 'Beta',
    category: 'Shared expenses',
    description: 'A product for splitting shared bills, with a simple promise: “Split smart · pay easy.”',
    url: 'https://www.payro.co.ke',
    image: payro,
    alt: 'Payro welcome screen reading “Split expenses effortlessly”',
  },
  {
    name: 'CheckinHQ',
    status: 'Beta',
    category: 'Booking management',
    description: 'Simple booking management for businesses.',
    url: 'https://checkinhq.vercel.app/',
    image: checkinhq,
    alt: 'CheckinHQ sign-in screen on a green background',
  },
];
