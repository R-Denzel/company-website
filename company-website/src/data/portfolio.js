// One shape for everything shown in a portfolio grid, so every entry gets the same card.
import { products } from '../content/products';
import { sampleProjects } from './projects';

export const productCards = products.map((product) => ({
  key: product.id,
  productId: product.id,
  name: product.name,
  category: product.category,
  description: product.project.description,
  status: product.status,
  image: product.project.image,
  alt: product.project.alt,
  to: `/products/${product.id}`,
  action: 'View product',
}));

export const sampleCards = sampleProjects.map((project) => ({
  key: project.url,
  name: project.name,
  category: project.category,
  description: project.description,
  image: project.image,
  alt: project.alt,
  to: project.url,
  action: 'Open sample website',
  isSample: true,
}));
