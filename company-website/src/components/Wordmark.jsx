import { Link } from 'react-router-dom';

const Wordmark = ({ onClick }) => (
  <Link
    to="/"
    onClick={onClick}
    aria-label="FutureTech Africa home"
    className="inline-flex items-center gap-2.5 whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.04em] sm:gap-3 sm:text-base sm:tracking-[0.06em]"
  >
    <img src="/favicon.svg" alt="" width="40" height="40" className="h-10 w-10 shrink-0" />
    FutureTech Africa
  </Link>
);

export default Wordmark;
