import { ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import { ApprovalNotice } from '../components/PriceCard';
import StatusBadge from '../components/StatusBadge';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { findPillar } from '../content/pillars';
import { billingLabels, formatPrice, groups, services } from '../content/pricing';
import { findProduct } from '../content/products';
import { useMarket } from '../lib/preferences';

const Detail = ({ pillar }) => {
  const motion = usePageMotion();
  const market = useMarket();
  const navigate = useNavigate();
  useSeo(pillar.name, pillar.summary);

  const related = pillar.products.map(findProduct).filter(Boolean);

  return (
    <div ref={motion}>
      <PageIntro
        title={pillar.name}
        actions={(
          <>
            <Button size="lg" onClick={() => navigate('/contact', { state: { enquiry: { market: market.code, service: pillar.name } } })}>{market.quoteCta}</Button>
            <Button size="lg" variant="secondary" to={`/pricing?area=${pillar.id}#services`}>Compare plans</Button>
          </>
        )}
      >
        {pillar.description}
      </PageIntro>

      <section className="shell section">
        <div className="split">
          <h2 data-split className="max-w-xl text-heading">What you can buy.</h2>
          <ul>
            {pillar.deliverables.map((entry) => <li key={entry} data-fade className="border-b border-line py-4 first:pt-0">{entry}</li>)}
            {pillar.comingSoon?.map((entry) => <li key={entry} data-fade className="border-b border-line py-4 text-muted">{entry} <span className="ml-2 text-sm text-muted">Coming soon</span></li>)}
          </ul>
        </div>
      </section>

      <section className="shell pb-16 sm:pb-24" aria-labelledby="solution-prices">
        <h2 id="solution-prices" data-split className="text-heading">Prices in {market.currency}</h2>
        <div className="mt-6"><ApprovalNotice /></div>
        {groups.filter((group) => pillar.groups.includes(group.id)).map((group) => (
          <div key={group.id} className="mt-12">
            <h3 className="text-subheading">{group.name}</h3>
            <ul className="mt-4">
              {services.filter((entry) => entry.group === group.id).map((entry) => (
                <li key={entry.id} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[1fr_auto_11rem] sm:items-baseline sm:gap-8">
                  <span className="font-medium">{entry.name}</span>
                  <span className="tabular-nums">{formatPrice(entry.price, market.code)}</span>
                  <span className="text-sm text-muted sm:text-right">{billingLabels[entry.billing]}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-3 max-w-3xl space-y-1 text-sm leading-6 text-muted">
              {group.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        ))}
        <div className="mt-8"><Button variant="secondary" to={`/pricing?area=${pillar.id}#services`}>See inclusions and billing terms</Button></div>
      </section>

      {related.length > 0 && (
        <section className="shell border-t border-line section">
          <h2 data-split className="text-heading">Related products</h2>
          <ul className="mt-10">
            {related.map((product) => (
              <li key={product.id} className="border-t border-line">
                <Link to={`/products/${product.id}`} className="group flex flex-wrap items-center gap-x-5 gap-y-2 py-6">
                  <span className="text-subheading">{product.name}</span>
                  <StatusBadge status={product.status} />
                  <span className="flex-1 text-muted">{product.category}</span>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform duration-500 ease-soft group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CallToAction title="Talk through your project." text="Share what you need and what you use today. We will confirm scope before any price is final.">
        <Button size="lg" onClick={() => navigate('/contact', { state: { enquiry: { market: market.code, service: pillar.name } } })}>Book a discovery call</Button>
        <Button size="lg" variant="secondary" to="/solutions">All solutions</Button>
      </CallToAction>
    </div>
  );
};

const Solution = () => {
  const pillar = findPillar(useParams().id);
  return pillar ? <Detail pillar={pillar} /> : <Navigate to="/solutions" replace />;
};

export default Solution;
