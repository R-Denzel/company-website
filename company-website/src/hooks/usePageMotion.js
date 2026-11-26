import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';

/**
 * Declarative page motion. Add the returned ref to a page root, then mark elements:
 *   data-split     headline revealed line by line from behind a mask
 *   data-fade      rises and fades in, staggered with neighbours entering together
 *   data-rule      hairline that draws from the left
 *   data-clip      media block that unmasks upward
 *   data-parallax  image that drifts inside its (overflow-hidden) frame
 *   data-expand    background layer that widens to full bleed as its parent scrolls in
 *   data-grow      media that scales up to size as it scrolls into view
 *   data-scrub     paragraph whose words darken as the reader scrolls
 * Content is fully visible without JavaScript or with reduced motion.
 */
export default function usePageMotion() {
  const scope = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add(MOTION_OK, () => {
      const select = gsap.utils.selector(scope);

      select('[data-split]').forEach((element) => {
        SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: (split) => gsap.from(split.lines, {
            yPercent: 112,
            duration: 1.1,
            ease: 'soft',
            stagger: 0.09,
            delay: Number(element.dataset.delay || 0),
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          }),
        });
      });

      const fading = select('[data-fade]');
      if (fading.length) {
        // Opacity only, so unrevealed controls stay reachable by keyboard.
        gsap.set(fading, { opacity: 0, y: 28 });
        ScrollTrigger.batch(fading, {
          start: 'top 94%',
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'soft',
            stagger: 0.08,
            delay: Number(batch[0]?.dataset.delay || 0),
            overwrite: true,
          }),
        });
      }

      select('[data-rule]').forEach((element) => {
        gsap.from(element, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'soft',
          scrollTrigger: { trigger: element, start: 'top 96%', once: true },
        });
      });

      // Transform and opacity only: the graphics card can animate these without
      // repainting, unlike a moving clip.
      select('[data-clip]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 72,
          scale: 0.95,
          duration: 1.1,
          ease: 'soft',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        });
      });

      select('[data-parallax]').forEach((element) => {
        gsap.fromTo(element, { yPercent: -6, scale: 1.14 }, {
          yPercent: 6,
          scale: 1.14,
          ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      select('[data-expand]').forEach((element) => {
        // Ends slightly wider than the page so its rounded corners leave the screen.
        gsap.fromTo(element, { scaleX: 0.94 }, {
          scaleX: 1.04,
          ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top 85%', end: 'top 15%', scrub: 0.4 },
        });
      });

      select('[data-grow]').forEach((element) => {
        gsap.fromTo(element, { scale: 0.82, yPercent: 8 }, {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'center 55%', scrub: 0.4 },
        });
      });

      select('[data-scrub]').forEach((element) => {
        SplitText.create(element, {
          type: 'words',
          autoSplit: true,
          onSplit: (split) => gsap.from(split.words, {
            opacity: 0.16,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: element, start: 'top 82%', end: 'bottom 52%', scrub: true },
          }),
        });
      });
    });
  }, { scope });

  return scope;
}
