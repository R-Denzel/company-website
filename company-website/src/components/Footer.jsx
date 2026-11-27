import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import MarketSelector from './MarketSelector';
import { marketList } from '../content/markets';
import { contactChannels, linkTarget } from '../data/contacts';
import { logEvent } from '../lib/analytics';
import { prefersReducedMotion } from '../lib/gsap';

const explore = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Products', href: '/products' },
  { name: 'Work', href: '/work' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'How billing works', href: '/pricing#billing' },
];

const company = [
  { name: 'About us', href: '/about' },
  { name: 'Meet the team', href: '/team' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Contact', href: '/contact' },
  ...marketList.map((market) => ({ name: `Services in ${market.name}`, href: market.path })),
];

const Links = ({ label, items }) => (
  <nav aria-label={label}>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.name}><Link to={item.href} className="text-link">{item.name}</Link></li>
      ))}
    </ul>
  </nav>
);

/** Quiet navy close to every page. The logo mark stands alone; the name appears once, in the legal line. */
const Footer = () => (
  <footer className="on-ink relative bg-ink text-sm leading-6 text-paper">
    <div aria-hidden="true" className="streak !bottom-auto top-0" />
    <div className="shell pb-8 pt-16">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr]">
        <div className="max-w-xs">
          <Link to="/" aria-label="FutureTech Africa home" className="inline-block rounded-lg">
            <img src="/favicon.svg" alt="" width="40" height="40" className="h-10 w-10 rounded-lg ring-1 ring-ink-line" />
          </Link>
          <p className="mt-5 text-muted-invert">
            We help businesses and institutions turn practical ideas into useful digital products.
          </p>
          <MarketSelector className="mt-6" tone="dark" compact />
        </div>

        <Links label="Explore" items={explore} />
        <Links label="Company" items={company} />

        <div>
          <ul className="space-y-2.5">
            {contactChannels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  {...linkTarget(channel)}
                  onClick={() => channel.isExternal && logEvent('whatsapp_click', { from: 'footer' })}
                  className="text-link break-all sm:break-normal"
                >
                  {channel.isExternal ? `${channel.label} · ${channel.value}` : channel.value}
                </a>
              </li>
            ))}
          </ul>
          <Button to="/contact" className="mt-6">Start a project</Button>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink-line pt-6 text-muted-invert">
        <p>© {new Date().getFullYear()} FutureTech Africa. All rights reserved.</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-paper"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
