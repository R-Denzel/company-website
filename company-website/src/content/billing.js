// Billing terms supplied by the business and marked approved on 2026-11-27.
export const billingTerms = [
  { id: 'website', service: 'Website development', terms: '50% deposit, 30% on approval of design or staging, 20% before launch.' },
  { id: 'software', service: 'Custom software', terms: '40% deposit, 30% on milestone delivery, 20% at testing, 10% at handover.' },
  { id: 'fintech', service: 'Fintech integrations', terms: '50% deposit, with the remainder against agreed milestones.' },
  { id: 'pos', service: 'Point of sale', terms: 'Setup fee plus a monthly or annual subscription.' },
  { id: 'automation', service: 'AI automation', terms: 'Implementation fee plus optional monthly maintenance.' },
  { id: 'seo', service: 'SEO', terms: 'Monthly retainer, preferably with a three-month initial engagement.' },
  { id: 'localSeo', service: 'Local SEO', terms: 'Monthly retainer.' },
  { id: 'aiSearch', service: 'AI search optimisation', terms: 'One-time audit or monthly retainer.' },
  { id: 'corporate', service: 'Corporate projects', terms: 'Milestone billing set out in the contract.' },
];

export const findTerms = (id) => billingTerms.find((entry) => entry.id === id);

export const billingPolicies = [
  'Quotations are valid for 14 days.',
  'Work begins after the initial deposit clears.',
  'Third-party costs are disclosed separately.',
  'Features outside the agreed scope need a change request and a separate quotation.',
  'Hosting, domains, API usage and software subscriptions are billed separately unless expressly included.',
  'Monthly services are billed in advance.',
  'Annual subscriptions may receive a discount of up to 10% where commercially viable.',
  'Late payment may pause services after reasonable notice.',
  'Project handover takes place after full payment.',
  'The number of revisions and the support period are defined for each package.',
];

export const supportPlans = [
  { name: 'Care Basic', billing: 'Monthly or annual retainer', text: 'Software updates, availability checks where technically supported, a backup check, a limited support allowance and issue triage.' },
  { name: 'Care Plus', billing: 'Monthly retainer', text: 'Care Basic plus a priority support window, routine maintenance, capped minor changes and a monthly service summary.' },
  { name: 'Managed Service', billing: 'Custom monthly contract', text: 'Monitoring, maintenance, incident management, agreed backup and recovery checks, security patch coordination, service reviews and a service level agreement.' },
];
