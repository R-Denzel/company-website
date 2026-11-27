// Publish an entry only with the customer's written permission and auditable
// evidence. Never invent figures or quotes. Entries with `approved: false` stay hidden.
//
// Shape: { id, customer, sector, country, context, problem, solution,
//   implementation, baseline, outcome, evidence, quote, disclosure, approved }
export const caseStudies = [];

export const publishedCaseStudies = caseStudies.filter((study) => study.approved);

export const caseStudyStandard = [
  ['Customer and context', 'A named customer with written permission, or an approved anonymous sector description.'],
  ['Problem and solution', 'The specific problem, what we built or configured, and what third-party tools did.'],
  ['Measured change', 'A before and after measure with the same definition, source and time period.'],
  ['Limits', 'What was measured, over how long, and why results may differ elsewhere.'],
];

export const concepts = [
  {
    name: 'Handyman App',
    category: 'Service marketplace · Concept',
    description: 'A proposed mobile and web platform to help people find and book help for home repairs and maintenance.',
  },
  {
    name: 'AI Chat & Counsel App',
    category: 'Conversational product · Concept',
    description: 'An early product idea for a supportive chat experience focused on guidance, mentorship and human connection.',
  },
];
