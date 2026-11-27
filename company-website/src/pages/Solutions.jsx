import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { growth, pillars } from '../content/pillars';
import { useMarket } from '../lib/preferences';

const Solutions = () => {
  const motion = usePageMotion();
  const market = useMarket();
  useSeo('Solutions', 'Fintech and payments, business systems, AI and automation, and software engineering for African organisations.');

  return (
    <div ref={motion}>
      <PageIntro title="Four ways we help you operate and grow." actions={<Button size="lg" to="/pricing">See pricing</Button>}>
        We develop financial technology, business systems, intelligent automation and custom software.
      </PageIntro>

      <section className="shell section">
        <ul className="border-b border-line">
          {pillars.map((pillar) => (
            <li key={pillar.id} data-fade className="border-t border-line">
              <Link to={`/solutions/${pillar.id}`} className="group grid gap-2 py-8 lg:grid-cols-[1fr_1.2fr_auto] lg:items-center lg:gap-12">
                <h2 className="text-subheading transition-colors duration-300 group-hover:text-brand-deep">{pillar.name}</h2>
                <p className="max-w-xl text-muted">{pillar.summary}</p>
                <ArrowRight aria-hidden="true" className="h-5 w-5 text-brand-deep transition-transform duration-300 ease-soft group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-16 sm:pb-24">
        <div className="split">
          <h2 data-split className="max-w-xl text-heading">{growth.name}</h2>
          <div data-fade>
            <p className="max-w-xl text-muted">{growth.summary} {growth.description}</p>
            <Button variant="secondary" size="lg" to={`/solutions/${growth.id}`} className="mt-8">See growth services</Button>
          </div>
        </div>
      </section>

      <CallToAction title="Not sure where you fit?" text="Choose your business size and main need, and we will point you to the right starting place.">
        <Button size="lg" to="/pricing">Find the right solution</Button>
        <Button size="lg" variant="secondary" to="/contact">{market.teamCta}</Button>
      </CallToAction>
    </div>
  );
};

export default Solutions;
