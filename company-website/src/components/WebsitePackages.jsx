import { useLayoutEffect, useRef, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import Button from './Button';
import Collapse from './Collapse';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';

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

const FeatureList = ({ features }) => (
  <ul className="space-y-3">
    {features.map((feature) => (
      <li key={feature} className="flex gap-3 text-sm leading-6">
        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-violet" />
        {feature}
      </li>
    ))}
  </ul>
);

const PackageCard = ({ item, category, price, onAsk }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `package-${category.id}-${item.name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <article data-package className="flex flex-col rounded-2xl border border-line bg-paper p-6 transition-colors duration-500 hover:border-violet sm:p-8">
      <h3 className="text-xl font-semibold tracking-[-0.02em]">{item.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{item.description}</p>
      <p className="mt-8 text-[2.5rem] font-medium leading-none tracking-[-0.035em] tabular-nums">{price}</p>
      <p className="mt-3 text-sm text-muted">
        {category.billingPeriod === 'monthly'
          ? 'Indicative monthly estimate'
          : category.billingPeriod === 'unspecified'
            ? 'Indicative reference estimate'
            : 'Indicative starting estimate'}
      </p>
      <p className="mt-1 text-sm text-muted">
        USD estimate: US${item.usdPrice.toLocaleString('en-US')}
        {category.billingPeriod === 'monthly' ? ' / month' : ''}
        {category.billingPeriod === 'unspecified' ? ' · period not stated' : ''}
      </p>

      <div className="mt-6 border-t border-line pt-6">
        <FeatureList features={item.includes.slice(0, 4)} />
        <Collapse open={isOpen} id={panelId}>
          <div className="pt-3"><FeatureList features={item.includes.slice(4)} /></div>
        </Collapse>
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
        className="mt-5 flex items-center justify-between gap-3 py-2 text-left text-sm font-semibold"
      >
        <span>{isOpen ? 'Show less' : `Full package breakdown (${item.includes.length} items)`}</span>
        <Plus aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-soft ${isOpen ? 'rotate-45' : ''}`} />
      </button>

      <div className="mt-auto pt-6">
        <Button variant="secondary" className="w-full !justify-between" onClick={onAsk}>
          Ask about this package
        </Button>
      </div>
    </article>
  );
};

const WebsitePackages = ({ onAskAboutPackage }) => {
  const [selectedMarket, setSelectedMarket] = useState(markets[0]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(pricingCategories[0].id);
  const selectedCategory = pricingCategories.find((category) => category.id === selectedCategoryId);
  const grid = useRef(null);
  const tabs = useRef(null);
  const indicator = useRef(null);
  const hasSwitched = useRef(false);

  // Slides the dark pill behind whichever category is selected.
  useLayoutEffect(() => {
    const place = () => {
      const active = tabs.current?.querySelector('[aria-pressed="true"]');
      if (!active) return;
      Object.assign(indicator.current.style, {
        width: `${active.offsetWidth}px`,
        height: `${active.offsetHeight}px`,
        transform: `translate(${active.offsetLeft}px, ${active.offsetTop}px)`,
      });
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(tabs.current);
    return () => observer.disconnect();
  }, [selectedCategoryId]);

  useGSAP(() => {
    if (!hasSwitched.current) return;
    if (!prefersReducedMotion()) {
      gsap.fromTo('[data-package]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'soft', stagger: 0.06 });
    }
    ScrollTrigger.refresh();
  }, { dependencies: [selectedCategoryId], scope: grid });

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
    <section id="pricing" className="scroll-mt-20 border-t border-line py-20 sm:py-32">
      <div className="shell">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">Pricing breakdowns and inclusions.</h2>
          <div>
            <p data-fade className="max-w-xl text-lead text-muted">
              Choose a service and country to compare plans, inclusions, and local-currency estimates.
            </p>
            <label htmlFor="pricing-country" className="mt-8 block max-w-sm text-sm font-medium">
              View an indicative market estimate
              <select
                id="pricing-country"
                value={selectedMarket.code}
                onChange={(event) => {
                  const market = markets.find((option) => option.code === event.target.value);
                  if (market) setSelectedMarket(market);
                }}
                className="field"
              >
                {markets.map((market) => (
                  <option key={market.code} value={market.code}>{market.country} ({market.currency})</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div ref={tabs} role="group" aria-label="Choose a service pricing category" className="relative mt-14 inline-flex max-w-full flex-wrap gap-1 rounded-[1.75rem] bg-mist p-1">
          <span ref={indicator} aria-hidden="true" className="absolute left-0 top-0 rounded-full bg-violet transition-all duration-500 ease-soft" />
          {pricingCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={selectedCategoryId === category.id}
              onClick={() => {
                hasSwitched.current = true;
                setSelectedCategoryId(category.id);
              }}
              className={`relative z-10 h-11 rounded-full px-5 text-sm font-medium transition-colors duration-500 ${
                selectedCategoryId === category.id ? 'text-paper' : 'text-ink hover:text-muted'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div ref={grid} className="mt-8 grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedCategory.packages.map((item) => (
            <PackageCard
              key={`${selectedCategory.id}-${item.name}`}
              item={item}
              category={selectedCategory}
              price={formatPrice(item.usdPrice)}
              onAsk={() => onAskAboutPackage(selectedCategory.serviceName, {
                name: item.name,
                estimate: formatPrice(item.usdPrice),
                referencePrice: `US$${item.usdPrice.toLocaleString('en-US')}${selectedCategory.billingPeriod === 'monthly' ? ' / month' : ''}`,
                market: selectedMarket.country,
              })}
            />
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-muted">
          All prices shown are estimates, not fixed quotes. Local-currency conversions are rounded.
          {selectedCategory.billingPeriod === 'monthly' && ' SEO and Local SEO plans are monthly.'}
          {selectedCategory.billingPeriod === 'unspecified' && ' The AI Search billing period is not stated.'}
        </p>
      </div>
    </section>
  );
};

export default WebsitePackages;
