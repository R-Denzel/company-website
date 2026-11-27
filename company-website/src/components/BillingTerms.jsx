import { billingPolicies, billingTerms, supportPlans } from '../content/billing';

/** The plain-language "How billing works" panel. */
const BillingTerms = () => (
  <section id="billing" aria-labelledby="billing-title" className="shell scroll-mt-24 border-t border-line py-16 sm:py-24">
    <div className="split">
      <h2 id="billing-title" data-split className="max-w-md text-title font-medium">How billing works.</h2>
      <p data-fade className="max-w-xl text-lead text-muted">
        These are our standard terms. Your signed quotation sets out the exact scope, amounts, tax treatment and milestones.
      </p>
    </div>

    <dl className="mt-12">
      {billingTerms.map((entry) => (
        <div key={entry.id} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[0.4fr_0.6fr] sm:gap-8">
          <dt className="font-semibold">{entry.service}</dt>
          <dd className="text-muted">{entry.terms}</dd>
        </div>
      ))}
    </dl>

    <div className="split mt-16">
      <div>
        <h3 className="text-row font-medium">Across every service</h3>
        <ul className="mt-6 space-y-3 text-base leading-7 text-muted">
          {billingPolicies.map((policy) => <li key={policy} className="border-b border-line pb-3">{policy}</li>)}
          <li className="border-b border-line pb-3">Tax treatment is confirmed in your quotation.</li>
        </ul>
      </div>
      <div>
        <h3 className="text-row font-medium">Support plans</h3>
        <ul className="mt-6 space-y-4">
          {supportPlans.map((plan) => (
            <li key={plan.name} className="rounded-2xl bg-mist p-6">
              <p className="text-lg font-semibold">{plan.name}</p>
              <p className="mt-1 text-sm font-semibold text-violet-deep">{plan.billing} · Priced in your quotation</p>
              <p className="mt-3 text-sm leading-6 text-muted">{plan.text} Support hours and response targets are stated in the agreement.</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default BillingTerms;
