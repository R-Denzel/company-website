import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { whenReleased } from '../lib/curtainHold';
import { nextFrame, whenSmooth } from '../lib/frames';
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/gsap';

const HEADER_OFFSET = 72;

const scrollForLocation = ({ hash }, smooth) => {
  const target = hash ? document.getElementById(hash.slice(1)) : null;
  const top = target ? target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET : 0;
  window.scrollTo({ top, behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'instant' });
};

/**
 * Covers the outgoing page with a curtain, swaps routes underneath, and lifts the
 * curtain only once the new page has finished its heavy setup.
 *
 * `curtain(to, from)` describes what to show: { mark, label, className, isQuick }.
 * A quick curtain fades; otherwise it slides. `preload(to)` may return a promise
 * for whatever the next page needs.
 */
const PageTransition = ({ header, curtain, preload, children }) => {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [look, setLook] = useState(() => curtain(location, location));
  const cover = useRef(null);
  const label = useRef(null);
  const previous = useRef(location);
  const latest = useRef({ curtain, preload });
  const isQuick = useRef(false);
  // Counts navigations, so a slow page never lifts the curtain over a newer one.
  const journey = useRef(0);

  useEffect(() => {
    latest.current = { curtain, preload };
  });

  useEffect(() => {
    if (location.key === shown.key) return undefined;
    journey.current += 1;

    if (location.pathname === shown.pathname || prefersReducedMotion()) {
      setShown(location);
      gsap.set(cover.current, { autoAlpha: 0 });
      return undefined;
    }

    let isCancelled = false;
    // Fetch while the curtain is moving. A failed load surfaces when the page renders.
    const ready = Promise.resolve(latest.current.preload?.(location)).catch(() => {});

    const next = latest.current.curtain(location, shown);
    setLook(next);

    // Stop a lift still in progress. Done up front: `overwrite` on a tween below
    // would also kill the step that makes the curtain visible.
    gsap.killTweensOf(cover.current);
    const isHidden = gsap.getProperty(cover.current, 'visibility') === 'hidden';
    isQuick.current = Boolean(next.isQuick) && isHidden;

    const timeline = gsap.timeline({
      onComplete: async () => {
        await ready;
        if (!isCancelled) setShown(location);
      },
    });

    if (isQuick.current) {
      timeline
        .set(cover.current, { yPercent: 0, autoAlpha: 0 })
        .to(cover.current, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' });
    } else {
      if (isHidden) gsap.set(cover.current, { yPercent: 100 });
      timeline
        .set(cover.current, { autoAlpha: 1 })
        .to(cover.current, { yPercent: 0, duration: 0.42, ease: 'power3.inOut' })
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.3, ease: 'power2.out' }, 0.14);
    }

    return () => {
      isCancelled = true;
      timeline.kill();
    };
  }, [location, shown]);

  useLayoutEffect(() => {
    const from = previous.current;
    if (from.key === shown.key) return undefined;
    previous.current = shown;

    if (from.pathname === shown.pathname) {
      // A change of filters in the address should leave the reader where they are.
      if (shown.hash || shown.search === from.search) scrollForLocation(shown, true);
      return undefined;
    }

    scrollForLocation(shown, false);
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

      gsap.to(cover.current, {
        ...(isQuick.current
          ? { autoAlpha: 0, duration: 0.35, ease: 'power1.inOut' }
          : { yPercent: -100, duration: 0.55, ease: 'power3.inOut' }),
        overwrite: true,
        onComplete: () => gsap.set(cover.current, { autoAlpha: 0 }),
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
        ref={cover}
        data-curtain
        aria-hidden="true"
        className={`pointer-events-none invisible fixed inset-0 z-[85] flex flex-col items-center justify-center gap-5 opacity-0 will-change-transform ${look.className}`}
      >
        {look.mark && <img src={look.mark} alt="" width="96" height="96" className="h-24 w-24" />}
        <span className="block overflow-hidden pb-2">
          <span ref={label} className="block text-subheading">{look.label}</span>
        </span>
      </div>
    </>
  );
};

export default PageTransition;
