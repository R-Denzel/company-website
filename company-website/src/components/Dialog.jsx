import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

/** Side-sheet dialog with enter/exit motion, focus trap, scroll lock and Escape to close. */
const Dialog = ({ open, onClose, labelledBy, closeLabel = 'Close', closeClassName = 'bg-mist hover:bg-ink hover:text-paper', children }) => {
  const [isMounted, setIsMounted] = useState(open);
  const overlay = useRef(null);
  const panel = useRef(null);
  const closeRef = useRef(onClose);

  if (open && !isMounted) setIsMounted(true);

  useEffect(() => {
    closeRef.current = onClose;
  });

  useGSAP(() => {
    if (!isMounted) return;
    const duration = prefersReducedMotion() ? 0 : 1;

    if (open) {
      // Opacity, not visibility: the panel must be focusable on the first frame.
      gsap.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.4 * duration });
      gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.8 * duration, ease: 'curtain' });
    } else {
      gsap.to(panel.current, { xPercent: 100, duration: 0.55 * duration, ease: 'curtain' });
      gsap.to(overlay.current, {
        opacity: 0,
        duration: 0.35 * duration,
        delay: 0.2 * duration,
        onComplete: () => setIsMounted(false),
      });
    }
  }, { dependencies: [open, isMounted] });

  useEffect(() => {
    if (!open || !isMounted) return undefined;

    const returnFocusTo = document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    panel.current.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;

      const items = [...panel.current.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first) return;

      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = previousOverflow;
      returnFocusTo?.focus?.({ preventScroll: true });
    };
  }, [open, isMounted]);

  if (!isMounted) return null;

  return createPortal(
    <div
      ref={overlay}
      className="fixed inset-0 z-[80] flex justify-end bg-ink/60"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative h-full w-full max-w-2xl overflow-y-auto overscroll-contain bg-paper px-5 pb-10 pt-20 outline-none sm:px-12"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className={`group absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full transition-colors sm:right-8 ${closeClassName}`}
        >
          <X className="h-5 w-5 transition-transform duration-500 ease-soft group-hover:rotate-90" />
        </button>
        {children}
      </section>
    </div>,
    document.body,
  );
};

export default Dialog;
