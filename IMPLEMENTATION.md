# Pricing, solutions and markets: implementation notes

Built 2026-11-27 from the website packages brief and the pricing strategy supplied by the owner. All paths are under `company-website/`.

## Where to change things

| To change | Edit |
| --- | --- |
| Prices, package names, inclusions, revisions, add-ons | `src/content/pricing.js` |
| Billing terms, policies and support plans | `src/content/billing.js` |
| Business categories, needs and which bundles are recommended | `src/content/segments.js` |
| Uganda and Kenya copy, currency and WhatsApp numbers | `src/content/markets.js` |
| Service pillars | `src/content/pillars.js` |
| Product status, observed and unconfirmed features | `src/content/products.js` |
| Case studies and concepts | `src/content/caseStudies.js` |

### Updating a price
Each price is `[low, high]` per market, written with `range`, `fixed` or `from`; `null` means custom quotation. Kenya (KES) and Uganda (UGX) are separate lists. Nothing is converted on screen, so change both.

### Price approval
`PRICING_APPROVED` in `src/content/pricing.js` is `false`. While false, every priced view shows "Proposed pricing, awaiting approval". Set it to `true` only after the owner approves the figures.

### Publishing a case study
Add an entry to `caseStudies` with `approved: true` only when you have the customer's written permission and evidence for the baseline and outcome.

## Pages

| Route | Purpose |
| --- | --- |
| `/pricing` | Market, business size and need selector; recommended bundles; all prices; add-ons; billing |
| `/solutions`, `/solutions/:id` | Four pillars plus growth services |
| `/products`, `/products/:id` | MyDuka, Payro, CheckinHQ (Beta) |
| `/work` | Case studies, walkthroughs, sample sites, concepts |
| `/uganda`, `/kenya` | Market landing pages; visiting one selects that market |
| `/contact` | Enquiry by email (EmailJS) or WhatsApp |
| `/projects`, `/portfolio`, `/#pricing` | Earlier addresses, still working |

## Configuration
Email enquiries need `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_CONTACT`, `VITE_EMAILJS_TEMPLATE_PROPOSAL` and `VITE_EMAILJS_PUBLIC_KEY` in the hosting settings. The whole enquiry is sent in the template's `message` field. The recipient address is set in `src/utils/emailService.js`.

## Analytics events
`market_selected`, `segment_selected`, `pricing_group_selected`, `package_selected`, `product_view`, `product_cta`, `demo_request`, `whatsapp_click`, `enquiry_completed`. Events carry choices only, never names, contact details or message text. Custom events need a Vercel plan that supports them.

## Removed or replaced
`WebsitePackages.jsx` (old USD price tabs and fixed exchange rates), `Projects.jsx` and `Portfolio.jsx`. The old figures are recorded in the pricing audit.

## Awaiting the owner
- Approve prices for publication, and decide which payment gateway integration price applies.
- Revision allowances, support periods, timelines and tier limits.
- Tax treatment, cancellation, refund, acceptance and warranty terms.
- Verified features, payment providers, devices, privacy and security details for each product.
- Confirm both numbers are live WhatsApp lines, and the legal entity and presence in each country.
- Privacy notice and terms pages: not written, pending legal review.
