import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';

const BASE_SIZE = 100;

/** Company name sized to span its container exactly, rising letter by letter on arrival. */
const HeroWordmark = ({ text }) => {
  const frame = useRef(null);
  const word = useRef(null);

  useLayoutEffect(() => {
    const fit = () => {
      if (!frame.current || !word.current) return;
      word.current.style.fontSize = `${BASE_SIZE}px`;
      const ratio = frame.current.clientWidth / word.current.getBoundingClientRect().width;
      word.current.style.fontSize = `${BASE_SIZE * ratio}px`;
    };

    fit();
    // Refit whenever the web font arrives, which can be well after first paint.
    document.fonts.ready.then(fit);
    document.fonts.addEventListener('loadingdone', fit);
    const observer = new ResizeObserver(fit);
    observer.observe(frame.current);
    return () => {
      document.fonts.removeEventListener('loadingdone', fit);
      observer.disconnect();
    };
  }, [text]);

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const letters = frame.current.querySelectorAll('[data-letter]');
      gsap.from(letters, { yPercent: 105, duration: 1.3, ease: 'soft', stagger: 0.045, delay: 0.3 });
      gsap.to(word.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: frame.current, start: 'bottom bottom', end: 'bottom top', scrub: true },
      });
    });
  }, { scope: frame });

  return (
    <div ref={frame} aria-hidden="true" className="select-none overflow-hidden">
      <span ref={word} className="inline-block whitespace-nowrap pb-[0.2em] pr-[0.04em] font-semibold leading-[0.82] tracking-[-0.04em]">
        {[...text].map((letter, index) => (
          // The letters never reorder, so their position is a stable key.
          <span key={index} data-letter className="inline-block">{letter}</span>
        ))}
      </span>
    </div>
  );
};

export default HeroWordmark;
