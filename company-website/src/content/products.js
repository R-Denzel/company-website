import { featuredProjects } from '../data/projects';

// Only what the live applications showed on 2026-11-27 is listed as seen.
// Anything else is marked as unconfirmed until the product owner verifies it.
const shared = (name) => featuredProjects.find((project) => project.name === name);

export const products = [
  {
    id: 'myduka',
    name: 'MyDuka',
    status: 'Beta',
    category: 'Point of sale and retail operations',
    positioning: 'A practical point-of-sale and stock-management system for retail businesses.',
    audience: 'Small retailers, shops and growing merchants.',
    project: shared('My Duka POS'),
    seen: [
      'A shop overview with gross sales, completed orders, average basket and cash collected',
      'Cash, mobile money and card recorded as ways a sale was paid',
      'Barcode-based new sales',
      'Inventory and stock, with a low-stock count',
      'Reports and insights, and recent transactions',
      'Amounts shown in UGX, KES or USD',
    ],
    unconfirmed: [
      'Which payment providers, if any, are connected live',
      'User roles and multi-branch support',
      'Supported devices and offline use',
      'Whether hardware is supplied',
    ],
    subscriptions: ['myduka-starter', 'myduka-business', 'myduka-multi'],
  },
  {
    id: 'payro',
    name: 'Payro',
    status: 'Beta',
    category: 'Shared expenses',
    positioning: 'Split smart · pay easy.',
    audience: 'Friends, families and groups sharing bills. The app also has an entry point for restaurants.',
    project: shared('Payro'),
    seen: [
      'An onboarding flow about sharing bills with friends, family and groups',
      'Sign-in and account creation',
      'A separate entry point labelled “For Restaurants”',
    ],
    unconfirmed: [
      'Tracking who owes what, as the onboarding describes',
      'Mobile money settlement inside the app. The onboarding names M-Pesa, Airtel Money and MTN MoMo; whether payments are processed or only instructed is not verified',
      'AI receipt scanning and suggested splits',
      'Supported currencies, countries and platforms, and any fees',
    ],
  },
  {
    id: 'checkinhq',
    name: 'CheckinHQ',
    status: 'Beta',
    category: 'Booking management',
    positioning: 'Simple booking management for businesses.',
    audience: 'Hospitality and service businesses that take bookings.',
    project: shared('CheckinHQ'),
    seen: ['A web sign-in with account creation and password reset'],
    unconfirmed: [
      'Booking records and the booking workflow',
      'Customer notes and follow-up status',
      'Deposits, reporting and integrations',
    ],
  },
];

export const findProduct = (id) => products.find((product) => product.id === id);
