// Proposed pricing, taken from the commercial strategy supplied on 2026-11-27.
// Nothing here is a final quotation. See IMPLEMENTATION.md before changing it.

/** Set to true only when the business owner has approved the figures for publication. */
export const PRICING_APPROVED = false;

// Prices are [KES low, KES high, UGX low, UGX high]. `from` has no upper figure.
const range = (keLow, keHigh, ugLow, ugHigh) => ({ ke: [keLow, keHigh], ug: [ugLow, ugHigh] });
const fixed = (ke, ug) => ({ ke: [ke, ke], ug: [ug, ug] });
const from = (ke, ug) => ({ ke: [ke], ug: [ug], isFrom: true });
const quote = null;

export const billingLabels = {
  project: 'One-time project fee',
  setup: 'One-time setup fee',
  oneTime: 'One-time fee',
  monthly: 'Per month',
  contract: 'Contract milestones',
};

const thirdParty = 'Hosting, domains, API usage, software subscriptions and other third-party charges are billed separately unless expressly included.';
const fintechSafeguard = 'Transaction fees, provider charges, certification, security audits and regulatory costs are separate. FutureTech Africa is not a licensed payment provider or financial institution.';
const searchSafeguard = 'No ranking position, traffic, citation or AI-answer inclusion is guaranteed.';

export const groups = [
  {
    id: 'web', pillar: 'software-engineering', name: 'Web and mobile development', terms: 'website',
    notes: [thirdParty, 'Payment gateway charges, domain renewals and hosting are disclosed separately.'],
  },
  {
    id: 'business', pillar: 'business-systems', name: 'Custom software and business systems', terms: 'software',
    notes: [thirdParty],
    examples: ['Inventory management', 'Employee management', 'Booking systems', 'School management', 'Customer portals', 'Reporting dashboards', 'Workflow management'],
  },
  {
    id: 'fintech', pillar: 'fintech-payments', name: 'Fintech and digital payments', terms: 'fintech',
    notes: [fintechSafeguard],
    examples: ['Mobile money integrations', 'Payment collection and reconciliation', 'Merchant dashboards', 'Transaction reporting', 'Digital wallets and expense management', 'Financial management integrations'],
  },
  {
    id: 'pos', pillar: 'fintech-payments', name: 'Point of sale', terms: 'pos',
    notes: ['Hardware and payment-provider transaction fees are separate.'],
  },
  {
    id: 'myduka', pillar: 'fintech-payments', name: 'MyDuka subscriptions', terms: 'pos',
    notes: ['Tiers depend on features, users, outlets, support and reporting limits, which are being confirmed. Assisted onboarding is optional.'],
  },
  {
    id: 'ai', pillar: 'ai-automation', name: 'AI-assisted automation', terms: 'automation',
    notes: ['Monthly maintenance and AI usage are charged separately where applicable.'],
  },
  {
    id: 'seo', pillar: 'growth', name: 'SEO optimisation', terms: 'seo',
    notes: ['A minimum engagement of three months is recommended.', searchSafeguard],
  },
  {
    id: 'local-seo', pillar: 'growth', name: 'Local SEO', terms: 'localSeo',
    notes: ['Includes Google Business Profile optimisation, local keyword targeting, listing consistency, review-management guidance and local performance reporting. What each tier includes is confirmed in your quotation.', searchSafeguard],
  },
  {
    id: 'ai-search', pillar: 'growth', name: 'AI search optimisation', terms: 'aiSearch',
    notes: ['Covers structured content, entity consistency, technical improvements, FAQs, schema markup where appropriate and monitoring of brand visibility in supported AI search experiences. What each tier includes is confirmed in your quotation.', searchSafeguard],
  },
];

const item = (id, group, name, price, billing, extra = {}) => ({ id, group, name, price, billing, ...extra });

export const services = [
  item('web-starter', 'web', 'Starter website', range(35000, 60000, 950000, 1650000), 'project', {
    summary: 'A contained website that puts your business online.',
    includes: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Basic SEO', 'Basic analytics'], revisions: 'One revision round',
  }),
  item('web-business', 'web', 'Business website', range(70000, 140000, 1900000, 3800000), 'project', {
    summary: 'A website you can manage that collects enquiries.',
    includes: ['Up to 10 pages', 'Content management system', 'WhatsApp integration', 'Lead forms', 'Analytics', 'Basic SEO'], revisions: 'Two revision rounds',
  }),
  item('web-professional', 'web', 'Professional website', range(150000, 280000, 4000000, 7600000), 'project', {
    summary: 'A richer website with integrations and more complex functionality.',
    includes: ['Advanced design', 'Content management system', 'Integrations', 'More complex functionality', 'Analytics and testing'],
  }),
  item('web-ecommerce', 'web', 'E-commerce website', range(180000, 400000, 4900000, 10900000), 'project', {
    summary: 'An online shop with checkout and order handling.',
    includes: ['Product catalogue', 'Cart', 'Checkout integration', 'Order management', 'Basic inventory'],
  }),
  item('web-app', 'web', 'Custom web application', from(250000, 6800000), 'project', {
    summary: 'A web application scoped to your users, features, integrations and security needs.',
  }),
  item('mobile-app', 'web', 'Mobile application', from(400000, 10900000), 'project', {
    summary: 'A mobile app scoped to your users, features, integrations and security needs.',
  }),

  item('process-assessment', 'business', 'Business process assessment', range(10000, 25000, 275000, 680000), 'oneTime', { summary: 'A review of how work happens today, before anything is built.' }),
  item('basic-management', 'business', 'Basic management system', range(80000, 180000, 2200000, 4900000), 'project', { summary: 'A focused system for one part of your operations.' }),
  item('crm', 'business', 'CRM or customer management', range(100000, 250000, 2700000, 6800000), 'project', { summary: 'Keep customer records and follow-ups in one place.' }),
  item('inventory-operations', 'business', 'Inventory and operations system', range(120000, 300000, 3300000, 8200000), 'project', { summary: 'Control stock and daily operations with clear reporting.' }),
  item('multi-department', 'business', 'Multi-department business system', range(300000, 800000, 8200000, 21800000), 'project', { summary: 'One system shared across several teams.' }),
  item('enterprise-software', 'business', 'Enterprise software', quote, 'contract', { summary: 'Scoped after discovery.' }),

  item('payment-assessment', 'fintech', 'Payment integration assessment', range(10000, 25000, 275000, 680000), 'oneTime', { summary: 'Find the right payment route before building.' }),
  item('gateway-integration', 'fintech', 'Payment gateway integration', range(35000, 90000, 950000, 2450000), 'project', { summary: 'Take payments through a third-party gateway.' }),
  item('mobile-money', 'fintech', 'Mobile money integration', range(50000, 150000, 1350000, 4100000), 'project', { summary: 'Connect mobile money collection to your product.' }),
  item('payment-reconciliation', 'fintech', 'Payment reconciliation system', range(100000, 250000, 2700000, 6800000), 'project', { summary: 'Match payments to records and find exceptions.' }),
  item('merchant-dashboard', 'fintech', 'Merchant payment dashboard', range(120000, 300000, 3300000, 8200000), 'project', { summary: 'See merchant transactions and reports in one place.' }),
  item('fintech-platform', 'fintech', 'Custom fintech platform', quote, 'contract', { summary: 'Scoped after discovery.' }),

  item('pos-basic', 'pos', 'Basic POS setup', range(15000, 35000, 400000, 950000), 'setup', { summary: 'Start selling with a point of sale.' }),
  item('pos-inventory', 'pos', 'POS with inventory', range(35000, 75000, 950000, 2050000), 'setup', { summary: 'Sell and track stock together.' }),
  item('pos-multi', 'pos', 'Multi-outlet POS setup', range(80000, 180000, 2200000, 4900000), 'setup', { summary: 'Point of sale across several outlets.' }),
  item('pos-custom', 'pos', 'Custom POS development', from(200000, 5500000), 'project', { summary: 'A point of sale built around your workflow.' }),

  item('myduka-starter', 'myduka', 'MyDuka Starter', fixed(1500, 40000), 'monthly', { summary: 'Entry subscription for MyDuka.' }),
  item('myduka-business', 'myduka', 'MyDuka Business', fixed(3000, 80000), 'monthly', { summary: 'Mid-level subscription for MyDuka.' }),
  item('myduka-multi', 'myduka', 'MyDuka Multi-outlet', from(6000, 160000), 'monthly', { summary: 'Subscription for several outlets.' }),

  item('automation-assessment', 'ai', 'Automation assessment', range(10000, 20000, 275000, 550000), 'oneTime', { summary: 'Identify the repetitive work worth removing.' }),
  item('basic-workflow', 'ai', 'Basic workflow automation', range(25000, 60000, 680000, 1650000), 'setup', { summary: 'Automate one repetitive process.' }),
  item('whatsapp-automation', 'ai', 'WhatsApp and business automation', range(40000, 100000, 1100000, 2700000), 'setup', { summary: 'Automate customer messages and routine steps.' }),
  item('ai-chatbot', 'ai', 'AI chatbot implementation', range(60000, 150000, 1650000, 4100000), 'setup', { summary: 'An assistant for common enquiries.' }),
  item('multi-workflow', 'ai', 'Multi-workflow automation', range(150000, 350000, 4100000, 9500000), 'setup', { summary: 'Several connected automations.' }),
  item('enterprise-automation', 'ai', 'Enterprise AI automation', quote, 'contract', { summary: 'Scoped after discovery.' }),

  item('seo-starter', 'seo', 'SEO Starter', fixed(10000, 275000), 'monthly', { summary: 'A monthly search foundation.', includes: ['Technical audit', 'Basic on-page SEO', 'Keyword research', 'Monthly report'] }),
  item('seo-growth', 'seo', 'SEO Growth', fixed(25000, 680000), 'monthly', { summary: 'Ongoing content and keyword work.', includes: ['Everything in Starter', 'Content optimisation', 'Keyword tracking', 'Google Search Console monitoring'] }),
  item('seo-professional', 'seo', 'SEO Professional', fixed(45000, 1225000), 'monthly', { summary: 'A fuller search programme.', includes: ['Content strategy', 'Technical improvements', 'Competitor analysis', 'Backlink strategy', 'Reporting'] }),
  item('seo-enterprise', 'seo', 'Enterprise SEO', from(80000, 2200000), 'monthly', { summary: 'For several websites or markets.', includes: ['Multiple websites or markets', 'Advanced reporting', 'Dedicated SEO strategy'] }),

  item('local-starter', 'local-seo', 'Local Starter', fixed(5000, 135000), 'monthly', { summary: 'Be found by nearby customers.' }),
  item('local-growth', 'local-seo', 'Local Growth', fixed(12000, 325000), 'monthly', { summary: 'Broader local visibility work.' }),
  item('local-professional', 'local-seo', 'Local Professional', fixed(25000, 680000), 'monthly', { summary: 'Deeper work for competitive areas.' }),

  item('ai-audit', 'ai-search', 'AI visibility audit', fixed(10000, 275000), 'oneTime', { summary: 'See how clearly AI search tools can read your business.' }),
  item('ai-search-starter', 'ai-search', 'AI Search Starter', fixed(10000, 275000), 'monthly', { summary: 'Ongoing clarity and structure improvements.' }),
  item('ai-search-growth', 'ai-search', 'AI Search Growth', fixed(20000, 550000), 'monthly', { summary: 'More content and entity work each month.' }),
  item('ai-search-authority', 'ai-search', 'AI Search Authority', fixed(40000, 1100000), 'monthly', { summary: 'The broadest ongoing programme.' }),
];

const bundle = (id, segment, name, price, billing, summary, includes) => ({ id, segment, name, price, billing, summary, includes, isBundle: true });

export const bundles = [
  bundle('digital-presence', 'small', 'Digital Presence', range(45000, 75000, 1200000, 2000000), 'project', 'A credible online presence.',
    ['Professional starter website', 'Contact and WhatsApp integration', 'Basic SEO', 'Analytics setup']),
  bundle('business-essentials', 'small', 'Business Essentials', range(65000, 110000, 1800000, 3000000), 'project', 'Get found and keep track of enquiries.',
    ['Business website', 'Customer enquiry management', 'Google Business Profile setup', 'Basic business reporting', 'Optional POS or inventory setup']),
  bundle('business-automation', 'small', 'Business Automation', range(40000, 80000, 1100000, 2200000), 'setup', 'Remove one or two repetitive jobs.',
    ['One or two simple automated workflows', 'Customer enquiry automation', 'Automated notifications', 'Basic staff training']),
  bundle('business-growth', 'growing', 'Business Growth', range(120000, 220000, 3300000, 6000000), 'project', 'Win more customers and follow them up.',
    ['Professional website', 'SEO and lead generation setup', 'CRM or customer management', 'Analytics dashboard']),
  bundle('business-operations', 'growing', 'Business Operations', range(180000, 350000, 4900000, 9500000), 'project', 'Run stock, customers and workflows with reporting.',
    ['Inventory or operations system', 'Customer management', 'Workflow automation', 'Reporting dashboard', 'Staff onboarding']),
  bundle('digital-transformation', 'growing', 'Digital Transformation', range(300000, 650000, 8200000, 17700000), 'project', 'A custom application connected to your tools.',
    ['Custom business application', 'Payment integrations where required', 'Workflow automation', 'Reporting and analytics', 'Integration with existing business tools']),
  bundle('corporate-assessment', 'corporate', 'Technology assessment', range(50000, 100000, 1400000, 2700000), 'contract', 'Understand requirements, options and risks before building.',
    ['Stakeholder workshops', 'Current-state assessment and requirements', 'Process maps and architecture options', 'Integration inventory and risk register', 'Phased roadmap and estimate']),
  bundle('corporate-integration', 'corporate', 'Systems integration project', range(300000, 800000, 8200000, 21800000), 'contract', 'Connect systems and move data reliably.',
    ['API assessment and integration design', 'Data mapping and connector development', 'Reconciliation and error handling', 'Testing, monitoring and documentation']),
  { ...bundle('corporate-software', 'corporate', 'Enterprise software project', { ke: [800000, 3000000], ug: [21800000, 82000000], isOpen: true }, 'contract', 'Bespoke software delivered in milestones.',
    ['Product discovery, user experience and architecture', 'Custom development, integration and migration', 'Testing and security review', 'Deployment, documentation, training and handover']) },
  bundle('corporate-support', 'corporate', 'Ongoing technical support', range(50000, 200000, 1400000, 5500000), 'monthly', 'A retainer with agreed support and response levels.',
    ['Defined support hours and incident priorities', 'Maintenance windows', 'Backups and monitoring where agreed', 'Patching and service reviews', 'Change request process']),
];

const addon = (id, name, price, billing = 'oneTime') => ({ id, name, price, billing });

export const addons = [
  addon('addon-whatsapp', 'WhatsApp integration', range(5000, 15000, 135000, 410000)),
  addon('addon-page', 'Additional website page', range(2000, 5000, 55000, 135000)),
  addon('addon-gateway', 'Payment gateway integration (add-on)', range(15000, 40000, 410000, 1100000)),
  addon('addon-analytics', 'Analytics dashboard', range(15000, 40000, 410000, 1100000)),
  addon('addon-training', 'Staff training', range(5000, 15000, 135000, 410000)),
  addon('addon-maintenance', 'Website maintenance', range(3000, 10000, 80000, 275000), 'monthly'),
  addon('addon-workflow', 'Additional automation workflow', range(10000, 30000, 275000, 820000)),
];

export const allPackages = [...bundles, ...services];
export const findPackage = (id) => allPackages.find((entry) => entry.id === id);
export const findGroup = (id) => groups.find((group) => group.id === id);

const money = (value, market) => `${market === 'ke' ? 'KES' : 'UGX'} ${value.toLocaleString('en-US')}`;

export const formatPrice = (price, market) => {
  if (!price) return 'Custom quotation';
  const [low, high] = price[market];
  if (price.isFrom) return `From ${money(low, market)}`;
  if (low === high) return money(low, market);
  return `${money(low, market)} – ${high.toLocaleString('en-US')}${price.isOpen ? '+' : ''}`;
};

export const priceStatus = (price) => {
  if (!price) return 'Quoted after discovery';
  if (price.isFrom) return 'Indicative starting price';
  return price.ke[0] === price.ke[1] ? 'Indicative price' : 'Indicative range';
};
