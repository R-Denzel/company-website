import { createElement, lazy, Suspense, useState } from 'react';

/**
 * A page that loads on demand and can also be fetched in advance. When it is
 * already here it renders at once: going through `lazy` would show the fallback
 * and delay the page until after the transition curtain had started to lift.
 * `prepare` may fetch whatever the destination needs before it is shown.
 */
export default function preloadable(importer, prepare) {
  let component = null;

  const load = () => importer().then((module) => {
    component = module.default;
    return module;
  });

  const LazyPage = lazy(load);
  const fallback = createElement('div', { role: 'status', className: 'grid h-svh place-items-center bg-ink text-paper' }, 'Loading the sample…');

  const Page = () => {
    // Chosen once per visit, so the component never swaps and remounts.
    const [Chosen] = useState(() => component ?? LazyPage);
    return createElement(Suspense, { fallback }, createElement(Chosen));
  };

  return {
    Page,
    preload: async (location) => {
      await load();
      if (location) await prepare?.(location);
    },
  };
}
