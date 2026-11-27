import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import Headline from '../components/Headline';
import MarketSelector from '../components/MarketSelector';
import Photo from '../components/Photo';
import ProjectGrid from '../components/ProjectGrid';
import ServiceList from '../components/ServiceList';
import ServiceSelectorModal from '../components/ServiceSelectorModal';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import useServiceSelector from '../hooks/useServiceSelector';
import { segments } from '../content/segments';
import { photos } from '../data/photos';
import { productCards, sampleCards } from '../data/portfolio';
import { teamMembers } from '../data/team';
import { setSegment } from '../lib/preferences';

const workflow = [
  { number: '01', title: 'Tell us what you need', text: 'Choose a service and share the essentials about your idea.' },
  { number: '02', title: 'Shape the scope', text: 'We learn about your goals, users, market, and timeline.' },
  { number: '03', title: 'Agree on a plan', text: 'We follow up to discuss the right approach and next steps.' },
  { number: '04', title: 'Build together', text: 'Design, development, feedback, and launch—kept clear from day one.' },
];

const Home = () => {
  const selector = useServiceSelector();
  const motion = usePageMotion();
  useSeo('', 'FutureTech Africa develops financial technology, business systems, intelligent automation and custom software for African organisations.');

  return (
    <div ref={motion}>
      <ServiceSelectorModal {...selector.modalProps} />

      <section className="on-ink logo-ground relative text-paper">
        <div className="shell section grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <h1 data-split data-delay="0.1" className="max-w-xl text-heading">
              <Headline text="We build technology that moves businesses forward." />
            </h1>
            <p data-fade data-delay="0.15" className="mt-5 max-w-xl text-muted-invert">
              We develop financial technology, business systems, intelligent automation and custom software that help African organisations operate, transact and grow.
            </p>
            <div data-fade data-delay="0.2" className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" to="/pricing">Find your solution</Button>
              <Button size="lg" variant="secondary" onClick={() => selector.open()}>Select a service</Button>
            </div>
            <p data-fade data-delay="0.25" className="mt-8 text-sm text-muted-invert">Uganda &amp; Kenya</p>
          </div>
          <Photo {...photos.collaborators} className="slant aspect-[4/3] !rounded-none [&>figcaption]:right-[13%]" />
        </div>
        <div data-rule aria-hidden="true" className="streak" />
      </section>

      <section id="selected-work" className="shell section scroll-mt-24" aria-labelledby="work-heading">
        <div className="split">
          <h2 id="work-heading" data-split className="max-w-xl text-heading"><Headline text="Products you can try, and samples of what we build." /></h2>
          <p data-fade className="max-w-xl text-muted">
            Our own products are in beta. Sample websites are demonstrations, not client projects.
          </p>
        </div>
        <div className="mt-12">
          <ProjectGrid items={[...productCards, ...sampleCards]} centered />
        </div>
        <div data-fade className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="secondary" to="/products">All products</Button>
          <Button variant="secondary" to="/work">All our work</Button>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-mist">
        <div className="shell section split">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-xl text-heading"><Headline text="Technology for the way you work." /></h2>
            <p data-fade className="mt-4 max-w-md text-muted">
              Four core areas, with growth and visibility services alongside.
            </p>
            <div data-fade className="mt-8">
              <Button variant="secondary" to="/solutions">Explore solutions</Button>
            </div>
          </div>
          <ServiceList onSelect={selector.open} />
        </div>
      </section>

      <section id="pricing" className="shell section scroll-mt-24">
        <div className="split">
          <h2 data-split className="max-w-xl text-heading"><Headline text="Which best describes your organisation?" /></h2>
          <div data-fade>
            <p className="max-w-xl text-muted">Choose a starting point. Complexity can matter more than headcount, and we confirm the fit after an assessment.</p>
            <div className="mt-6"><MarketSelector /></div>
          </div>
        </div>
        <ul className="mt-12 border-b border-line">
          {segments.map((segment) => (
            <li key={segment.id} data-fade className="border-t border-line">
              <Link to="/pricing" onClick={() => setSegment(segment.id)} className="group grid gap-2 py-6 sm:grid-cols-2 sm:items-center sm:gap-16">
                <span>
                  <span className="block text-subheading transition-colors duration-300 group-hover:text-brand-deep">{segment.name}</span>
                  <span className="mt-1 block text-sm text-muted">{segment.size}</span>
                </span>
                <span className="flex items-center justify-between gap-6 text-muted">
                  {segment.needs}
                  <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-deep transition-transform duration-300 ease-soft group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="shell section split">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-xl text-heading"><Headline text="A straightforward path from idea to launch." /></h2>
            <p data-fade className="mt-4 max-w-md text-muted">
              Good work starts with a clear conversation. We keep the process collaborative, practical, and focused on what you want to achieve.
            </p>
            <div data-fade className="mt-8">
              <Button variant="secondary" to="/about">More about how we work</Button>
            </div>
            <Photo {...photos.developer} className="mt-10 aspect-[4/3] max-w-md" />
          </div>
          <ol className="border-b border-line">
            {workflow.map((step) => (
              <li key={step.number} data-fade className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6">
                <span className="text-subheading tabular-nums text-brand-deep">{step.number}</span>
                <div>
                  <h3 className="text-subheading">{step.title}</h3>
                  <p className="mt-2 max-w-md text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="shell section">
          <div className="split">
            <h2 data-split className="max-w-xl text-heading"><Headline text="Get to know the people behind our work." /></h2>
            <div data-fade><Button variant="secondary" to="/team">Meet the team</Button></div>
          </div>
          <ul className="mt-12 border-b border-line">
            {teamMembers.map((member) => (
              <li key={member.name} data-fade className="border-t border-line">
                <Link to="/team" className="group grid gap-1 py-5 sm:grid-cols-2 sm:items-baseline sm:gap-16">
                  <span className="text-subheading transition-colors duration-300 group-hover:text-brand-deep">{member.name}</span>
                  <span className="text-muted">{member.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction
        title="Have a project in mind?"
        text="Tell us what you’re working on. We’ll start by understanding your idea and what you need next."
      >
        <Button size="lg" onClick={() => selector.open()}>Start a project</Button>
        <Button size="lg" variant="secondary" to="/contact">Book a discovery call</Button>
      </CallToAction>
    </div>
  );
};

export default Home;
