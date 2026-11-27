import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Constellation from './Constellation';
import HeroWordmark from './HeroWordmark';
import MarketSelector from './MarketSelector';
import Wordmark from './Wordmark';
import { marketList } from '../content/markets';
import { contactChannels, linkTarget } from '../data/contacts';
import { logEvent } from '../lib/analytics';
import { gsap, MOTION_OK, prefersReducedMotion, useGSAP } from '../lib/gsap';

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
  ...marketList.map((market) => ({ name: `FutureTech in ${market.name}`, href: market.path })),
];

const Links = ({ label, items }) => (
  <nav data-footer-column aria-label={label}>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.name}><Link to={item.href} className="text-link">{item.name}</Link></li>
      ))}
    </ul>
  </nav>
);

/**
 * Night-sky close to every page: a drifting network over a violet-to-coral
 * horizon that rises as the reader reaches it, with the company name spelling
 * itself out along the bottom.
 */
const Footer = () => {
  const footer = useRef(null);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // Everything here moves with the scroll, using transform and opacity only.
      const through = { trigger: footer.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 };

      gsap.fromTo('[data-horizon]', { scaleY: 0.25, opacity: 0.25 }, { scaleY: 1, opacity: 1, ease: 'none', scrollTrigger: through });
      gsap.fromTo('[data-footer-column]', { y: (index) => 60 + index * 45, opacity: 0.15 }, {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { ...through, end: 'top 35%' },
      });
    });
  }, { scope: footer });

  return (
    <footer ref={footer} className="on-ink relative isolate z-10 -mt-8 overflow-hidden rounded-t-[2rem] bg-[#0a0624] text-paper sm:-mt-12 sm:rounded-t-[3rem]">
      <div
        data-horizon
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[75%] origin-bottom bg-[radial-gradient(60%_75%_at_22%_108%,rgba(100,64,245,0.75),transparent_70%),radial-gradient(55%_65%_at_82%_112%,rgba(255,122,92,0.55),transparent_70%),radial-gradient(40%_45%_at_52%_110%,rgba(190,70,210,0.5),transparent_70%)]"
      />
      <Constellation />

      <div className="shell pb-8 pt-16 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr]">
          <div data-footer-column className="max-w-xs">
            <Wordmark />
            <p className="mt-5 text-base leading-7 text-muted-invert">
              We help businesses and institutions turn practical ideas into useful digital products.
            </p>
            <MarketSelector className="mt-6" tone="dark" compact />
          </div>

          <Links label="Explore" items={explore} />
          <Links label="Company" items={company} />

          <div data-footer-column>
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
            <Button to="/contact" variant="light" className="mt-8">Start a project</Button>
          </div>
        </div>

        <div className="mt-16 text-paper sm:mt-24">
          <HeroWordmark text="FutureTech" revealOnScroll />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-paper/20 pt-6 text-sm text-paper/85">
          <p>© {new Date().getFullYear()} FutureTech Africa. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })}
            className="group inline-flex shrink-0 items-center gap-3 font-medium text-paper"
          >
            Back to top
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-coral-soft">
              <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
