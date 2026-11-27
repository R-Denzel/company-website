import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import ProductSummary from '../components/ProductSummary';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { products } from '../content/products';

const Products = () => {
  const motion = usePageMotion();
  useSeo('Products', 'MyDuka, Payro and CheckinHQ: FutureTech Africa products currently in beta.');

  return (
    <div ref={motion}>
      <PageIntro title="Our products, in beta.">
        Three products you can open today. Each page separates what we saw working in the live app from what is still being confirmed.
      </PageIntro>

      <section className="shell grid gap-x-6 gap-y-16 py-16 sm:py-24 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <ProductSummary key={product.id} product={product} />)}
      </section>

      <CallToAction title="Want to try one?" text="Ask for a walkthrough and tell us how your business works today.">
        <Button size="lg" variant="light" to="/contact">Request a demo</Button>
      </CallToAction>
    </div>
  );
};

export default Products;
