import { Cloud } from 'lucide-react';
import { allPillars } from '../content/pillars';

// The service list shown in accordions and the guided selector, derived from the pillars.
export const services = [
  ...allPillars.map((pillar) => ({
    id: pillar.id,
    name: pillar.name,
    shortName: pillar.shortName,
    description: pillar.summary,
    icon: pillar.icon,
    status: 'Available',
  })),
  {
    id: 'cloud',
    name: 'Cloud-Based Solutions',
    shortName: 'Cloud solutions',
    description: 'Cloud deployment, hosting and application management. This service is coming soon.',
    icon: Cloud,
    status: 'Coming soon',
  },
];
