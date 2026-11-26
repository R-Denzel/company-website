import { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import { formatPrice } from './products';

/** Details and a pretend enquiry. Nothing is transmitted: this is a demo shop. */
const ProductDialog = ({ product, open, onClose }) => {
  const [view, setView] = useState('details');
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setView('details');
  }

  return (
    <Dialog open={open} onClose={onClose} labelledBy="product-title" closeLabel="Close product details">
      {product && (
        <>
          <h2 id="product-title" className="text-title font-medium">{product.name}</h2>
          <p className="mt-3 text-lead text-muted">{product.description}</p>

          {view === 'details' && (
            <>
              <div className="mt-8 rounded-2xl" style={{ background: `linear-gradient(160deg, ${product.backdrop[0]}, ${product.backdrop[1]})` }}>
                <img src={product.image} alt={`${product.name}, shown from the front`} width="800" height="600" decoding="async" className="w-full" />
              </div>
              <dl className="mt-6">
                {product.specs.map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-6 border-b border-line py-3.5">
                    <dt className="text-muted">{term}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                <p>
                  <span className="block text-3xl font-medium tracking-[-0.03em] tabular-nums">{formatPrice(product.price)}</span>
                  <span className="text-sm text-muted">Sample price</span>
                </p>
                <Button size="lg" onClick={() => setView('enquiry')}>Enquire about this device</Button>
              </div>
            </>
          )}

          {view === 'enquiry' && (
            <form
              className="mt-8 space-y-8"
              onSubmit={(event) => {
                event.preventDefault();
                setView('sent');
              }}
            >
              <p className="rounded-xl bg-mist p-4 text-sm leading-6">
                This is a sample website. The form shows how an enquiry would work, and nothing you type is sent or stored.
              </p>
              <label className="block text-sm font-medium">
                Your name *
                <input required autoComplete="off" className="field" />
              </label>
              <label className="block text-sm font-medium">
                Phone or email *
                <input required autoComplete="off" className="field" />
              </label>
              <div className="flex flex-wrap gap-3">
                <Button type="submit" size="lg">Try the enquiry</Button>
                <Button variant="ghost" size="lg" arrow={false} onClick={() => setView('details')}>Back to details</Button>
              </div>
            </form>
          )}

          {view === 'sent' && (
            <div role="status" className="mt-8">
              <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-violet text-paper"><Check className="h-6 w-6" /></span>
              <p className="mt-6 text-lead">That is how it would work. Nothing was sent, because Voltway is a demo.</p>
              <Button size="lg" variant="secondary" arrow={false} className="mt-8" onClick={onClose}>Keep browsing</Button>
            </div>
          )}
        </>
      )}
    </Dialog>
  );
};

export default ProductDialog;
