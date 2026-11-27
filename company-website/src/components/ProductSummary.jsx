import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { logEvent } from '../lib/analytics';

/** Product screenshot, status and one-line positioning, linking to its page. */
const ProductSummary = ({ product }) => (
  <Link to={`/products/${product.id}`} onClick={() => logEvent('product_cta', { product: product.id, action: 'view' })} className="group block">
    <div data-clip className="aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-mist">
      <img src={product.project.image} alt={product.project.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-1000 ease-soft group-hover:scale-105" />
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <h3 className="text-row font-medium">{product.name}</h3>
      <StatusBadge status={product.status} />
    </div>
    <p className="mt-1 text-sm font-semibold text-violet-deep">{product.category}</p>
    <p className="mt-2 max-w-md text-base leading-7 text-muted">{product.positioning}</p>
    <span className="text-link mt-3 text-sm font-semibold">View product</span>
  </Link>
);

export default ProductSummary;
