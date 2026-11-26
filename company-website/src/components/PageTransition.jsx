import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { whenReleased } from '../lib/curtainHold';
import { nextFrame, whenSmooth } from '../lib/frames';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/gsap';

const pageNames = {
  '/': 'Home',
  '/about': 'About',
  '/team': 'Team',
  '/projects': 'Services',
  '/portfolio': 'Portfolio',
  '/work/tech-shop': 'Voltway',
  '/opportunities': 'Opportunities',
  '/contact': 'Contact',
};

const HEADER_OFFSET = 72;

const scrollForLocation = ({ hash }, smooth) => {
  const target = hash ? document.getElementById(hash.slice(1)) : null;
  const top = target ? target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET : 0;
  window.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'instant' });
};

/**
 * Covers the outgoing page with a curtain, swaps routes underneath, and lifts the
 * curtain only once the new page has finished its heavy setup. `preload` may
 * return a promise for code the next page needs.
 */
const PageTransition = ({ header, preload, children }) => {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const curtain = useRef(null);
  const label = useRef(null);
  const previous = useRef(location);
  const preloadRef = useRef(preload);
  // Counts navigations, so a slow page never lifts the curtain over a newer one.
  const journey = useRef(0);

  useEffect(() => {
    if (location.key === shown.key) return undefined;
    journey.current += 1;

    if (location.pathname === shown.pathname || prefersReducedMotion()) {
      setShown(location);
      gsap.set(curtain.current, { autoAlpha: 0 });
      return undefined;
    }

    let isCancelled = false;
    // Fetch while the curtain is moving. A failed load surfaces when the page renders.
    const ready = Promise.resolve(preloadRef.current?.(location)).catch(() => {});

    label.current.textContent = pageNames[location.pathname] || '';

    // Stop a lift still in progress. Done up front: `overwrite` on the tween
    // below would also kill the step that makes the curtain visible.
    gsap.killTweensOf(curtain.current);
    const isHidden = gsap.getProperty(curtain.current, 'visibility') === 'hidden';
    if (isHidden) gsap.set(curtain.current, { yPercent: 100 });

    const timeline = gsap.timeline({
      onComplete: async () => {
        await ready;
        if (!isCancelled) setShown(location);
      },
    })
      .set(curtain.current, { autoAlpha: 1 })
      .to(curtain.current, { yPercent: 0, duration: 0.42, ease: 'power3.inOut' })
      .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.3, ease: 'power2.out' }, 0.14);

    return () => {
      isCancelled = true;
      timeline.kill();
    };
  }, [location, shown]);

  useLayoutEffect(() => {
    const from = previous.current;
    if (from.key === shown.key) return undefined;
    previous.current = shown;

    const samePage = from.pathname === shown.pathname;
    scrollForLocation(shown, samePage);

    if (samePage) return undefined;

    document.getElementById('main')?.focus({ preventScroll: true });

    const mine = journey.current;
    const isStale = () => mine !== journey.current;
    const reveal = async () => {
      await nextFrame();
      await nextFrame();
      await whenReleased();
      if (isStale()) return;
      // Layout can still shift while fonts and images settle, so measure again.
      ScrollTrigger.refresh();
      if (shown.hash) scrollForLocation(shown, false);
      await whenSmooth();
      if (isStale()) return;

      gsap.to(curtain.current, {
        yPercent: -100,
        duration: 0.55,
        ease: 'power3.inOut',
        overwrite: true,
        onComplete: () => gsap.set(curtain.current, { autoAlpha: 0 }),
      });
    };
    reveal();
    return undefined;
  }, [shown]);

  // Direct visits to a hash link (for example /#pricing) need one scroll after first paint.
  useEffect(() => {
    if (!window.location.hash) return undefined;
    const timer = window.setTimeout(() => scrollForLocation(window.location, false), 150);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Swapped along with the page, so it never changes before the curtain covers it. */}
      {header?.(shown)}
      <div key={shown.pathname}>{children(shown)}</div>
      <div
        ref={curtain}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-[#0e0933] text-paper opacity-0 will-change-transform"
      >
        <img src="/favicon.svg" alt="" width="96" height="96" className="h-24 w-24" />
        <span className="block overflow-hidden pb-2">
          <span ref={label} className="block text-row font-medium" />
        </span>
      </div>
    </>
  );
};

export default PageTransition;
