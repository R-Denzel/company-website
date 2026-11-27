import { Code2, CreditCard, Search, Workflow, LayoutDashboard } from 'lucide-react';

// Four commercial divisions, with growth services kept in a supporting role.
export const pillars = [
  {
    id: 'fintech-payments',
    name: 'Fintech & Digital Payments',
    shortName: 'Fintech & Payments',
    icon: CreditCard,
    priority: true,
    summary: 'Payment-related software, merchant tools and financial workflows.',
    description: 'Point of sale, payment integrations, reconciliation and merchant reporting. Where a licensed payment provider is required, we work with a third party and say so clearly.',
    deliverables: ['Point-of-sale software', 'Payment-provider and mobile money integrations', 'Transaction records and reconciliation dashboards', 'Merchant reporting', 'Expense workflows'],
    groups: ['fintech', 'pos', 'myduka'],
    products: ['myduka', 'payro'],
  },
  {
    id: 'business-systems',
    name: 'Business Systems',
    shortName: 'Business Systems',
    icon: LayoutDashboard,
    priority: true,
    summary: 'Software that organises how a business operates.',
    description: 'Systems for customers, stock, bookings, orders and records, built around the problem you need solved.',
    deliverables: ['CRM and customer records', 'Inventory and order management', 'Booking and hospitality systems', 'Dashboards and reporting', 'School and institution workflows'],
    groups: ['business'],
    products: ['myduka', 'checkinhq'],
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    shortName: 'AI & Automation',
    icon: Workflow,
    priority: true,
    summary: 'Practical automation tied to real business processes.',
    description: 'Many businesses do not need a complex AI agent. They need repetitive work removed, with a clear handover when a person should take over.',
    deliverables: ['WhatsApp enquiry assistants', 'Internal knowledge assistants', 'Workflow and reporting automation', 'Document and data processing', 'AI integrations'],
    groups: ['ai'],
    products: [],
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering & Cloud',
    shortName: 'Software Engineering',
    icon: Code2,
    summary: 'Websites, applications and technical delivery.',
    description: 'Websites, web and mobile applications, portals, APIs and integrations, with deployment and maintenance.',
    deliverables: ['Websites and e-commerce', 'Web and mobile applications', 'Portals, APIs and integrations', 'Deployment and maintenance'],
    comingSoon: ['Cloud architecture and managed cloud services'],
    groups: ['web'],
    products: [],
  },
];

export const growth = {
  id: 'growth',
  name: 'Growth & Visibility',
  shortName: 'Growth & Visibility',
  icon: Search,
  summary: 'SEO, local SEO and AI search optimisation as supporting services.',
  description: 'Help customers find you. We describe the work done each month and never guarantee rankings, traffic or inclusion in AI answers.',
  deliverables: ['SEO optimisation', 'Local SEO', 'AI search optimisation'],
  groups: ['seo', 'local-seo', 'ai-search'],
  products: [],
};

export const allPillars = [...pillars, growth];
export const findPillar = (id) => allPillars.find((pillar) => pillar.id === id);
