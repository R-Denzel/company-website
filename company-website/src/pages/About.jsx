import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import Constellation from '../components/Constellation';
import PageIntro from '../components/PageIntro';
import Photo from '../components/Photo';
import { photos } from '../data/photos';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { services } from '../data/services';

const principles = [
  {
    title: 'Start with your goals',
    description: 'We take time to understand the people, needs, and day-to-day problems behind each project.',
  },
  {
    title: 'Build in partnership',
    description: 'You stay part of the process, with clear conversations from first brief through delivery.',
  },
  {
    title: 'Keep it practical',
    description: 'We focus on useful, maintainable digital tools that fit the work they are meant to support.',
  },
  {
    title: 'Care about the details',
    description: 'Thoughtful design, reliable implementation, and a clear handover all matter.',
  },
];

const foundingGoals = [
  {
    title: 'Better digital payments',
    description: 'Create dependable payment experiences that make transactions simpler for people and businesses.',
  },
  {
    title: 'Value for money',
    description: 'Build fit-for-purpose technology with clear, lasting value for the organizations investing in it.',
  },
  {
    title: 'Recognition for developers',
    description: 'Recognize developers as creators and support a meaningful stake in the value their work helps create.',
  },
  {
    title: 'IT that helps companies',
    description: 'Help organizations use IT to improve operations, serve customers, and grow.',
  },
  {
    title: 'Explore what technology can do',
    description: 'Explore responsible uses of advanced AI, including the long-term potential of superintelligence, across industries.',
  },
];

const About = () => {
  const motion = usePageMotion();
  useSeo('About', 'Why FutureTech Africa started, and how we work with businesses and institutions.');

  return (
    <div ref={motion}>
      <PageIntro
        title="Technology should make good work easier."
        actions={<Button size="lg" to="/contact">Tell us what you’re building</Button>}
      >
        We help businesses and institutions turn practical ideas into useful digital products—from websites and mobile apps to custom software and payment tools.
      </PageIntro>

      <div className="shell">
        <Photo {...photos.microchip} className="h-[70svh] min-h-[24rem]" />
      </div>

      <section className="shell py-20 sm:py-32">
        <div className="split">
          <h2 data-split className="max-w-lg text-title font-medium">
            Technology should create value for the people who use it and build it.
          </h2>
          <p data-fade className="max-w-xl text-lead text-muted">
            We started FutureTech Africa to make technology more useful and impactful: improving payments, delivering value for money, recognizing developers and the stake they have in their work, and helping companies use IT to solve real problems. We also want to explore how advanced technology and AI can serve many industries responsibly.
          </p>
        </div>
        <ul className="mt-16 sm:mt-24">
          {foundingGoals.map((goal) => (
            <li key={goal.title}>
              <div data-rule className="h-px bg-line" />
              <div data-fade className="grid gap-3 py-8 lg:grid-cols-2 lg:gap-16">
                <h3 className="text-row font-medium">{goal.title}</h3>
                <p className="max-w-xl text-base leading-7 text-muted">{goal.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="on-ink relative isolate bg-ink py-20 text-paper sm:py-32">
        <Constellation />
        <div className="shell">
          <p data-scrub className="max-w-5xl text-title font-medium">
            Digital projects work best when they start with a real need. We bring design and development together to help clarify the problem, agree on a useful scope, and make something people can use. The right approach depends on the project—so we begin by listening.
          </p>

          <h2 data-split className="mt-24 max-w-2xl text-title font-medium sm:mt-36">
            Clear thinking. Useful technology. Shared progress.
          </h2>
          <div className="mt-12 grid gap-x-16 md:grid-cols-2">
            {principles.map((principle) => (
              <article key={principle.title}>
                <div data-rule className="h-px bg-ink-line" />
                <div data-fade className="py-8">
                  <h3 className="text-row font-medium">{principle.title}</h3>
                  <p className="mt-3 max-w-md text-base leading-7 text-muted-invert">{principle.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-32">
        <div className="split">
          <h2 data-split className="max-w-lg text-title font-medium">Get to know the people behind our work.</h2>
          <div data-fade>
            <p className="max-w-xl text-lead text-muted">
              Explore the people at FutureTech Africa and the roles they bring to each project.
            </p>
            <Button size="lg" to="/team" className="mt-8">Meet the team</Button>
          </div>
        </div>
      </section>

      <div className="shell pb-20 sm:pb-32">
        <Photo {...photos.monitors} className="h-[55svh] min-h-[18rem]" />
      </div>

      <section className="shell pb-20 sm:pb-32">
        <div data-rule className="h-px bg-line" />
        <div className="split pt-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-md text-title font-medium">Support for the whole digital journey.</h2>
            <div data-fade className="mt-8">
              <Button variant="secondary" to="/solutions">View solutions</Button>
            </div>
          </div>
          <ul>
            {services.map((service) => (
              <li key={service.name} data-fade className="border-b border-line py-6 first:pt-0">
                <h3 className="text-xl font-medium tracking-[-0.02em]">{service.name}</h3>
                {service.status === 'Coming soon' && <p className="mt-1 text-sm font-medium text-violet-deep">Coming soon</p>}
                <p className="mt-2 max-w-xl text-base leading-7 text-muted">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction title="Have an idea you’d like to explore?" text="Start with a conversation about what you need.">
        <Button size="lg" variant="light" to="/contact">Get in touch</Button>
      </CallToAction>
    </div>
  );
};

export default About;
