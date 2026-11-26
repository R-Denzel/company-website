let component = null;

/** One shared import, so the shop can be fetched before it is shown. */
export const loadTechShop = () => import('./TechShop').then((module) => {
  component = module.default;
  return module;
});

/** The shop component once it has been fetched, otherwise null. */
export const loadedTechShop = () => component;
