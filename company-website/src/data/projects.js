import checkinhq from '../assets/work/checkinhq.jpg';
import myduka from '../assets/work/myduka.jpg';
import payro from '../assets/work/payro.jpg';
import voltway from '../assets/work/voltway.jpg';

export const sampleProject = {
  name: 'Voltway',
  category: 'Sample website · Phone and laptop shop',
  description: 'A demo tech shop with a scroll-driven 3D showcase, a filterable catalogue and product enquiries.',
  url: '/work/tech-shop',
  isSample: true,
  image: voltway,
  alt: 'Voltway sample shop showing a 3D phone on a plinth beside its product title',
};

export const featuredProjects = [
  {
    name: 'My Duka POS',
    category: 'Point of sale & inventory',
    description: 'A mobile-first POS and inventory management system for small businesses.',
    url: 'https://myduka-pos-hruz.onrender.com/',
    image: myduka,
    alt: 'My Duka POS shop overview screen showing sales, tender mix and stock panels',
  },
  {
    name: 'Payro',
    category: 'Digital payments',
    description: 'A payment project with a simple promise: “Split smart · pay easy.”',
    url: 'https://www.payro.co.ke',
    image: payro,
    alt: 'Payro welcome screen reading “Split expenses effortlessly”',
  },
  {
    name: 'CheckinHQ',
    category: 'Booking management',
    description: 'Simple booking management for businesses.',
    url: 'https://checkinhq.vercel.app/',
    image: checkinhq,
    alt: 'CheckinHQ sign-in screen on a green background',
  },
];
