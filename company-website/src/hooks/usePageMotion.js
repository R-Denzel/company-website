import { useRef } from 'react';
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';

/**
 * Declarative page motion. Add the returned ref to a page root, then mark elements:
 *   data-split   headline revealed line by line from behind a mask
 *   data-fade    rises and fades in, staggered with neighbours entering together
 *   data-rule    line that draws from the left
 *   data-clip    media block that rises into place
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
    });
  }, { scope });

  return scope;
}
