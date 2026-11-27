// A guide to solution complexity, not a legal or financial classification.
export const segments = [
  {
    id: 'small',
    name: 'Small business',
    size: '1–10 employees',
    profile: 'One location, relatively simple operations and a limited technology budget.',
    voice: 'I need practical tools to get organised, reach customers and run day-to-day operations.',
    needs: 'Website, digital presence, basic automation, point of sale.',
    cta: 'Request a quote',
  },
  {
    id: 'growing',
    name: 'Growing business',
    size: '11–50 employees',
    profile: 'Several departments or outlets, with more customers and transactions to manage.',
    voice: 'My business is expanding. I need connected systems, better reporting and workflows that scale.',
    needs: 'Integrated systems, e-commerce, CRM, automation, reporting.',
    cta: 'Request a quote',
  },
  {
    id: 'corporate',
    name: 'Corporate or institution',
    size: '50+ employees, or complex operations',
    profile: 'Several locations or departments, formal procurement or regulatory requirements.',
    voice: 'We need secure, tailored systems, integrations, governance and structured implementation support.',
    needs: 'Enterprise software, fintech integrations, advanced automation, security and support.',
    cta: 'Book a discovery call',
  },
];

export const findSegment = (id) => segments.find((segment) => segment.id === id);

export const needs = [
  { id: 'online', label: 'Get online' },
  { id: 'stock', label: 'Sell and manage stock' },
  { id: 'customers', label: 'Manage customers' },
  { id: 'payments', label: 'Manage payments and finance' },
  { id: 'automate', label: 'Automate work' },
  { id: 'custom', label: 'Build custom software' },
];

// Which bundles or engagements to put first for each size and need.
export const recommendations = {
  small: {
    online: ['digital-presence'],
    stock: ['business-essentials', 'pos-inventory'],
    customers: ['business-essentials'],
    payments: ['pos-inventory', 'gateway-integration'],
    automate: ['business-automation'],
    custom: ['process-assessment', 'basic-management'],
  },
  growing: {
    online: ['business-growth'],
    stock: ['business-operations'],
    customers: ['business-growth'],
    payments: ['digital-transformation', 'payment-reconciliation'],
    automate: ['business-operations'],
    custom: ['digital-transformation'],
  },
  corporate: {
    online: ['corporate-assessment', 'corporate-software'],
    stock: ['corporate-assessment', 'corporate-integration'],
    customers: ['corporate-assessment', 'corporate-software'],
    payments: ['corporate-assessment', 'corporate-integration'],
    automate: ['corporate-assessment', 'enterprise-automation'],
    custom: ['corporate-assessment', 'corporate-software'],
  },
};

/** Complexity can outweigh headcount: returns a larger segment worth considering. */
export const suggestSegment = (segment, { manyLocations, sensitive }) => {
  if (sensitive && segment !== 'corporate') return segment === 'small' ? 'growing' : 'corporate';
  if (manyLocations && segment === 'small') return 'growing';
  return null;
};
