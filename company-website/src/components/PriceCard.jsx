import { Check } from 'lucide-react';
import Button from './Button';
import { billingLabels, findGroup, formatPrice, priceStatus, PRICING_APPROVED } from '../content/pricing';
import { findTerms } from '../content/billing';
import { findSegment } from '../content/segments';
import { logEvent } from '../lib/analytics';

/** Shown wherever amounts appear until the owner approves them. */
export const ApprovalNotice = () => (PRICING_APPROVED ? null : (
  <p role="note" className="rounded-lg border border-brand-deep bg-paper px-4 py-3 text-sm leading-6">
    <strong className="font-medium">Proposed pricing, awaiting approval.</strong> These figures are indicative and are not final quotations.
  </p>
));

const ctaFor = (entry) => {
  if (entry.segment === 'corporate' || !entry.price) return 'Book a discovery call';
  return entry.group === 'myduka' ? 'Talk to us' : 'Request a quote';
};

/** One package with its price, billing basis, scope and limits. */
const PriceCard = ({ entry, market, onChoose }) => {
  const group = findGroup(entry.group);
  const terms = findTerms(group?.terms || (entry.segment === 'corporate' ? 'corporate' : ''));
  const segment = findSegment(entry.segment);

  return (
    <article className="flex flex-col rounded-xl border border-line bg-paper p-6 sm:p-7">
      {segment && <p className="mb-2 text-sm text-muted">Best for: {segment.name.toLowerCase()}</p>}
      <h3 className="text-subheading">{entry.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{entry.summary}</p>

      <p className="mt-6 text-subheading font-medium tabular-nums">{formatPrice(entry.price, market)}</p>
      <p className="mt-2 text-sm text-muted">{billingLabels[entry.billing]} · {priceStatus(entry.price)}</p>

      <div className="mt-5 border-t border-line pt-5">
        {entry.includes ? (
          <ul className="space-y-2.5">
            {entry.includes.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-deep" />
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-6">Scope and deliverables are confirmed in your quotation.</p>
        )}
      </div>

      <dl className="mt-5 space-y-2 text-sm leading-6">
        <div><dt className="inline font-medium">Revisions: </dt><dd className="inline text-muted">{entry.revisions || 'Set out in your quotation'}</dd></div>
        <div><dt className="inline font-medium">Support and timeline: </dt><dd className="inline text-muted">Set out in your quotation</dd></div>
        <div><dt className="inline font-medium">Billed separately: </dt><dd className="inline text-muted">Third-party charges unless expressly included</dd></div>
        {terms && <div><dt className="inline font-medium">Payment: </dt><dd className="inline text-muted">{terms.terms}</dd></div>}
      </dl>

      <div className="mt-auto pt-6">
        <Button
          variant="secondary"
          className="w-full !justify-between"
          onClick={() => {
            logEvent('package_selected', { package: entry.id, market });
            onChoose(entry);
          }}
        >
          {ctaFor(entry)}
        </Button>
      </div>
    </article>
  );
};

export default PriceCard;
