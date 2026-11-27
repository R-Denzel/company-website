import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import PriceCard, { ApprovalNotice } from '../components/PriceCard';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { markets, whatsappLink } from '../content/markets';
import { bundles } from '../content/pricing';
import { logEvent } from '../lib/analytics';
import { setMarket, usePreferences } from '../lib/preferences';

/** Landing page for one country. Visiting it selects that market. */
const Market = ({ code }) => {
  const market = markets[code];
  const motion = usePageMotion();
  const navigate = useNavigate();
  useSeo(`${market.name}: software, payments and business systems`, `${market.headline} Indicative prices in ${market.currency}.`);

  const selected = usePreferences().market;
  const hasSynced = useRef(false);

  useEffect(() => {
    setMarket(code);
  }, [code]);

  // Choosing the other market while here moves to that country's page, so the
  // copy, currency and contact route always change together.
  useEffect(() => {
    if (selected === code) hasSynced.current = true;
    else if (hasSynced.current) navigate(markets[selected].path);
  }, [selected, code, navigate]);

  return (
    <div ref={motion}>
      <PageIntro
        title={market.headline}
        actions={(
          <>
            <Button size="lg" to="/pricing">See {market.currency} pricing</Button>
            <Button
              size="lg"
              variant="secondary"
              icon={MessageCircle}
              href={whatsappLink(code, `Hello FutureTech Africa, I am enquiring from ${market.name}.`)}
              onClick={() => logEvent('whatsapp_click', { market: code, from: 'market_page' })}
            >
              {market.teamCta}
            </Button>
          </>
        )}
      >
        {market.summary} {market.paymentsNote}
      </PageIntro>

      <section className="shell py-16 sm:py-24" aria-labelledby="market-bundles">
        <h2 id="market-bundles" data-split className="text-title font-medium">Starting bundles in {market.currency}</h2>
        <div className="mt-6"><ApprovalNotice /></div>
        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
          {bundles.filter((entry) => entry.segment === 'small').map((entry) => (
            <PriceCard key={entry.id} entry={entry} market={code} onChoose={(chosen) => navigate('/contact', { state: { enquiry: { market: code, segment: 'small', packageId: chosen.id } } })} />
          ))}
        </div>
      </section>

      <CallToAction title="Bigger or more complex?" text="See growing-business bundles and discovery-led corporate work.">
        <Button size="lg" variant="light" to="/pricing?segment=growing">Growing business</Button>
        <Button size="lg" variant="glass" to="/pricing?segment=corporate">Corporate or institution</Button>
      </CallToAction>
    </div>
  );
};

export default Market;
