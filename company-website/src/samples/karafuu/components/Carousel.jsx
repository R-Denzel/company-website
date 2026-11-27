import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { prefersReducedMotion } from '../../../lib/gsap';
import ProductCard from './ProductCard';
import { Heading } from './ui';

const DRAG_THRESHOLD = 6;

/** Sideways row of perfumes: swipe, drag with the mouse, or use the arrows. */
const Carousel = ({ id, title, items }) => {
  const track = useRef(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 });

  const step = (direction) => {
    const card = track.current.firstElementChild;
    track.current.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  };

  // Touch screens already scroll natively; this adds dragging for a mouse.
  const handlePointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    drag.current = { active: true, moved: false, startX: event.clientX, startScroll: track.current.scrollLeft };
  };

  const handlePointerMove = (event) => {
    const state = drag.current;
    if (!state.active) return;
    const distance = event.clientX - state.startX;
    if (!state.moved && Math.abs(distance) < DRAG_THRESHOLD) return;
    if (!state.moved) {
      state.moved = true;
      track.current.style.scrollSnapType = 'none';
      track.current.setPointerCapture(event.pointerId);
    }
    track.current.scrollLeft = state.startScroll - distance;
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    track.current.style.scrollSnapType = '';
  };

  const arrow = 'grid h-12 w-12 place-items-center text-k-bronze transition-colors hover:bg-k-night hover:text-white';

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 py-16 sm:py-24">
      <div className="shell flex items-center justify-between gap-4">
        <button type="button" aria-label="Previous perfumes" onClick={() => step(-1)} className={arrow}><ChevronLeft aria-hidden="true" /></button>
        <Heading id={`${id}-title`} data-split className="text-center text-2xl text-k-bronze">{title}</Heading>
        <button type="button" aria-label="Next perfumes" onClick={() => step(1)} className={arrow}><ChevronRight aria-hidden="true" /></button>
      </div>
      <div
        ref={track}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          // The release at the end of a drag must not open a product.
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="mt-10 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] active:cursor-grabbing sm:px-8 lg:px-16"
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} className="w-[72vw] shrink-0 snap-center sm:w-[42vw] lg:w-[27vw] xl:w-[22rem]" />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
