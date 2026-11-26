import { useRef } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from '../lib/gsap';

/** Height-animated disclosure panel. Closed content is removed from the tab order. */
const Collapse = ({ open, id, children }) => {
  const panel = useRef(null);
  const isFirstRender = useRef(true);

  useGSAP(() => {
    const instant = isFirstRender.current || prefersReducedMotion();
    isFirstRender.current = false;

    gsap.to(panel.current, {
      height: open ? 'auto' : 0,
      autoAlpha: open ? 1 : 0,
      duration: instant ? 0 : 0.6,
      ease: 'soft',
      overwrite: true,
      // Remeasure only after a real change: every panel mounts at once, and a
      // refresh each would stall page changes. `true` waits for scrolling to stop.
      onComplete: instant ? undefined : () => ScrollTrigger.refresh(true),
    });
  }, { dependencies: [open] });

  return (
    <div ref={panel} id={id} className="overflow-hidden" style={{ height: 0, visibility: 'hidden' }}>
      {children}
    </div>
  );
};

export default Collapse;
