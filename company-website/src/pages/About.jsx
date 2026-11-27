import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
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

      <div className="shell pt-16 sm:pt-24">
        <Photo {...photos.microchip} className="aspect-[4/3] sm:aspect-[21/9]" />
      </div>

      <section className="shell section">
        <div className="split">
          <h2 data-split className="max-w-xl text-heading">
            Technology should create value for the people who use it and build it.
          </h2>
          <p data-fade className="max-w-xl text-muted">
            We started FutureTech Africa to make technology more useful and impactful: improving payments, delivering value for money, recognizing developers and the stake they have in their work, and helping companies use IT to solve real problems. We also want to explore how advanced technology and AI can serve many industries responsibly.
          </p>
        </div>
        <ul className="mt-12">
          {foundingGoals.map((goal) => (
            <li key={goal.title} data-fade className="grid gap-2 border-t border-line py-6 lg:grid-cols-2 lg:gap-16">
              <h3 className="text-subheading">{goal.title}</h3>
              <p className="max-w-xl text-muted">{goal.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-mist">
        <div className="shell section">
          <h2 data-split className="max-w-2xl text-heading">
            Clear thinking. Useful technology. Shared progress.
          </h2>
          <p data-fade className="mt-4 max-w-2xl text-muted">
            Digital projects work best when they start with a real need. We bring design and development together to help clarify the problem, agree on a useful scope, and make something people can use. The right approach depends on the project—so we begin by listening.
          </p>
          <div className="mt-12 grid gap-x-16 md:grid-cols-2">
            {principles.map((principle) => (
              <article key={principle.title} data-fade className="border-t border-line py-6">
                <h3 className="text-subheading">{principle.title}</h3>
                <p className="mt-2 max-w-md text-muted">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="split">
          <h2 data-split className="max-w-xl text-heading">Get to know the people behind our work.</h2>
          <div data-fade>
            <p className="max-w-xl text-muted">
              Explore the people at FutureTech Africa and the roles they bring to each project.
            </p>
            <Button size="lg" to="/team" className="mt-8">Meet the team</Button>
          </div>
        </div>
      </section>

      <div className="shell pb-16 sm:pb-24">
        <Photo {...photos.monitors} className="aspect-[4/3] sm:aspect-[21/9]" />
      </div>

      <section className="shell pb-16 sm:pb-24">
        <div className="split border-t border-line pt-12">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-xl text-heading">Support for the whole digital journey.</h2>
            <div data-fade className="mt-8">
              <Button variant="secondary" to="/solutions">View solutions</Button>
            </div>
          </div>
          <ul>
            {services.map((service) => (
              <li key={service.name} data-fade className="border-b border-line py-6 first:pt-0">
                <h3 className="text-subheading">{service.name}</h3>
                {service.status === 'Coming soon' && <p className="mt-1 text-sm text-muted">Coming soon</p>}
                <p className="mt-2 max-w-xl leading-7 text-muted">{service.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction title="Have an idea you’d like to explore?" text="Start with a conversation about what you need.">
        <Button size="lg" to="/contact">Get in touch</Button>
      </CallToAction>
    </div>
  );
};

export default About;
