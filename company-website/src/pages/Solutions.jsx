import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
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

      <section className="on-ink relative isolate py-16 text-paper sm:py-24">
        <Aurora tone="dark" expand />
        <ul className="shell">
          {pillars.map((pillar) => (
            <li key={pillar.id} data-fade className="border-t border-ink-line last:border-b">
              <Link to={`/solutions/${pillar.id}`} className="group grid gap-4 py-10 lg:grid-cols-[1fr_1fr_auto] lg:items-center lg:gap-12">
                <h2 className="text-title font-medium transition-transform duration-500 ease-soft group-hover:translate-x-2">{pillar.name}</h2>
                <p className="max-w-xl text-lead text-paper/85">{pillar.summary}</p>
                <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-soft group-hover:rotate-45" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">{growth.name}</h2>
          <div data-fade>
            <p className="max-w-xl text-lead text-muted">{growth.summary} {growth.description}</p>
            <Button variant="secondary" size="lg" to={`/solutions/${growth.id}`} className="mt-8">See growth services</Button>
          </div>
        </div>
      </section>

      <CallToAction title="Not sure where you fit?" text="Choose your business size and main need, and we will point you to the right starting place.">
        <Button size="lg" variant="light" to="/pricing">Find the right solution</Button>
        <Button size="lg" variant="glass" to="/contact">{market.teamCta}</Button>
      </CallToAction>
    </div>
  );
};

export default Solutions;
