import { markets } from '../content/markets';
import { findSegment, needs } from '../content/segments';
import { addons, findPackage, formatPrice } from '../content/pricing';
import { findProduct } from '../content/products';

export const sizeBands = ['1–10 employees', '11–50 employees', '51–200 employees', 'More than 200 employees'];
export const locationBands = ['One location', '2–5 locations', '6 or more locations'];
export const timelines = ['As soon as possible', '1–3 months', 'Flexible'];

/** Starting form values from whatever the visitor chose on the way here. */
export const initialEnquiry = (preferences, prefill = {}) => ({
  name: '',
  email: '',
  phone: '',
  organisation: '',
  market: prefill.market || preferences.market,
  segment: prefill.segment || preferences.segment || '',
  need: prefill.need || '',
  industry: '',
  size: '',
  locations: '',
  tools: '',
  packageId: prefill.packageId || '',
  product: prefill.product || '',
  service: prefill.service || '',
  addonIds: prefill.addonIds || [],
  budget: '',
  timeline: prefill.timeline || '',
  message: prefill.message || '',
});

/** What the visitor is asking about, in one line. */
export const enquirySubject = (form) => {
  const subject = findPackage(form.packageId)?.name
    || findProduct(form.product)?.name
    || form.service
    || needs.find((need) => need.id === form.need)?.label
    || 'General enquiry';
  return `${subject} (${markets[form.market].name})`;
};

/** Plain-text summary sent by email or WhatsApp. Empty answers are left out. */
export const enquiryText = (form) => {
  const market = markets[form.market];
  const chosen = findPackage(form.packageId);
  const lines = [
    ['Market', `${market.name} (${market.currency})`],
    ['Business category', findSegment(form.segment)?.name],
    ['Main need', needs.find((need) => need.id === form.need)?.label],
    ['Package', chosen && `${chosen.name}, ${formatPrice(chosen.price, form.market)} (indicative)`],
    ['Product', findProduct(form.product)?.name],
    ['Service', form.service],
    ['Add-ons', form.addonIds.map((id) => addons.find((entry) => entry.id === id)?.name).filter(Boolean).join(', ')],
    ['Name', form.name],
    ['Email', form.email],
    ['Phone', form.phone],
    ['Organisation', form.organisation],
    ['Industry', form.industry],
    ['Team size', form.size],
    ['Locations', form.locations],
    ['Current tools', form.tools],
    ['Budget range', form.budget],
    ['Timeline', form.timeline],
  ].filter(([, value]) => value);

  return `${lines.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nProblem to solve:\n${form.message}`;
};
