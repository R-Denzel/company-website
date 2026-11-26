import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Wordmark from './Wordmark';
import { contactChannels, linkTarget } from '../data/contacts';
import { prefersReducedMotion } from '../lib/gsap';

const explore = [
  { name: 'About us', href: '/about' },
  { name: 'Meet the team', href: '/team' },
  { name: 'Services', href: '/projects' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Contact', href: '/contact' },
];

const Footer = () => (
  <footer className="border-t border-line bg-paper">
    <div className="shell py-14 sm:py-20">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_auto]">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-5 text-base leading-7 text-muted">
            We help businesses and institutions turn practical ideas into useful digital products.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-2.5">
            {explore.map((item) => (
              <li key={item.name}><Link to={item.href} className="text-link">{item.name}</Link></li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-2.5">
          {contactChannels.map((channel) => (
            <li key={channel.href}>
              <a href={channel.href} {...linkTarget(channel)} className="text-link break-all sm:break-normal">
                {channel.isExternal ? `${channel.label} · ${channel.value}` : channel.value}
              </a>
            </li>
          ))}
        </ul>

        <div><Button to="/contact">Start a project</Button></div>
      </div>

      <div className="mt-16 flex items-center justify-between gap-4 text-sm text-muted">
        <p>© {new Date().getFullYear()} FutureTech Africa. All rights reserved.</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })}
          className="group inline-flex shrink-0 items-center gap-3 font-medium text-ink"
        >
          Back to top
          <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-mist transition-colors group-hover:bg-ink group-hover:text-paper">
            <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
