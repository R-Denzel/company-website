import { Link } from 'react-router-dom';

const Wordmark = ({ onClick }) => (
  <Link
    to="/"
    onClick={onClick}
    aria-label="FutureTech Africa home"
    className="inline-flex items-center gap-3 text-lg font-semibold tracking-[-0.02em]"
  >
    <img src="/favicon.svg" alt="" width="40" height="40" className="h-10 w-10 shrink-0" />
    FutureTech Africa
  </Link>
);

export default Wordmark;
