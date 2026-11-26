import { lazy, Suspense, useState } from 'react';
import { loadedTechShop, loadTechShop } from './load';

// Loaded on demand so the 3D library stays out of the main site's bundle.
const LazyTechShop = lazy(loadTechShop);

/**
 * Renders the shop at once when it was fetched in advance. Going through `lazy`
 * then would still show the fallback and delay the shop until after the curtain
 * had started to lift.
 */
const TechShopRoute = () => {
  // Chosen once per visit, so the component never swaps and remounts.
  const [TechShop] = useState(() => loadedTechShop() ?? LazyTechShop);

  return (
    <Suspense fallback={<div role="status" className="grid h-svh place-items-center bg-ink text-paper">Loading the sample…</div>}>
      <TechShop />
    </Suspense>
  );
};

export default TechShopRoute;
