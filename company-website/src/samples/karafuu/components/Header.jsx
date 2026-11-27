import { useEffect, useState } from 'react';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../data';
import { useShop } from '../store';
import { Brand } from './ui';

const IconButton = ({ label, count, icon, onClick }) => {
  const Icon = icon;
  return (
    <button type="button" onClick={onClick} aria-label={`${label}, ${count} ${count === 1 ? 'item' : 'items'}`} className="relative grid h-11 w-10 place-items-center transition-colors hover:text-k-gold sm:w-11">
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
      {count > 0 && (
        <span aria-hidden="true" className="absolute right-0 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-k-bronze px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
};

const Actions = ({ onPanel }) => {
  const { bag, wishlist } = useShop();
  const bagCount = bag.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex items-center justify-end">
      <IconButton label="Wishlist" count={wishlist.length} icon={Heart} onClick={() => onPanel('wishlist')} />
      <IconButton label="My bag" count={bagCount} icon={ShoppingBag} onClick={() => onPanel('bag')} />
      <Link to="/portfolio" aria-label="Leave the sample and return to FutureTech Africa" className="grid h-11 w-10 place-items-center transition-colors hover:text-k-gold sm:w-11">
        <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
      </Link>
    </div>
  );
};

const Nav = ({ light }) => {
  const location = useLocation();
  const current = `${location.pathname}${location.search}${location.hash}`;

  return (
    <nav aria-label="Shop" className="flex justify-center gap-8">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          aria-current={current === item.to ? 'page' : undefined}
          className={`text-link text-xs font-medium uppercase tracking-[0.2em] ${current === item.to ? '!bg-[length:100%_1px]' : ''} ${light ? 'text-k-ivory' : ''}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

/** A tall ivory masthead, replaced by a slim dark bar once the reader scrolls. */
const Header = ({ onPanel }) => {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsCompact(window.scrollY > 180);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuButton = (
    <button type="button" onClick={() => onPanel('menu')} aria-label="Open menu" className="grid h-11 w-11 place-items-center lg:hidden">
      <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );

  return (
    <>
      <header className="relative z-30 border-b border-k-line bg-white">
        <div className="shell grid grid-cols-[1fr_auto_1fr] items-center py-3 lg:py-4">
          <div className="flex items-center">
            {menuButton}
            <p className="hidden text-xs uppercase tracking-[0.18em] text-k-smoke lg:block">Sample website · UGX</p>
          </div>
          <Brand />
          <Actions onPanel={onPanel} />
        </div>
        <div className="hidden pb-4 lg:block"><Nav /></div>
      </header>

      <div
        inert={!isCompact}
        className={`on-ink fixed inset-x-0 top-0 z-40 bg-k-night text-k-ivory transition-transform duration-500 ease-soft ${isCompact ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            {menuButton}
            <Brand light compact />
          </div>
          <div className="hidden lg:block"><Nav light /></div>
          <Actions onPanel={onPanel} />
        </div>
      </div>
    </>
  );
};

export default Header;
