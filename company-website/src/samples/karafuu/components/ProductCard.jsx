import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { audienceLabel, formatPrice, productPath } from '../data';
import { toggleWish, useShop } from '../store';

export const WishButton = ({ product, className = '' }) => {
  const isSaved = useShop().wishlist.includes(product.id);

  return (
    <button
      type="button"
      aria-pressed={isSaved}
      aria-label={`Save ${product.name} to wishlist`}
      onClick={() => toggleWish(product.id)}
      className={`grid h-12 w-12 place-items-center transition-colors duration-300 ${className}`}
    >
      <Heart aria-hidden="true" strokeWidth={1.5} className={`h-5 w-5 transition-transform duration-500 ease-soft ${isSaved ? 'scale-110 fill-k-gold text-k-gold' : ''}`} />
    </button>
  );
};

/** Tall picture card with the name and price laid over the bottom. */
const ProductCard = ({ product, className = '' }) => (
  <article className={`group relative overflow-hidden bg-k-night ${className}`}>
    <Link to={productPath(product.id)} draggable="false" className="block">
      <img
        src={product.images[1]}
        alt={`${product.name} bottle on a dark stone`}
        width="900"
        height="1200"
        loading="lazy"
        decoding="async"
        draggable="false"
        className="aspect-[3/4] w-full object-cover transition-transform duration-1000 ease-soft group-hover:scale-[1.07]"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-6 pt-16 text-center text-white">
        <span className="block text-xs text-white/75">{audienceLabel(product.audience)}</span>
        <span className="mt-1.5 block text-sm font-medium uppercase tracking-[0.18em]">{product.name}</span>
        <span className="mt-1.5 block text-sm tabular-nums text-[#e5c88f]">{formatPrice(product.price)}</span>
      </span>
    </Link>
    <WishButton product={product} className="absolute right-1 top-1 text-white" />
  </article>
);

export default ProductCard;
