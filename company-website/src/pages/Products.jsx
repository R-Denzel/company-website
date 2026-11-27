import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import ProjectGrid from '../components/ProjectGrid';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { productCards } from '../data/portfolio';

const Products = () => {
  const motion = usePageMotion();
  useSeo('Products', 'MyDuka, Payro and CheckinHQ: FutureTech Africa products currently in beta.');

  return (
    <div ref={motion}>
      <PageIntro title="Our products, in beta.">
        Three products you can open today. Each page separates what we saw working in the live app from what is still being confirmed.
      </PageIntro>

      <section className="shell section">
        <ProjectGrid items={productCards} />
      </section>

      <CallToAction title="Want to try one?" text="Ask for a walkthrough and tell us how your business works today.">
        <Button size="lg" to="/contact">Request a demo</Button>
      </CallToAction>
    </div>
  );
};

export default Products;
