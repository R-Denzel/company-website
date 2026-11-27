import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import GoldDust from '../components/GoldDust';
import { Heading, PhotoCredit, ShopButton } from '../components/ui';
import { collectionPath, families, featuredNotes, findProduct, photos, products } from '../data';
import { prefersReducedMotion } from '../../../lib/gsap';

const slides = [photos.silk, photos.cinnamon, photos.rose];
const SLIDE_MS = 6000;

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, isPlaying]);

  return (
    <section aria-label="Welcome" className="on-ink relative isolate h-[min(78svh,46rem)] min-h-[26rem] overflow-hidden bg-k-night">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={i === index ? slide.alt : ''}
          aria-hidden={i !== index}
          decoding="async"
          // Only transform and opacity change, so the slow drift stays smooth.
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-linear ${
            i === index ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
          }`}
          style={{ transitionDuration: '1600ms, 7600ms' }}
        />
      ))}
      <div className="absolute inset-0 bg-black/45" />
      <GoldDust />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <Heading as="h1" data-split data-delay="0.3" className="max-w-3xl text-[clamp(1.5rem,3.6vw,2.75rem)]">
          Welcome to the house of Karafuu
        </Heading>
        <div data-fade data-delay="0.7" className="mt-8">
          <ShopButton to={collectionPath()}>Discover the perfumes</ShopButton>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 text-white">
        {slides.map((slide, i) => (
          <button key={slide.src} type="button" aria-label={`Show picture ${i + 1}`} aria-current={i === index} onClick={() => setIndex(i)} className="grid h-10 w-8 place-items-center">
            <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-k-gold' : 'w-1.5 bg-white/60'}`} />
          </button>
        ))}
        <button type="button" onClick={() => setIsPlaying((current) => !current)} aria-label={isPlaying ? 'Pause the slideshow' : 'Play the slideshow'} className="grid h-10 w-10 place-items-center">
          {isPlaying ? <Pause aria-hidden="true" className="h-3.5 w-3.5" /> : <Play aria-hidden="true" className="h-3.5 w-3.5" />}
        </button>
      </div>
      <PhotoCredit photo={slides[index]} />
    </section>
  );
};

const tiles = [
  { label: 'For women', to: collectionPath('?for=women'), image: findProduct('saffron-veil').images[2] },
  { label: 'For men', to: collectionPath('?for=men'), image: findProduct('oud-nocturne').images[2] },
];

const Banner = ({ photo, title, text, action, to, id }) => (
  <section id={id} className="on-ink relative isolate flex min-h-[32rem] scroll-mt-16 items-center justify-center overflow-hidden bg-k-night px-6 py-24 text-center text-white">
    <img data-parallax src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div className="absolute inset-0 -z-10 bg-black/60" />
    <div className="max-w-xl">
      <Heading data-split className="text-[clamp(1.35rem,2.6vw,2rem)]">{title}</Heading>
      <p data-fade className="mt-5 text-base leading-8 text-white/85">{text}</p>
      <div data-fade className="mt-8">
        <ShopButton tone="outline-light" to={to}>{action}</ShopButton>
      </div>
    </div>
    <PhotoCredit photo={photo} />
  </section>
);

const Home = () => (
  <>
    <Hero />

    <div className="grid gap-4 bg-white px-0 py-4 sm:px-4 md:grid-cols-2">
      {tiles.map((tile) => (
        <Link key={tile.label} to={tile.to} className="group relative block overflow-hidden bg-k-night">
          <img
            data-clip
            src={tile.image}
            alt=""
            width="1200"
            height="1200"
            loading="lazy"
            decoding="async"
            // Cropped from the top, so the cap leads and the button has clear glass behind it.
            className="aspect-[4/3] w-full object-cover object-top transition-transform duration-1000 ease-soft group-hover:!scale-105"
          />
          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-k-bronze px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-500 group-hover:bg-k-night">
            {tile.label}
          </span>
        </Link>
      ))}
    </div>

    <Carousel id="gifts" title="Gift ideas" items={products} />

    <section aria-label="Choose by scent" className="shell grid border-y border-k-line md:grid-cols-2 md:divide-x md:divide-k-line">
      {[
        { title: 'Ingredients', links: featuredNotes.map((note) => ({ label: note, to: collectionPath(`?note=${encodeURIComponent(note)}`) })) },
        { title: 'Aroma type', links: families.map((family) => ({ label: family, to: collectionPath(`?family=${family}`) })) },
      ].map((group) => (
        <div key={group.title} data-fade className="px-4 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-k-smoke">Select by</p>
          <Heading className="mt-2 text-2xl text-k-bronze">{group.title}</Heading>
          <ul className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="block border border-k-line px-5 py-3 text-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:border-k-night hover:bg-k-night hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <div className="grid gap-4 py-4 sm:px-4">
      <Banner
        id="story"
        photo={photos.cloves}
        title="Named for the clove"
        text="Karafuu is the Swahili word for clove. Our imagined house begins with that small dried bud and the warmth it lends to everything around it."
        action="Smell the clove"
        to={collectionPath('?note=Clove')}
      />
      <Banner
        photo={photos.spices}
        title="Begin with an ingredient"
        text="Saffron, rose, cedar or sea salt: pick the note you love and see where it appears."
        action="Browse every note"
        to={collectionPath()}
      />
      <Banner
        photo={photos.anise}
        title="A house made to show what is possible"
        text="This shop is a demonstration. If you want one like it for your own products, our team can talk it through with you."
        action="Talk to FutureTech"
        to="/contact"
      />
    </div>
  </>
);

export default Home;
