import {
  Cloud,
  Code2,
  CreditCard,
  MapPin,
  Search,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react';

export const services = [
  {
    name: 'Web & Mobile Application Development',
    shortName: 'Web & mobile apps',
    description: 'Digital platforms, dashboards, and mobile applications shaped around your customers and workflows.',
    icon: Smartphone,
    status: 'Available',
  },
  {
    name: 'Custom Software Solutions',
    shortName: 'Custom software',
    description: 'Purpose-built systems designed around the way your team operates.',
    icon: Code2,
    status: 'Available',
  },
  {
    name: 'AI-Assisted Automation',
    shortName: 'AI & automation',
    description: 'Practical automation for repetitive workflows, data processing, and service delivery.',
    icon: Workflow,
    status: 'Available',
  },
  {
    name: 'Digital Payment & POS Software',
    shortName: 'Payments & POS',
    description: 'Transaction and point-of-sale tools built to support digital payment workflows.',
    icon: CreditCard,
    status: 'Available',
  },
  {
    name: 'SEO Optimization',
    shortName: 'SEO Optimization',
    description: 'Improve organic search visibility with keyword research, on-page and technical improvements, stronger content, and performance tracking.',
    icon: Search,
    status: 'Available',
  },
  {
    name: 'Local SEO Optimization',
    shortName: 'Local SEO',
    description: 'Help nearby customers find your business through Google Business Profile improvements, local keywords, Maps visibility, directory listings, and location pages.',
    icon: MapPin,
    status: 'Available',
  },
  {
    name: 'AI Search Optimization',
    shortName: 'AI Search',
    description: 'Improve how AI-powered search tools understand and surface your business through clear content, structured data, and consistent brand information.',
    icon: Sparkles,
    status: 'Available',
  },
  {
    name: 'Cloud-Based Solutions',
    shortName: 'Cloud solutions',
    description: 'Cloud deployment, hosting, and application management. This service is coming soon.',
    icon: Cloud,
    status: 'Coming soon',
  },
];
