import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import MarketSelector from './MarketSelector';
import Wordmark from './Wordmark';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

const navigation = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Products', href: '/products' },
  { name: 'Work', href: '/work' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

const menuOnly = [
  { name: 'Team', href: '/team' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();
  const menu = useRef(null);
  const toggle = useRef(null);

  const isActive = (href) => location.pathname === href || location.pathname.startsWith(`${href}/`);

  // Tuck the bar away while reading downward; bring it back on any upward scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setIsHidden(y > lastY && y > 240);
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggle.current.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const handleResize = () => desktop.matches && setIsMenuOpen(false);

    document.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener('change', handleResize);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', handleResize);
    };
  }, [isMenuOpen]);

  useGSAP(() => {
    const speed = prefersReducedMotion() ? 0 : 1;

    if (isMenuOpen) {
      gsap.timeline()
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65 * speed, ease: 'curtain' })
        .fromTo('[data-menu-item]', { yPercent: 110 }, { yPercent: 0, duration: 0.7 * speed, ease: 'soft', stagger: 0.04 * speed }, 0.25 * speed);
    } else {
      gsap.to(menu.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.45 * speed,
        ease: 'curtain',
        onComplete: () => gsap.set(menu.current, { visibility: 'hidden' }),
      });
    }
  }, { dependencies: [isMenuOpen], scope: menu });

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        onFocus={() => setIsHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper transition-transform duration-500 ease-soft ${
          isHidden && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="shell flex h-[71px] items-center justify-between gap-4">
          <Wordmark onClick={closeMenu} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`text-link text-[15px] ${isActive(item.href) ? '!bg-[length:100%_1px]' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <MarketSelector compact />
            <Button to="/contact" size="md" arrow={false} className="hidden xl:inline-flex">
              Book a discovery call
            </Button>
            <Button to="/contact" size="md" arrow={false} className="xl:!hidden">
              Contact
            </Button>
          </div>

          <button
            ref={toggle}
            type="button"
            className="flex h-11 items-center gap-3 rounded-full bg-mist pl-5 pr-4 text-sm font-medium lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-500 ease-soft ${isMenuOpen ? 'top-[5px] rotate-45' : 'top-0.5'}`} />
              <span className={`absolute left-0 h-px w-4 bg-ink transition-all duration-500 ease-soft ${isMenuOpen ? 'top-[5px] -rotate-45' : 'top-2'}`} />
            </span>
          </button>
        </div>
      </header>

      <nav
        ref={menu}
        id="mobile-menu"
        aria-label="Mobile navigation"
        className="invisible fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper px-5 pb-8 pt-4 sm:px-8 lg:hidden"
      >
        <MarketSelector />
        <ul className="mt-3">
          {[...navigation, ...menuOnly].map((item) => (
            <li key={item.name} className="border-b border-line">
              <Link to={item.href} onClick={closeMenu} className="block overflow-hidden py-3">
                <span data-menu-item className="block text-row font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Button to="/contact" size="lg" onClick={closeMenu} className="mt-6">
          Book a discovery call
        </Button>
      </nav>
    </>
  );
};

export default Header;
