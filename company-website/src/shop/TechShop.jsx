import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import Photo from '../components/Photo';
import usePageMotion from '../hooks/usePageMotion';
import { gsap, MOTION_OK, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';
import { photos } from '../data/photos';
import DeviceStage from './DeviceStage';
import ProductDialog from './ProductDialog';
import { formatPrice, products } from './products';

const SLIDES = products.length + 1;
const INTRO_BACKDROP = ['#2a1d73', '#140f2e'];
const backdrops = [INTRO_BACKDROP, ...products.map((product) => product.backdrop)];
const filters = [
  { id: 'all', label: 'All devices' },
  { id: 'phone', label: 'Phones' },
  { id: 'laptop', label: 'Laptops' },
];

const backdropFill = ([top, bottom]) => `radial-gradient(120% 95% at 50% 18%, ${top} 0%, ${bottom} 100%)`;

/**
 * Cross-fades the stacked slide backgrounds. Changing opacity is handled by the
 * graphics card, where repainting a full-screen gradient every frame is not.
 */
const showBackdrop = (layers, position) => {
  [...layers.children].forEach((layer, index) => {
    const opacity = gsap.utils.clamp(0, 1, position - index + 1);
    // A layer completely covered by the one above it does not need drawing.
    const isCovered = position >= index + 1;
    layer.style.opacity = opacity;
    layer.style.visibility = opacity === 0 || isCovered ? 'hidden' : 'visible';
  });
};

/** Text rises out of a mask when its slide becomes current. */
const Rise = ({ active, delay = 0, className = '', children }) => (
  <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
    <span
      className={`block transition-transform duration-700 ease-soft ${active ? 'translate-y-0' : 'translate-y-[115%]'}`}
      style={{ transitionDelay: active ? `${delay}ms` : '0ms' }}
    >
      {children}
    </span>
  </span>
);

const ProductSlide = ({ product, index, active, onOpen }) => {
  const mirrored = index % 2 === 1;

  return (
    <article inert={!active} aria-label={product.name} className={`absolute inset-0 ${active ? '' : 'pointer-events-none'}`}>
      <Rise active={active} className="absolute left-4 top-20 sm:left-8 sm:top-24">
        <span aria-hidden="true" className="block text-[clamp(6rem,min(19vw,30svh),17rem)] font-medium leading-[0.85] tracking-[-0.04em]">
          {index + 1}
        </span>
      </Rise>

      <div
        className={`absolute top-[40%] hidden w-56 transition-all duration-700 ease-soft xl:block ${mirrored ? 'right-10' : 'left-16'} ${
          active ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-8 opacity-0'
        }`}
      >
        <p className={`text-sm leading-6 ${mirrored ? '' : 'mt-10'}`}>{product.description}</p>
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="group mt-6 flex aspect-square w-32 flex-col justify-between rounded-3xl bg-paper p-4 text-left text-sm font-semibold shadow-lg shadow-ink/10 transition-transform duration-500 ease-soft hover:-translate-y-1"
        >
          Explore
          <span aria-hidden="true" className="grid h-10 w-10 place-items-center self-end rounded-full bg-ink text-paper transition-colors group-hover:bg-violet">
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-[-45deg]" />
          </span>
        </button>
      </div>

      <div className={`absolute inset-x-4 bottom-20 sm:inset-x-8 lg:bottom-20 lg:inset-x-16 ${mirrored ? '' : 'lg:text-right'}`}>
        <h2 className="text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.035em]">
          {product.title.map((line, i) => (
            <Rise key={line} active={active} delay={80 + i * 80}>{line}</Rise>
          ))}
        </h2>
        <p className={`mt-3 text-base font-medium transition-opacity duration-700 ${active ? 'opacity-100 delay-300' : 'opacity-0'}`}>
          {product.name} · {formatPrice(product.price)} <span className="font-normal">(sample price)</span>
        </p>
        <div className={`mt-4 transition-opacity duration-500 xl:hidden ${active ? 'opacity-100 delay-300' : 'opacity-0'}`}>
          <Button variant="dark" onClick={() => onOpen(product)}>Explore</Button>
        </div>
      </div>
    </article>
  );
};

const TechShop = () => {
  const [active, setActive] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [has3d, setHas3d] = useState(true);
  const track = useRef(null);
  const backdrop = useRef(null);
  const position = useRef(0);
  const snapper = useRef(null);
  const drive = useRef(null);
  const motion = usePageMotion();

  const markUnavailable = useCallback(() => setHas3d(false), []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Voltway — sample tech shop by FutureTech Africa';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useGSAP(() => {
    const update = (progress) => {
      position.current = progress * (SLIDES - 1);
      showBackdrop(backdrop.current, position.current);
      setActive(Math.round(position.current));
    };

    const range = { trigger: track.current, start: 'top top', end: 'bottom bottom' };

    ScrollTrigger.create({
      ...range,
      onUpdate: (self) => update(self.progress),
      onRefresh: (self) => update(self.progress),
    });

    // Snapping gives each product its own full screen, like turning slides.
    gsap.matchMedia().add(MOTION_OK, () => {
      snapper.current = ScrollTrigger.create({
        ...range,
        snap: { snapTo: 1 / (SLIDES - 1), duration: { min: 0.3, max: 0.8 }, delay: 0.15, ease: 'power2.inOut' },
      });
      return () => {
        snapper.current = null;
      };
    });
  }, { scope: track });

  const goToSlide = useCallback((index) => {
    const start = track.current.getBoundingClientRect().top + window.scrollY;
    const step = (track.current.offsetHeight - window.innerHeight) / (SLIDES - 1);
    const top = start + step * Math.min(Math.max(index, 0), SLIDES - 1);

    // Snapping is paused while the page travels, or a slow frame would let it
    // pull the view back to the slide it is leaving.
    snapper.current?.disable(false);
    drive.current?.kill();
    const proxy = { y: window.scrollY };
    drive.current = gsap.to(proxy, {
      y: top,
      duration: prefersReducedMotion() ? 0 : 0.9,
      ease: 'power2.inOut',
      onUpdate: () => window.scrollTo({ top: proxy.y, behavior: 'instant' }),
      onComplete: () => snapper.current?.enable(false),
    });
  }, []);

  useEffect(() => () => drive.current?.kill(), []);

  useEffect(() => {
    const handleKey = (event) => {
      if (isMenuOpen || isProductOpen || event.target.closest?.('input, select, textarea')) return;
      if (window.scrollY > track.current.offsetHeight - window.innerHeight + 40) return;
      if (event.key === 'ArrowRight') goToSlide(active + 1);
      if (event.key === 'ArrowLeft') goToSlide(active - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, goToSlide, isMenuOpen, isProductOpen]);

  const openProduct = (product) => {
    setSelected(product);
    setIsProductOpen(true);
  };

  const scrollToCatalogue = () => {
    document.getElementById('catalogue').scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  };

  const shown = useMemo(() => products.filter((product) => filter === 'all' || product.kind === filter), [filter]);

  const chooseFilter = (next) => {
    setFilter(next);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <div ref={motion} className="bg-paper">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 p-3 sm:p-5">
        <button type="button" onClick={() => goToSlide(0)} className="pointer-events-auto flex h-11 items-center gap-2 rounded-full bg-paper px-4 font-semibold shadow-md shadow-ink/10">
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-gradient-to-br from-violet to-coral" />
          Voltway
          <span className="hidden text-xs font-medium text-muted sm:inline">Sample website</span>
        </button>
        <button type="button" onClick={() => setIsMenuOpen(true)} aria-label="Open product menu" className="pointer-events-auto flex h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-semibold shadow-md shadow-ink/10 sm:px-6">
          <Menu aria-hidden="true" className="h-4 w-4" />
          <span className="hidden sm:inline">Menu</span>
        </button>
        <div className="pointer-events-auto flex gap-2">
          <button type="button" onClick={scrollToCatalogue} className="h-11 rounded-full bg-ink px-4 text-sm font-semibold text-paper shadow-md shadow-ink/10 transition-colors hover:bg-violet-deep sm:px-5">
            Shop all
          </button>
          <Link to="/work" aria-label="Leave the sample and return to FutureTech Africa" className="grid h-11 w-11 place-items-center rounded-full bg-paper shadow-md shadow-ink/10 transition-colors hover:bg-mist">
            <X aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section ref={track} aria-label="Featured devices" className="relative" style={{ height: `${SLIDES * 100}svh` }}>
          <div className="sticky top-0 h-svh overflow-hidden">
            <div ref={backdrop} className="absolute inset-0">
              {backdrops.map((colours, index) => (
                <div
                  key={colours.join()}
                  className="absolute inset-0"
                  style={{ background: backdropFill(colours), opacity: index ? 0 : 1, visibility: index ? 'hidden' : 'visible' }}
                />
              ))}
            </div>
            <div className={`absolute inset-0 isolate transition-opacity duration-700 ${active === 0 ? 'opacity-100' : 'opacity-0'}`}>
              <Aurora tone="dark" paused={active > 0} />
            </div>

            {has3d && <DeviceStage products={products} position={position} onUnavailable={markUnavailable} />}

            <div inert={active !== 0} className={`on-ink absolute inset-0 flex flex-col justify-end px-4 pb-24 text-paper sm:px-8 lg:px-16 ${active === 0 ? '' : 'pointer-events-none'}`}>
              <h1>
                <span className="sr-only">Voltway: six phones and laptops worth a closer look</span>
                <span aria-hidden="true">
                  <Rise active={active === 0} className="text-[clamp(11rem,36vw,30rem)] font-medium leading-[0.8] tracking-[-0.04em]">6</Rise>
                  <Rise active={active === 0} delay={90} className="text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[1] tracking-[-0.04em]">devices worth</Rise>
                  <Rise active={active === 0} delay={180} className="text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[1] tracking-[-0.04em]">a closer look</Rise>
                </span>
              </h1>
              <div className={`mt-6 flex flex-wrap items-center justify-between gap-4 transition-opacity duration-700 ${active === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <p className="max-w-sm text-base text-paper/85">Phones and laptops from the Voltway sample shop.</p>
                <button type="button" onClick={() => goToSlide(1)} className="group flex items-center gap-3 text-sm font-semibold">
                  Scroll to explore
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-paper text-ink">
                    <ArrowDown className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-y-0.5" />
                  </span>
                </button>
              </div>
            </div>

            {products.map((product, index) => (
              <ProductSlide key={product.id} product={product} index={index} active={active === index + 1} onOpen={openProduct} />
            ))}

            <nav aria-label="Slides" className={`absolute inset-x-4 bottom-4 flex gap-1.5 sm:inset-x-8 lg:inset-x-16 ${active === 0 ? 'text-paper' : 'text-ink'}`}>
              {Array.from({ length: SLIDES }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={index === 0 ? 'Introduction' : products[index - 1].name}
                  aria-current={active === index ? 'step' : undefined}
                  onClick={() => goToSlide(index)}
                  className="flex h-6 flex-1 items-center"
                >
                  <span className="relative block h-[3px] w-full overflow-hidden rounded-full">
                    <span className="absolute inset-0 bg-current opacity-25" />
                    <span className={`absolute inset-0 origin-left bg-current transition-transform duration-700 ease-soft ${index <= active ? 'scale-x-100' : 'scale-x-0'}`} />
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </section>

        <section id="catalogue" className="shell scroll-mt-24 py-20 sm:py-32">
          <div className="split">
            <h2 data-split className="max-w-lg text-title font-medium">Find your next device.</h2>
            <p data-fade className="max-w-xl text-lead text-muted">
              Browse by category. Models, specifications and prices are made up to show how a shop could look.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { id: 'phone', label: 'Phones', photo: photos.shopPhone },
              { id: 'laptop', label: 'Laptops', photo: photos.shopLaptop },
            ].map((category) => (
              <div key={category.id} className="relative">
                <Photo {...category.photo} className="aspect-[4/3] lg:aspect-[16/9]" />
                <Button variant="light" className="absolute left-4 top-4" onClick={() => chooseFilter(category.id)}>
                  Show {category.label.toLowerCase()}
                </Button>
              </div>
            ))}
          </div>

          <div role="group" aria-label="Filter devices" className="mt-12 inline-flex max-w-full flex-wrap gap-1 rounded-full bg-mist p-1">
            {filters.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={filter === option.id}
                onClick={() => chooseFilter(option.id)}
                className={`h-11 rounded-full px-5 text-sm font-medium transition-colors duration-500 ${filter === option.id ? 'bg-violet text-paper' : 'hover:text-muted'}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((product) => (
              <li key={product.id}>
                <button type="button" onClick={() => openProduct(product)} className="group block w-full text-left">
                  <span
                    className="grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl"
                    style={{ background: `linear-gradient(160deg, ${product.backdrop[0]}, ${product.backdrop[1]})` }}
                  >
                    <img src={product.image} alt="" width="800" height="600" loading="lazy" decoding="async" className="w-full transition-transform duration-700 ease-soft group-hover:scale-110" />
                  </span>
                  <span className="mt-4 flex items-start justify-between gap-4">
                    <span>
                      <span className="block text-xl font-medium tracking-[-0.02em]">{product.name}</span>
                      <span className="mt-1 block text-sm text-muted">{product.specs[0][1]} · {product.specs[1][1]}</span>
                      <span className="mt-2 block font-semibold tabular-nums">{formatPrice(product.price)}</span>
                    </span>
                    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist transition-colors duration-500 group-hover:bg-violet group-hover:text-paper">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-45" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="on-ink relative isolate py-20 text-paper">
        <Aurora tone="dark" />
        <div className="shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-title font-medium">Want a shop like this?</p>
            <p className="mt-4 max-w-xl text-base leading-7 text-paper/85">
              Voltway is a sample website designed and built by FutureTech Africa. It is not a real store, and its products and prices are illustrative.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="light" to="/contact">Talk to FutureTech</Button>
            <Button size="lg" variant="glass" to="/work">Back to the portfolio</Button>
          </div>
        </div>
      </footer>

      <Dialog open={isMenuOpen} onClose={() => setIsMenuOpen(false)} labelledBy="shop-menu-title" closeLabel="Close menu">
        <h2 id="shop-menu-title" className="text-title font-medium">Devices</h2>
        <ul className="mt-8">
          {products.map((product, index) => (
            <li key={product.id} className="border-b border-line">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Wait for the sheet to release the scroll lock.
                  window.setTimeout(() => goToSlide(index + 1), 80);
                }}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-row font-medium transition-transform duration-500 ease-soft group-hover:translate-x-2">{product.name}</span>
                <span className="text-sm text-muted">{product.kind === 'phone' ? 'Phone' : 'Laptop'}</span>
              </button>
            </li>
          ))}
        </ul>
      </Dialog>

      <ProductDialog product={selected} open={isProductOpen} onClose={() => setIsProductOpen(false)} />
    </div>
  );
};

export default TechShop;
