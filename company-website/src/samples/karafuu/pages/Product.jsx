import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Collapse from '../../../components/Collapse';
import Carousel from '../components/Carousel';
import { WishButton } from '../components/ProductCard';
import { Heading, ShopButton } from '../components/ui';
import { audienceLabel, BASE, collectionPath, findProduct, formatPrice, products } from '../data';
import { addToBag } from '../store';

const views = ['Bottle', 'On stone', 'Close up'];

const Gallery = ({ product }) => {
  const [view, setView] = useState(0);

  return (
    <div className="relative">
      <div className="relative mx-auto aspect-square w-full max-w-3xl">
        {product.images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={index === view ? `${product.name}: ${views[index].toLowerCase()}` : ''}
            aria-hidden={index !== view}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-700 ease-soft ${
              index === view ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          />
        ))}
      </div>
      <div role="group" aria-label="Choose a picture" className="mt-4 flex justify-center gap-3">
        {product.images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={views[index]}
            aria-pressed={view === index}
            onClick={() => setView(index)}
            className={`h-20 w-16 overflow-hidden border transition-colors duration-300 ${view === index ? 'border-k-gold' : 'border-white/20 hover:border-white/60'}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

const Details = ({ product }) => {
  const [open, setOpen] = useState('');
  const sections = [
    { id: 'details', title: 'Product details', body: `${product.volume} eau de parfum at ${product.concentration} concentration. ${product.family} family.` },
    { id: 'notes', title: 'Notes', body: Object.entries(product.notes).map(([level, notes]) => `${level}: ${notes.join(', ')}`).join('. ') },
    { id: 'delivery', title: 'Delivery', body: 'A real shop would explain delivery areas, timing and costs here. Nothing is shipped from this demonstration.' },
    { id: 'gifting', title: 'Gifting', body: 'A real shop would offer gift wrapping and a handwritten card here.' },
  ];

  return (
    <ul className="mt-10 border-t border-white/15">
      {sections.map((section) => {
        const isOpen = open === section.id;
        return (
          <li key={section.id} className="border-b border-white/15">
            <button type="button" aria-expanded={isOpen} aria-controls={`detail-${section.id}`} onClick={() => setOpen(isOpen ? '' : section.id)} className="flex w-full items-center justify-between gap-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em]">
              {section.title}
              <Plus aria-hidden="true" className={`h-4 w-4 text-k-gold transition-transform duration-500 ease-soft ${isOpen ? 'rotate-45' : ''}`} />
            </button>
            <Collapse open={isOpen} id={`detail-${section.id}`}>
              <p className="pb-5 text-sm leading-7 text-white/75">{section.body}</p>
            </Collapse>
          </li>
        );
      })}
    </ul>
  );
};

const Product = () => {
  const product = findProduct(useParams().id);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return <Navigate to={collectionPath()} replace />;

  return (
    <>
      <section className="on-ink bg-k-night pb-16 pt-6 text-white">
        <div className="shell">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              <li><Link to={BASE} className="text-link">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to={collectionPath(`?for=${product.audience}`)} className="text-link">{audienceLabel(product.audience)}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-k-gold">{product.name}</li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-16">
            <Gallery product={product} />
            <div>
              <Heading as="h1" data-split data-delay="0.2" className="text-[clamp(1.7rem,3vw,2.5rem)]">{product.name}</Heading>
              <p className="mt-3 text-xl tabular-nums text-[#e5c88f]">{formatPrice(product.price)}</p>
              <p className="text-sm text-white/60">Sample price</p>
              <p data-fade className="mt-6 text-base leading-8 text-white/85">{product.description}</p>
              <dl className="mt-6 flex gap-10 text-sm">
                <div><dt className="text-white/60">Volume</dt><dd className="mt-1">{product.volume}</dd></div>
                <div><dt className="text-white/60">Concentration</dt><dd className="mt-1">{product.concentration}</dd></div>
              </dl>
              <div className="mt-8 flex gap-3">
                <ShopButton
                  tone="outline-light"
                  className="flex-1"
                  onClick={() => {
                    addToBag(product.id);
                    setJustAdded(true);
                    window.setTimeout(() => setJustAdded(false), 2200);
                  }}
                >
                  {justAdded ? <><Check aria-hidden="true" className="h-4 w-4" /> Added to bag</> : 'Add to bag'}
                </ShopButton>
                <WishButton product={product} className="border border-white/40 hover:border-white" />
              </div>
              <p role="status" className="sr-only">{justAdded ? `${product.name} added to your bag` : ''}</p>
              <Details product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <Heading data-split className="text-xl text-k-bronze">The inspiration</Heading>
          <p data-scrub className="mt-8 max-w-md text-2xl leading-relaxed">{product.inspiration}</p>
          <dl className="mt-14 grid w-full max-w-lg grid-cols-3 gap-4">
            {Object.entries(product.notes).map(([level, notes]) => (
              <div key={level} data-fade className="border-t border-k-line pt-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-k-smoke">{level}</dt>
                {notes.map((note) => (
                  <dd key={note} className="mt-2 text-sm">
                    <Link to={collectionPath(`?note=${encodeURIComponent(note)}`)} className="text-link">{note}</Link>
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
        <div className="overflow-hidden bg-k-night">
          <img data-clip src={product.images[1]} alt={`${product.name} bottle on a dark stone`} width="900" height="1200" loading="lazy" decoding="async" className="h-full max-h-[56rem] w-full object-cover" />
        </div>
      </section>

      <Carousel id="more" title="You may also like" items={products.filter((item) => item.id !== product.id)} />
    </>
  );
};

export default Product;
