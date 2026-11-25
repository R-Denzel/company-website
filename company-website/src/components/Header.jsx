import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Services', href: '/projects' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Pricing', href: '/#pricing' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#080B11]/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" onClick={closeMenu} className="group flex items-center gap-3" aria-label="FutureTech Africa home">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] font-display text-sm font-bold tracking-tight text-[#E5C158] transition group-hover:border-[#D4AF37]/70">
            FT
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-wide text-slate-100">FutureTech</span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.24em] text-slate-500">Africa</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = item.href.startsWith('/#')
              ? location.pathname === '/'
              : location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`relative py-2 text-sm transition-colors ${
                  isActive ? 'text-[#E5C158]' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-x-0 -bottom-[1px] h-px bg-[#D4AF37]"
                    transition={{ duration: 0.22 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-[#D4AF37]/55 px-4 py-2.5 text-sm font-semibold text-[#E5C158] transition hover:border-[#E5C158] hover:bg-[#D4AF37]/[0.08]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md border border-white/10 p-2 text-slate-300 transition hover:border-white/25 hover:text-white lg:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <motion.nav
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        className="overflow-hidden border-t border-white/[0.07] bg-[#080B11] lg:hidden"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className="mx-auto max-w-7xl space-y-1 px-5 py-4 sm:px-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
              className="block rounded-md px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.04] hover:text-[#E5C158]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#11140F]"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Header;
