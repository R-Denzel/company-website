import { Link } from 'react-router-dom';
import mark from '../mark.svg';
import { BASE } from '../data';

export const Brand = ({ light = false, compact = false }) => (
  <Link to={BASE} aria-label="Karafuu Parfums home" className={`inline-flex items-center gap-2 ${compact ? '' : 'flex-col gap-1'}`}>
    <img src={mark} alt="" width="64" height="64" className={compact ? 'h-7 w-7' : 'h-10 w-10'} />
    <span className={`font-medium uppercase leading-none tracking-[0.2em] sm:tracking-[0.32em] ${compact ? 'text-base' : 'text-base sm:text-lg'} ${light ? 'text-k-ivory' : 'text-k-night'}`}>
      Karafuu
    </span>
  </Link>
);

const tones = {
  gold: 'bg-k-bronze text-white hover:bg-k-night',
  outline: 'border border-k-night text-k-night hover:bg-k-night hover:text-white',
  'outline-light': 'border border-k-ivory/70 text-k-ivory hover:bg-k-ivory hover:text-k-night',
};

/** Square-cornered uppercase button of the house. */
export const ShopButton = ({ tone = 'gold', to, className = '', children, ...props }) => {
  const classes = `inline-flex min-h-12 items-center justify-center gap-3 px-8 text-center text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ease-soft ${tones[tone]} ${className}`;
  return to
    ? <Link to={to} className={classes} {...props}>{children}</Link>
    : <button type="button" className={classes} {...props}>{children}</button>;
};

export const Heading = ({ as = 'h2', className = '', children, ...props }) => {
  const Tag = as;
  return <Tag className={`font-medium uppercase leading-snug tracking-[0.18em] ${className}`} {...props}>{children}</Tag>;
};

export const PhotoCredit = ({ photo }) => (
  <a
    href={photo.creditUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="absolute bottom-2 right-3 z-10 text-[11px] text-white/70 hover:text-white"
  >
    Photo: {photo.credit} / Unsplash
  </a>
);
