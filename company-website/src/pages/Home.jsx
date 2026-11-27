import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Aurora from '../components/Aurora';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import HeroWordmark from '../components/HeroWordmark';
import MarketSelector from '../components/MarketSelector';
import Photo from '../components/Photo';
import ProjectCard from '../components/ProjectCard';
import ServiceList from '../components/ServiceList';
import ServiceSelectorModal from '../components/ServiceSelectorModal';
import StatusBadge from '../components/StatusBadge';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import useServiceSelector from '../hooks/useServiceSelector';
import { segments } from '../content/segments';
import { photos } from '../data/photos';
import { featuredProjects, sampleProjects } from '../data/projects';
import { teamMembers } from '../data/team';
import { setSegment } from '../lib/preferences';

const workflow = [
  { number: '01', title: 'Tell us what you need', text: 'Choose a service and share the essentials about your idea.' },
  { number: '02', title: 'Shape the scope', text: 'We learn about your goals, users, market, and timeline.' },
  { number: '03', title: 'Agree on a plan', text: 'We follow up to discuss the right approach and next steps.' },
  { number: '04', title: 'Build together', text: 'Design, development, feedback, and launch—kept clear from day one.' },
];

const [leadProject, ...otherProjects] = featuredProjects;

const Home = () => {
  const selector = useServiceSelector();
  const motion = usePageMotion();
  useSeo('', 'FutureTech Africa develops financial technology, business systems, intelligent automation and custom software for African organisations.');

  return (
    <div ref={motion}>
      <ServiceSelectorModal {...selector.modalProps} />

      <section className="relative isolate">
        <Aurora mask="bottom" />
        <div className="shell flex min-h-[calc(100svh-72px)] flex-col justify-between gap-12 pb-6 pt-10 sm:pt-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h1 data-split data-delay="0.35" className="max-w-xl text-statement font-medium">
              We build technology that moves businesses forward.
            </h1>
            <div>
              <p data-fade data-delay="0.55" className="max-w-xl text-lead text-muted">
                We develop financial technology, business systems, intelligent automation and custom software that help African organisations operate, transact and grow.
              </p>
              <div data-fade data-delay="0.6" className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" to="/pricing">Find your solution</Button>
                <Button size="lg" variant="secondary" onClick={() => selector.open()}>Select a service</Button>
              </div>
            </div>
          </div>

          <div>
            <p data-fade data-delay="0.9" className="mb-4 text-right text-sm text-muted sm:text-base">
              Uganda &amp; Kenya
            </p>
            <HeroWordmark text="FutureTech" />
          </div>
        </div>
      </section>

      <section id="selected-work" aria-label={`Featured product: ${leadProject.name}`}>
        <div className="on-ink relative isolate pb-12 pt-12 text-paper sm:pb-16 sm:pt-24">
          <Aurora tone="dark" expand />
          <div className="shell">
            <Link to="/products/myduka" className="group mx-auto block max-w-6xl">
              <div data-grow className="overflow-hidden rounded-xl border border-ink-line">
                <img src={leadProject.image} alt={leadProject.alt} width="1440" height="900" className="block w-full transition-transform duration-1000 ease-soft group-hover:scale-[1.025]" />
              </div>
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-title font-medium">MyDuka</h2>
                    <StatusBadge status={leadProject.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted-invert">{leadProject.category}</p>
                  <p className="mt-3 max-w-lg text-base leading-7 text-muted-invert">{leadProject.description}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-paper py-2 pl-6 pr-2 font-medium text-ink sm:self-auto">
                  View product
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-45" />
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-32">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">Products you can try, and samples of what we build.</h2>
          <p data-fade className="max-w-xl text-lead text-muted">
            Our own products are in beta. Sample websites are demonstrations, not client projects.
          </p>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2">
          {[...otherProjects, ...sampleProjects].map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        <div data-fade className="mt-12 flex flex-wrap gap-3">
          <Button variant="secondary" to="/products">All products</Button>
          <Button variant="secondary" to="/work">All our work</Button>
        </div>
      </section>

      <section id="services" className="on-ink relative isolate scroll-mt-24 py-20 text-paper sm:py-32">
        <Aurora tone="dark" />
        <div className="shell split">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-md text-title font-medium">Technology for the way you work.</h2>
            <p data-fade className="mt-6 max-w-md text-lead text-muted-invert">
              Four core areas, with growth and visibility services alongside.
            </p>
            <div data-fade className="mt-8">
              <Button variant="light" to="/solutions">Explore solutions</Button>
            </div>
          </div>
          <ServiceList onSelect={selector.open} />
        </div>
      </section>

      <section id="pricing" className="shell scroll-mt-24 py-20 sm:py-32">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">Which best describes your organisation?</h2>
          <div data-fade>
            <p className="max-w-xl text-lead text-muted">Choose a starting point. Complexity can matter more than headcount, and we confirm the fit after an assessment.</p>
            <div className="mt-6"><MarketSelector /></div>
          </div>
        </div>
        <ul className="mt-12">
          {segments.map((segment) => (
            <li key={segment.id}>
              <div data-rule className="h-px bg-line" />
              <Link data-fade to="/pricing" onClick={() => setSegment(segment.id)} className="group grid gap-2 py-7 sm:grid-cols-2 sm:items-center sm:gap-16">
                <span>
                  <span className="block text-row font-medium transition-transform duration-500 ease-soft group-hover:translate-x-3">{segment.name}</span>
                  <span className="mt-1 block text-sm font-semibold text-violet-deep">{segment.size}</span>
                </span>
                <span className="flex items-center justify-between gap-6 text-base leading-7 text-muted">
                  {segment.needs}
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist transition-colors duration-500 group-hover:bg-violet group-hover:text-paper">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pb-20 sm:pb-32">
        <p data-scrub className="max-w-5xl text-title font-medium">
          Good work starts with a clear conversation. We keep the process collaborative, practical, and focused on what you want to achieve.
        </p>
        <div className="split mt-20 sm:mt-28">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-md text-title font-medium">A straightforward path from idea to launch.</h2>
            <div data-fade className="mt-8">
              <Button variant="secondary" to="/about">More about how we work</Button>
            </div>
            <Photo {...photos.developer} className="mt-12 aspect-[4/3] max-w-md" />
          </div>
          <ol>
            {workflow.map((step) => (
              <li key={step.number}>
                <div data-rule className="h-px bg-line" />
                <div data-fade className="grid grid-cols-[3.5rem_1fr] gap-4 py-8 sm:grid-cols-[6rem_1fr]">
                  <span className="text-row font-medium tabular-nums text-violet">{step.number}</span>
                  <div>
                    <h3 className="text-row font-medium">{step.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-7 text-muted">{step.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell pb-20 sm:pb-32">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">Get to know the people behind our work.</h2>
          <div data-fade><Button variant="secondary" to="/team">Meet the team</Button></div>
        </div>
        <ul className="mt-12">
          {teamMembers.map((member) => (
            <li key={member.name}>
              <div data-rule className="h-px bg-line" />
              <Link data-fade to="/team" className="group grid gap-1 py-6 sm:grid-cols-2 sm:items-baseline sm:gap-16">
                <span className="text-row font-medium transition-transform duration-500 ease-soft group-hover:translate-x-3">{member.name}</span>
                <span className="text-base text-muted">{member.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CallToAction
        title="Have a project in mind?"
        text="Tell us what you’re working on. We’ll start by understanding your idea and what you need next."
      >
        <Button size="lg" variant="light" onClick={() => selector.open()}>Start a project</Button>
        <Button size="lg" variant="glass" to="/contact">Book a discovery call</Button>
      </CallToAction>
    </div>
  );
};

export default Home;
