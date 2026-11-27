import { useEffect } from 'react';
import { Check, Clock } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import PriceCard, { ApprovalNotice } from '../components/PriceCard';
import StatusBadge from '../components/StatusBadge';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { findPackage } from '../content/pricing';
import { findProduct } from '../content/products';
import { logEvent } from '../lib/analytics';
import { useMarket } from '../lib/preferences';

const List = ({ title, note, items, icon }) => {
  const Icon = icon;
  return (
    <div>
      <h2 className="text-row font-medium">{title}</h2>
      <p className="mt-2 text-sm text-muted">{note}</p>
      <ul className="mt-6">
        {items.map((entry) => (
          <li key={entry} data-fade className="flex gap-4 border-t border-line py-4 leading-7">
            <Icon aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-violet" />
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
};

const questions = (product) => [
  [`Is ${product.name} finished?`, `${product.name} is in beta. It can be opened today, and features are still being tested and refined.`],
  ['What does it cost?', product.subscriptions ? 'Proposed subscription tiers are shown on this page. Limits for each tier are still being confirmed.' : 'Pricing has not been published. Talk to us about your needs.'],
  ['How do I get set up and supported?', 'Onboarding, support hours and the support route are agreed with you before you start.'],
  ['How is my data protected?', 'Ask us for the current privacy and security details before storing business or customer information.'],
];

const Detail = ({ product }) => {
  const motion = usePageMotion();
  const market = useMarket();
  const navigate = useNavigate();
  useSeo(`${product.name} · ${product.category}`, product.positioning);

  useEffect(() => {
    logEvent('product_view', { product: product.id });
  }, [product.id]);

  const enquire = (extra = {}) => {
    logEvent('demo_request', { product: product.id });
    navigate('/contact', { state: { enquiry: { market: market.code, product: product.id, ...extra } } });
  };

  return (
    <div ref={motion}>
      <PageIntro
        title={product.name}
        actions={(
          <>
            <Button size="lg" onClick={() => enquire()}>Request a demo</Button>
            <Button size="lg" variant="secondary" href={product.project.url} onClick={() => logEvent('product_cta', { product: product.id, action: 'open_app' })}>Open the beta</Button>
          </>
        )}
      >
        <span className="mb-4 block"><StatusBadge status={product.status} /></span>
        {product.positioning} Who it is for: {product.audience.charAt(0).toLowerCase() + product.audience.slice(1)}
      </PageIntro>

      <figure className="shell m-0">
        <div data-clip className="overflow-hidden rounded-2xl border border-line bg-mist">
          <img src={product.project.image} alt={product.project.alt} width="1440" height="900" decoding="async" className="block w-full" />
        </div>
        <figcaption className="mt-3 text-sm text-muted">Screenshot of the live beta, taken November 2026. Any figures shown are sample or empty data.</figcaption>
      </figure>

      <section className="shell grid gap-16 py-16 sm:py-24 lg:grid-cols-2">
        <List title="Seen in the live app" note="Observed in the public beta." items={product.seen} icon={Check} />
        <List title="Still being confirmed" note="Do not rely on these until we confirm them for you." items={product.unconfirmed} icon={Clock} />
      </section>

      <section className="shell border-t border-line py-16 sm:py-24" aria-labelledby="product-pricing">
        <h2 id="product-pricing" data-split className="text-title font-medium">Pricing</h2>
        {product.subscriptions ? (
          <>
            <div className="mt-6"><ApprovalNotice /></div>
            <p className="mt-4 max-w-2xl text-muted">Monthly subscription, billed in advance, in {market.currency}. Setup, hardware and payment-provider fees are separate; assisted onboarding is optional.</p>
            <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
              {product.subscriptions.map(findPackage).map((entry) => (
                <PriceCard key={entry.id} entry={entry} market={market.code} onChoose={() => enquire({ packageId: entry.id })} />
              ))}
            </div>
          </>
        ) : (
          <div data-fade className="mt-6 max-w-2xl">
            <p className="text-lead text-muted">No price is published yet. Tell us how you would use {product.name} and we will talk it through.</p>
            <Button size="lg" variant="secondary" className="mt-8" onClick={() => enquire()}>Talk to us</Button>
          </div>
        )}
      </section>

      <section className="shell border-t border-line py-16 sm:py-24">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">Questions</h2>
          <dl>
            {questions(product).map(([question, answer]) => (
              <div key={question} data-fade className="border-b border-line py-5 first:pt-0">
                <dt className="text-lg font-semibold">{question}</dt>
                <dd className="mt-2 leading-7 text-muted">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CallToAction title={`See ${product.name} with your own workflow.`} text="A short walkthrough is the quickest way to find out whether it fits.">
        <Button size="lg" variant="light" onClick={() => enquire()}>Request a demo</Button>
        <Button size="lg" variant="glass" to="/products">All products</Button>
      </CallToAction>
    </div>
  );
};

const Product = () => {
  const product = findProduct(useParams().id);
  return product ? <Detail product={product} /> : <Navigate to="/products" replace />;
};

export default Product;
