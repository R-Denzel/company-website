import { Link } from 'react-router-dom';
import { collectionPath, navigation } from '../data';
import { Brand } from './ui';

const columns = [
  { title: 'Shop', links: navigation.slice(0, 3) },
  {
    title: 'The house',
    links: [...navigation.slice(3), { name: 'Shop by ingredient', to: collectionPath() }],
  },
  {
    title: 'This sample',
    links: [{ name: 'Back to the portfolio', to: '/work' }, { name: 'Talk to FutureTech', to: '/contact' }],
  },
];

const Footer = () => (
  <footer className="on-ink bg-k-night py-16 text-k-ivory">
    <div className="shell grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <Brand light compact />
        <p className="mt-5 max-w-xs text-sm leading-7 text-k-ivory/70">
          Karafuu is a sample website designed and built by FutureTech Africa. The house, its perfumes and its prices are invented, and nothing is sold.
        </p>
      </div>
      {columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-k-gold">{column.title}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {column.links.map((link) => (
              <li key={link.name}><Link to={link.to} className="text-link">{link.name}</Link></li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  </footer>
);

export default Footer;
