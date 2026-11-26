import { useEffect, useRef } from 'react';
import { MOTION_OK } from '../lib/gsap';

/**
 * Runs a canvas animation only while it is on screen, the tab is visible and it
 * is not paused. Reduced motion gets a single still frame. `setup` receives a
 * fresh canvas and returns { resize(width, height, ratio), frame(seconds),
 * pointer?(x, y) }.
 */
export default function useAnimationSurface(setup, { scale = 1, fps = 60, paused = false } = {}) {
  const host = useRef(null);
  const setupRef = useRef(setup);
  const pausedRef = useRef(paused);
  const syncRef = useRef(null);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  useEffect(() => {
    const element = host.current;
    const canvas = document.createElement('canvas');
    canvas.className = 'block h-full w-full';
    element.appendChild(canvas);

    const surface = setupRef.current(canvas);
    if (!surface) {
      canvas.remove();
      return undefined;
    }

    const motion = window.matchMedia(MOTION_OK);
    let isVisible = false;
    let frameId = 0;
    let last = 0;
    let cursor = null;
    // Start part way in, so a still frame already shows a developed pattern.
    let elapsed = 12;

    const tick = (now) => {
      frameId = requestAnimationFrame(tick);
      if (now - last < 1000 / fps - 2) return;
      elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      // Measure once per frame rather than on every pointer event.
      if (cursor && surface.pointer) {
        const box = element.getBoundingClientRect();
        surface.pointer((cursor.x - box.left) / box.width, (cursor.y - box.top) / box.height);
      }
      surface.frame(elapsed);
    };

    const sync = () => {
      const shouldRun = isVisible && !pausedRef.current && !document.hidden && motion.matches;
      if (shouldRun && !frameId) {
        last = performance.now();
        frameId = requestAnimationFrame(tick);
      } else if (!shouldRun && frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };
    syncRef.current = sync;

    const resize = () => {
      const { clientWidth, clientHeight } = element;
      if (!clientWidth || !clientHeight) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2) * scale;
      const width = Math.max(1, Math.round(clientWidth * ratio));
      const height = Math.max(1, Math.round(clientHeight * ratio));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      surface.resize(width, height, ratio);
      surface.frame(elapsed);
    };

    const handlePointer = (event) => {
      cursor = { x: event.clientX, y: event.clientY };
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      sync();
    });

    resizeObserver.observe(element);
    visibilityObserver.observe(element);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    window.addEventListener('pointermove', handlePointer, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      syncRef.current = null;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      window.removeEventListener('pointermove', handlePointer);
      canvas.remove();
    };
  }, [scale, fps]);

  return host;
}
