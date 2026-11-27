// Sample websites in the portfolio. Each has its own header, footer and curtain,
// and is downloaded only when someone opens it.
import preloadable from '../lib/preloadable';
import karafuuMark from './karafuu/mark.svg';
import voltwayMark from '../shop/mark.svg';

export const samples = [
  {
    base: '/work/tech-shop',
    name: 'Voltway',
    curtain: { mark: voltwayMark, className: 'bg-ink text-paper' },
    ...preloadable(() => import('../shop/TechShop')),
  },
  {
    base: '/work/karafuu',
    name: 'Karafuu',
    curtain: { mark: karafuuMark, className: 'bg-[#0b0807] text-[#f7f2ea] font-parfum uppercase tracking-[0.3em]' },
    ...preloadable(
      () => import('./karafuu/KarafuuSite'),
      (location) => import('./karafuu/data').then((data) => data.preloadImagesFor(location.pathname)),
    ),
  },
];

export const sampleFor = (pathname) => samples.find(({ base }) => pathname === base || pathname.startsWith(`${base}/`));
