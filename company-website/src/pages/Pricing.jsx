import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BillingTerms from '../components/BillingTerms';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import MarketSelector from '../components/MarketSelector';
import PageIntro from '../components/PageIntro';
import PriceCard, { ApprovalNotice } from '../components/PriceCard';
import SegmentPicker from '../components/SegmentPicker';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { addons, billingLabels, bundles, findPackage, formatPrice, groups, services } from '../content/pricing';
import { allPillars } from '../content/pillars';
import { findSegment, needs, recommendations, suggestSegment } from '../content/segments';
import { logEvent } from '../lib/analytics';
import { ScrollTrigger } from '../lib/gsap';
import { setSegment, useMarket, usePreferences } from '../lib/preferences';

const Step = ({ number, title, children }) => (
  <div className="mt-14 first:mt-0">
    <h2 className="flex items-baseline gap-4 text-subheading">
      <span className="tabular-nums text-brand-deep">{number}</span>
      {title}
    </h2>
    <div className="mt-6">{children}</div>
  </div>
);

const chip = (isOn) => `min-h-11 rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-300 ${
  isOn ? 'border-brand-deep bg-brand text-ink' : 'border-line hover:border-brand-deep'
}`;

const Pricing = () => {
  const motion = usePageMotion();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const market = useMarket();
  const { segment } = usePreferences();
  const [need, setNeed] = useState('');
  const [complexity, setComplexity] = useState({ manyLocations: false, sensitive: false });
  const [addonIds, setAddonIds] = useState([]);
  useSeo('Pricing', `Indicative ${market.currency} pricing for websites, business systems, fintech, point of sale, automation and SEO in ${market.name}.`);

  const area = allPillars.find((pillar) => pillar.id === params.get('area')) || allPillars[0];
  const wantedSegment = params.get('segment');

  useEffect(() => {
    if (findSegment(wantedSegment)) setSegment(wantedSegment);
  }, [wantedSegment]);

  // Card heights change with the choices, so scroll effects must be measured again.
  useEffect(() => {
    ScrollTrigger.refresh(true);
  }, [segment, need, area.id]);

  const suggestion = segment && suggestSegment(segment, complexity);
  const recommended = segment ? (need ? recommendations[segment][need].map(findPackage) : bundles.filter((entry) => entry.segment === segment)) : [];

  const enquire = (extra) => navigate('/contact', { state: { enquiry: { market: market.code, segment, need, addonIds, ...extra } } });
  const choose = (entry) => enquire({ packageId: entry.id, segment: segment || entry.segment || '' });

  const chooseArea = (id) => {
    logEvent('pricing_group_selected', { group: id });
    const next = new URLSearchParams(params);
    next.set('area', id);
    next.delete('segment');
    setParams(next, { replace: true });
  };

  return (
    <div ref={motion}>
      <PageIntro title="Find the right technology solution.">
        Choose your market and business size to see relevant packages. Final scope and price are confirmed after a consultation.
      </PageIntro>

      <section className="shell section">
        <ApprovalNotice />

        <div className="mt-12">
          <Step number="1" title="Select your market">
            <MarketSelector />
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{market.paymentsNote} Each market has its own price list; amounts are not converted on screen.</p>
          </Step>

          <Step number="2" title="Select your business size">
            <SegmentPicker value={segment} onChange={setSegment} />
            <fieldset className="mt-6">
              <legend className="text-sm leading-6 text-muted">Headcount is only a guide. Tick anything that applies, because complexity can matter more than size.</legend>
              <div className="mt-3 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
                {[['manyLocations', 'We run more than one location or outlet'], ['sensitive', 'We handle complex finances, regulated or sensitive data']].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3">
                    <input type="checkbox" checked={complexity[key]} onChange={(event) => setComplexity((current) => ({ ...current, [key]: event.target.checked }))} className="h-5 w-5 accent-brand-deep" />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
            {suggestion && (
              <div role="status" className="mt-5 flex flex-wrap items-center gap-4 rounded-xl bg-mist px-5 py-4 text-sm">
                <span>Your answers suggest looking at <strong>{findSegment(suggestion).name.toLowerCase()}</strong> options. We will confirm after an assessment.</span>
                <Button variant="primary" onClick={() => setSegment(suggestion)}>Switch</Button>
              </div>
            )}
          </Step>

          <Step number="3" title="What do you need most?">
            <div role="group" aria-label="Main business need" className="flex flex-wrap gap-2">
              {needs.map((option) => (
                <button key={option.id} type="button" aria-pressed={need === option.id} onClick={() => setNeed(need === option.id ? '' : option.id)} className={chip(need === option.id)}>
                  {option.label}
                </button>
              ))}
            </div>
          </Step>
        </div>
      </section>

      <section aria-labelledby="recommended-title" className="bg-mist section">
        <div className="shell">
          <h2 id="recommended-title" className="text-heading">Recommended for you</h2>
          {segment ? (
            <>
              <p role="status" className="mt-3 max-w-2xl text-muted">
                {findSegment(segment).name}, {market.name}. {segment === 'corporate'
                  ? 'Corporate work starts with discovery. Ranges are indicative and the proposal sets the scope.'
                  : 'You can choose a different package or ask for something custom.'}
              </p>
              <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommended.map((entry) => <PriceCard key={entry.id} entry={entry} market={market.code} onChoose={choose} />)}
              </div>
              <div className="mt-8"><Button size="lg" onClick={() => enquire({})}>Request a tailored quotation</Button></div>
            </>
          ) : (
            <p className="mt-3 text-muted">Select your business size above to see recommended packages.</p>
          )}
        </div>
      </section>

      <section id="services" aria-labelledby="all-prices-title" className="shell scroll-mt-24 section">
        <h2 id="all-prices-title" className="text-heading">All service prices in {market.currency}</h2>
        <div role="group" aria-label="Service area" className="mt-8 flex flex-wrap gap-2">
          {allPillars.map((pillar) => (
            <button key={pillar.id} type="button" aria-pressed={area.id === pillar.id} onClick={() => chooseArea(pillar.id)} className={chip(area.id === pillar.id)}>
              {pillar.shortName}
            </button>
          ))}
        </div>

        {groups.filter((group) => area.groups.includes(group.id)).map((group) => (
          <div key={group.id} className="mt-14">
            <h3 className="text-subheading">{group.name}</h3>
            <ul className="mt-3 max-w-3xl space-y-1 text-sm leading-6 text-muted">
              {group.notes.map((note) => <li key={note}>{note}</li>)}
              {group.examples && <li>Examples: {group.examples.join(', ')}.</li>}
            </ul>
            <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.filter((entry) => entry.group === group.id).map((entry) => (
                <PriceCard key={entry.id} entry={entry} market={market.code} onChoose={choose} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section aria-labelledby="addons-title" className="shell border-t border-line section">
        <div className="split">
          <h2 id="addons-title" data-split className="max-w-xl text-heading">Add what you need.</h2>
          <p data-fade className="max-w-xl text-muted">Add-on estimates. Complex integrations are assessed individually. Ticked items travel with your enquiry.</p>
        </div>
        <ul className="mt-10">
          {addons.map((entry) => (
            <li key={entry.id} className="border-t border-line">
              <label className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
                <input
                  type="checkbox"
                  checked={addonIds.includes(entry.id)}
                  onChange={(event) => setAddonIds((current) => (event.target.checked ? [...current, entry.id] : current.filter((id) => id !== entry.id)))}
                  className="h-5 w-5 accent-brand-deep"
                />
                <span className="flex-1 font-medium">{entry.name}</span>
                <span className="tabular-nums">{formatPrice(entry.price, market.code)}</span>
                <span className="w-28 text-sm text-muted sm:text-right">{billingLabels[entry.billing]}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button size="lg" onClick={() => enquire({})}>{addonIds.length ? `Enquire with ${addonIds.length} add-on${addonIds.length > 1 ? 's' : ''}` : 'Ask about an add-on'}</Button>
        </div>
      </section>

      <BillingTerms />

      <CallToAction title="Need something custom?" text="Tell us the problem. We will recommend a package or scope a proposal.">
        <Button size="lg" onClick={() => enquire({ service: 'Something custom' })}>{market.quoteCta}</Button>
      </CallToAction>
    </div>
  );
};

export default Pricing;
