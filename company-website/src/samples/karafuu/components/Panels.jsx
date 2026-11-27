import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Dialog from '../../../components/Dialog';
import { audienceLabel, collectionPath, findProduct, formatPrice, navigation, productPath } from '../data';
import { addToBag, setQuantity, toggleWish, useShop } from '../store';
import { Heading, ShopButton } from './ui';

const Row = ({ product, onClose, children }) => (
  <li className="flex gap-4 border-b border-k-line py-5">
    <Link to={productPath(product.id)} onClick={onClose} className="shrink-0">
      <img src={product.images[1]} alt="" width="900" height="1200" className="h-28 w-[84px] object-cover" />
    </Link>
    <div className="min-w-0 flex-1">
      <p className="text-xs uppercase tracking-[0.18em] text-k-smoke">{audienceLabel(product.audience)}</p>
      <Link to={productPath(product.id)} onClick={onClose} className="mt-1 block font-medium uppercase tracking-[0.12em]">{product.name}</Link>
      <p className="mt-1 text-sm tabular-nums">{formatPrice(product.price)} · {product.volume}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">{children}</div>
    </div>
  </li>
);

const Empty = ({ text, onClose }) => (
  <div className="mt-10">
    <p className="text-lg text-k-smoke">{text}</p>
    <ShopButton to={collectionPath()} onClick={onClose} className="mt-6">See the perfumes</ShopButton>
  </div>
);

const Bag = ({ onClose }) => {
  const { bag } = useShop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const items = bag.map((item) => ({ ...item, product: findProduct(item.id) })).filter((item) => item.product);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (!items.length) return <Empty text="Your bag is empty." onClose={onClose} />;

  if (isCheckingOut) {
    return (
      <div role="status" className="mt-10">
        <p className="text-lg leading-8">
          This is where payment would begin. Karafuu is a demonstration website, so no payment is taken and nothing is ordered or sent.
        </p>
        <ShopButton tone="outline" className="mt-8" onClick={() => setIsCheckingOut(false)}>Back to my bag</ShopButton>
      </div>
    );
  }

  return (
    <>
      <ul className="mt-6">
        {items.map(({ product, quantity }) => (
          <Row key={product.id} product={product} onClose={onClose}>
            <span className="inline-flex items-center border border-k-line">
              <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => setQuantity(product.id, quantity - 1)} className="grid h-10 w-10 place-items-center hover:bg-k-ivory"><Minus aria-hidden="true" className="h-3.5 w-3.5" /></button>
              <span aria-live="polite" className="w-8 text-center text-sm tabular-nums">{quantity}</span>
              <button type="button" aria-label={`Add one ${product.name}`} disabled={quantity >= 9} onClick={() => setQuantity(product.id, quantity + 1)} className="grid h-10 w-10 place-items-center hover:bg-k-ivory disabled:opacity-30"><Plus aria-hidden="true" className="h-3.5 w-3.5" /></button>
            </span>
            <button type="button" onClick={() => setQuantity(product.id, 0)} className="text-link text-sm">Remove</button>
          </Row>
        ))}
      </ul>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">Subtotal</span>
        <span className="text-2xl tabular-nums">{formatPrice(subtotal)}</span>
      </div>
      <p className="mt-2 text-sm text-k-smoke">Sample prices.</p>
      <ShopButton className="mt-6 w-full" onClick={() => setIsCheckingOut(true)}>Checkout (demo)</ShopButton>
    </>
  );
};

const Wishlist = ({ onClose }) => {
  const { wishlist } = useShop();
  const items = wishlist.map(findProduct).filter(Boolean);

  if (!items.length) return <Empty text="Nothing saved yet. Tap the heart on a perfume to keep it here." onClose={onClose} />;

  return (
    <ul className="mt-6">
      {items.map((product) => (
        <Row key={product.id} product={product} onClose={onClose}>
          <button
            type="button"
            onClick={() => {
              addToBag(product.id);
              toggleWish(product.id);
            }}
            className="text-link text-sm font-medium"
          >
            Move to bag
          </button>
          <button type="button" onClick={() => toggleWish(product.id)} className="text-link text-sm text-k-smoke">Remove</button>
        </Row>
      ))}
    </ul>
  );
};

const MenuList = ({ onClose }) => (
  <ul className="mt-6">
    {navigation.map((item) => (
      <li key={item.name} className="border-b border-k-line">
        <Link to={item.to} onClick={onClose} className="block py-5 text-lg font-medium uppercase tracking-[0.16em]">{item.name}</Link>
      </li>
    ))}
  </ul>
);

const panels = {
  bag: { title: 'My bag', Body: Bag },
  wishlist: { title: 'Wishlist', Body: Wishlist },
  menu: { title: 'Menu', Body: MenuList },
};

/** Side sheet for the bag, the wishlist and the small-screen menu. */
const Panels = ({ panel, onClose }) => {
  // Keeps the last content in place while the sheet slides away.
  const [last, setLast] = useState('bag');
  if (panel && panel !== last) setLast(panel);
  const { title, Body } = panels[panel || last];

  return (
    <Dialog
      open={Boolean(panel)}
      onClose={onClose}
      labelledBy="karafuu-panel"
      closeClassName="karafuu bg-k-ivory text-k-night hover:bg-k-night hover:text-white"
    >
      <div className="karafuu font-parfum text-k-night">
        <Heading id="karafuu-panel" className="text-2xl">{title}</Heading>
        <Body onClose={onClose} />
      </div>
    </Dialog>
  );
};

export default Panels;
