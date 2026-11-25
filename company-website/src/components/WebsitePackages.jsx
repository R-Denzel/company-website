import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';

const markets = [
  { country: 'Uganda', code: 'UG', currency: 'UGX', rate: 4085.836012 },
  { country: 'Kenya', code: 'KE', currency: 'KES', rate: 129.983516 },
  { country: 'United States', code: 'US', currency: 'USD', rate: 1 },
  { country: 'United Kingdom', code: 'GB', currency: 'GBP', rate: 0.763269 },
];

const websitePackages = [
  {
    name: 'Basic Website',
    usdPrice: 496,
    description: 'A compact, professionally designed website for a small business.',
    includes: [
      '1–2 page website',
      'Custom layout design',
      'Three stock photos',
      'One homepage slider banner',
      'Contact and enquiry form',
      'Standards-valid HTML',
      'Initial mockup within 24 hours',
      'Multiple revision rounds',
      'Dedicated project manager',
      'Website deployment',
    ],
  },
  {
    name: 'Startup Website',
    usdPrice: 1663,
    description: 'A multi-page website with content management and interactive design.',
    includes: [
      'Five unique pages',
      'WordPress content management',
      'Interactive interface design',
      'Five stock images and two banners',
      'Slider and hover effects',
      'Contact and enquiry form',
      'Standards-valid HTML',
      'Cross-browser compatibility',
      'Initial mockup within 24 hours',
      'Multiple revision rounds',
      'Dedicated project manager',
      'Website deployment',
    ],
  },
  {
    name: 'Professional Website',
    usdPrice: 2663,
    description: 'A larger business website with lead capture and useful integrations.',
    includes: [
      'Up to 10 pages',
      'High-end interactive design',
      'WordPress CMS and admin panel',
      'Logo design',
      'Mobile-responsive layout',
      'Lead capture and contact forms',
      'Appointment and payment integrations',
      'Hover effects',
      'Newsletter signup',
      'Social media integration',
      'Five stock photos',
      'Three slider banners',
      'Standards-valid HTML',
      'Cross-browser compatibility',
      'Initial mockup within 24 hours',
      'Website deployment',
    ],
  },
  {
    name: 'Startup Ecommerce Website',
    usdPrice: 3330,
    description: 'An online store setup for businesses starting to sell up to 50 products.',
    includes: [
      'Ecommerce storefront design',
      'Up to 50 products',
      'Shopify or WooCommerce CMS',
      'Mini shopping cart',
      'Product and category management',
      'Mobile-responsive storefront',
      'Payment and shipping integrations',
      'One promotional banner',
      'Loading optimization',
      'Contact and enquiry form',
      'Initial mockup within 24 hours',
      'Standards-valid HTML',
      'Cross-browser compatibility',
      'Dedicated account manager',
      'Store deployment',
    ],
  },
  {
    name: 'Pro Ecommerce',
    usdPrice: 6330,
    description: 'A custom ecommerce build with expanded catalogue and operations tools.',
    includes: [
      'Custom ecommerce design',
      'Unlimited products and pages',
      'Shopify or WooCommerce CMS',
      'Interactive theme design',
      'Full shopping cart integration',
      'Product and category management',
      'Inventory and order management',
      'Mobile-responsive storefront',
      'Search engine submission',
      'Payment and shipping integrations',
      'Dropshipping integration',
      'Product detail page design',
      'Featured product showcase',
      'Five promotional banners',
      'Loading optimization',
      'Contact and enquiry form',
      'Initial mockup within 24 hours',
      'Standards-valid HTML',
      'Cross-browser compatibility',
      'Dedicated account manager',
      'Store deployment',
    ],
  },
  {
    name: 'Customized Website',
    usdPrice: 9999,
    description: 'A custom web platform or portal tailored to a specific business workflow.',
    includes: [
      'Custom web development',
      'Laravel or WordPress platform',
      'One portal type: job, professional network, social network, restaurant, medical, or enterprise',
      'Interactive, user-friendly interface',
      'Client or user dashboard',
      'Appointment and scheduling integration',
      'Ecommerce shopping cart integration',
      'Payment gateway integration',
      'Custom dynamic forms',
      'Multiple languages and currency conversion',
      'Third-party API integration',
      'Mobile-friendly design',
      'Social network integration',
      'Tailored custom development',
      'Dedicated account manager',
    ],
  },
];

const seoPackages = [
  {
    name: 'Startup Plan',
    usdPrice: 700,
    description: 'A practical monthly SEO foundation for a smaller business website.',
    includes: [
      'Website and search health audit',
      'Up to 10 pages optimized',
      '15 target keywords with research and mapping',
      'SEO roadmap and blog content',
      'Copywriting support for three pages',
      'Title tags, meta descriptions, and keyword updates',
      'Redirect and URL rewrite review',
      'XML sitemap and robots.txt checks',
      'Broken-link report and structured-data recommendations',
      'Foundational link and directory activity',
      'Monthly reporting and support',
    ],
  },
  {
    name: 'Scaling Plan',
    usdPrice: 1400,
    description: 'Expanded keyword and page optimization for a growing business.',
    includes: [
      'Business, customer, and competitor analysis',
      '35 target keywords across 15 pages',
      'Meta tag, keyword, image, and page optimization',
      'Anchor and internal-link improvements',
      'Analytics and search-console setup',
      'Call-to-action and sitemap planning',
      'Off-page and directory activity',
      'Monthly reporting and recommendations',
      'Email and phone support',
    ],
  },
  {
    name: 'Venture Plan',
    usdPrice: 2400,
    description: 'A broader monthly SEO program for larger sites and competitive searches.',
    includes: [
      'Business, customer, and competitor analysis',
      '60+ target keywords across 30 pages',
      'Meta, keyword, image, and page optimization',
      'Anchor and indexing improvements',
      'Google Places, analytics, and search-console setup',
      'Call-to-action and sitemap planning',
      'Off-page links and local business listings',
      'Monthly reporting and recommendations',
      'Email and phone support',
    ],
  },
];

const localSeoPackages = [
  {
    name: 'Startup Plan',
    usdPrice: 700,
    description: 'A foundational monthly local-search setup for a small business.',
    includes: [
      'Google Business Profile review',
      'Business information optimization',
      'Local keyword research',
      'Basic on-page local SEO',
      'Google Maps listing check',
      'Name, address, and phone consistency review',
      'Basic citation review',
      'Monthly local SEO report',
    ],
  },
  {
    name: 'Growth Plan',
    usdPrice: 1400,
    description: 'Broader local visibility work for growing businesses seeking more enquiries.',
    includes: [
      'Startup plan foundations',
      'Full Google Business Profile optimization',
      'Advanced local keyword research',
      'Local landing-page optimization',
      'Citation building and competitor research',
      'Review-strategy guidance',
      'Service-area optimization',
      'Monthly performance report',
    ],
  },
  {
    name: 'Authority Plan',
    usdPrice: 2400,
    description: 'A deeper local strategy for competitive areas or multiple locations.',
    includes: [
      'Growth plan foundations',
      'Multi-location and service-area strategy',
      'Advanced Google Maps optimization',
      'Local content strategy',
      'Citation cleanup and expansion',
      'Local backlink strategy planning',
      'Conversion-focused location pages',
      'Review growth strategy',
      'Detailed monthly report',
    ],
  },
];

const aiSearchPackages = [
  {
    name: 'AI Starter Plan',
    usdPrice: 1999,
    description: 'A readiness package to improve clarity and prepare a site for AI-driven discovery.',
    includes: [
      'AI search visibility review',
      'Website content audit',
      'Brand information review',
      'Foundational answer-engine optimization',
      'FAQ content recommendations',
      'Basic structured-data check',
      'Search-accuracy review',
      'AI search readiness report',
    ],
  },
  {
    name: 'AI Growth Plan',
    usdPrice: 2999,
    description: 'Stronger content structure and brand discovery for growing businesses.',
    includes: [
      'AI Starter plan foundations',
      'Advanced AI search audit',
      'Answer-engine content optimization',
      'Structured-data recommendations',
      'AI-friendly FAQ optimization',
      'Brand entity review',
      'Competitor visibility research',
      'Content gap analysis',
      'Monthly performance report',
    ],
  },
  {
    name: 'AI Authority Plan',
    usdPrice: 4999,
    description: 'A broader AI-search strategy focused on content authority and ongoing improvement.',
    includes: [
      'AI Growth plan foundations',
      'Full AI search optimization strategy',
      'Advanced structured-data planning',
      'Brand entity optimization',
      'AI-friendly content strategy',
      'Topic authority mapping',
      'Search-accuracy improvements',
      'High-intent question targeting',
      'Detailed monthly report',
    ],
  },
];

const pricingCategories = [
  {
    id: 'website',
    label: 'Website Packages',
    serviceName: 'Web & Mobile Application Development',
    packages: websitePackages,
  },
  {
    id: 'seo',
    label: 'SEO Optimization',
    serviceName: 'SEO Optimization',
    billingPeriod: 'monthly',
    packages: seoPackages,
  },
  {
    id: 'localSeo',
    label: 'Local SEO',
    serviceName: 'Local SEO Optimization',
    billingPeriod: 'monthly',
    packages: localSeoPackages,
  },
  {
    id: 'aiSearch',
    label: 'AI Search Optimization',
    serviceName: 'AI Search Optimization',
    billingPeriod: 'unspecified',
    packages: aiSearchPackages,
  },
];

const WebsitePackages = ({ onAskAboutPackage }) => {
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(pricingCategories[0].id);
  const selectedCategory = pricingCategories.find((category) => category.id === selectedCategoryId);

  const formatPrice = (usdPrice) => {
    const convertedPrice = usdPrice * selectedMarket.rate;
    const roundedPrice = selectedMarket.currency === 'UGX'
      ? Math.round(convertedPrice / 1000) * 1000
      : Math.round(convertedPrice);

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedMarket.currency,
      maximumFractionDigits: 0,
    }).format(roundedPrice);
  };

  return (
    <section id="pricing" className="scroll-mt-24 bg-[#0B0F17] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-11 max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Service pricing</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Pricing breakdowns and inclusions.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Choose a service and country to compare plans, inclusions, and local-currency estimates.
          </p>
        </div>

        <div className="mb-7 flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#0D121B] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label htmlFor="pricing-country" className="block text-sm font-semibold text-slate-100">View an indicative market estimate</label>
            <p className="mt-1 text-xs text-slate-500">Select a country and currency.</p>
          </div>
          <select
            id="pricing-country"
            value={selectedMarket.code}
            onChange={(event) => {
              const market = markets.find((option) => option.code === event.target.value);
              if (market) setSelectedMarket(market);
            }}
            className="w-full rounded-lg border border-white/10 bg-[#111722] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/60 sm:w-64"
          >
            {markets.map((market) => (
              <option key={market.code} value={market.code}>{market.country} ({market.currency})</option>
            ))}
          </select>
        </div>

        <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Choose a service pricing category">
          {pricingCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={selectedCategoryId === category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`rounded-lg border px-4 py-2.5 text-xs font-semibold transition ${
                selectedCategoryId === category.id
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#E5C158]'
                  : 'border-white/10 bg-[#0D121B] text-slate-400 hover:border-white/25 hover:text-slate-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedCategory.packages.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.42, delay: index * 0.045 }}
              className="flex flex-col rounded-xl border border-white/[0.09] bg-[#0D121B] p-6 transition duration-300 hover:border-[#D4AF37]/30"
            >
              <h3 className="text-base font-semibold text-slate-100">{item.name}</h3>
              <p className="mt-2 min-h-12 text-xs leading-6 text-slate-400">{item.description}</p>
              <p className="mt-5 text-2xl font-semibold tracking-tight text-[#E5C158]">{formatPrice(item.usdPrice)}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                {selectedCategory.billingPeriod === 'monthly'
                  ? 'Indicative monthly estimate'
                  : selectedCategory.billingPeriod === 'unspecified'
                    ? 'Indicative reference estimate'
                    : 'Indicative starting estimate'}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                USD estimate: US${item.usdPrice.toLocaleString('en-US')}
                {selectedCategory.billingPeriod === 'monthly' ? ' / month' : ''}
                {selectedCategory.billingPeriod === 'unspecified' ? ' · period not stated' : ''}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                {item.includes.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-xs text-slate-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <details className="group mt-4 border-t border-white/[0.08] pt-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-[#E5C158] [&::-webkit-details-marker]:hidden">
                  <span>Full package breakdown ({item.includes.length} items)</span>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-4 space-y-2.5">
                  {item.includes.slice(4).map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-xs leading-5 text-slate-300">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </details>

              <button
                type="button"
                onClick={() => onAskAboutPackage(selectedCategory.serviceName, {
                  name: item.name,
                  estimate: formatPrice(item.usdPrice),
                  referencePrice: `US$${item.usdPrice.toLocaleString('en-US')}${selectedCategory.billingPeriod === 'monthly' ? ' / month' : ''}`,
                  market: selectedMarket.country,
                })}
                className="mt-6 inline-flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-semibold text-[#E5C158] transition hover:text-[#F6EDC8]"
              >
                Ask about this package
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] leading-5 text-slate-500">
          All prices shown are estimates, not fixed quotes. Local-currency conversions are rounded.
          {selectedCategory.billingPeriod === 'monthly' && ' SEO and Local SEO plans are monthly.'}
          {selectedCategory.billingPeriod === 'unspecified' && ' The AI Search billing period is not stated.'}
        </p>
      </div>
    </section>
  );
};

export default WebsitePackages;
