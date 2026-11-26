import Aurora from '../components/Aurora';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import ServiceList from '../components/ServiceList';
import ServiceSelectorModal from '../components/ServiceSelectorModal';
import WebsitePackages from '../components/WebsitePackages';
import usePageMotion from '../hooks/usePageMotion';
import useServiceSelector from '../hooks/useServiceSelector';

const concepts = [
  {
    name: 'Handyman App',
    category: 'Service marketplace · Product concept',
    description: 'A proposed mobile and web platform to help people find and book help for home repairs and maintenance.',
    capabilities: ['Service listings and discovery', 'Booking and scheduling', 'Customer and provider profiles'],
  },
  {
    name: 'AI Chat & Counsel App',
    category: 'Conversational product · Product concept',
    description: 'An early product idea for a supportive chat experience focused on guidance, mentorship, and human connection.',
    capabilities: ['Conversational interface', 'Thoughtful privacy design', 'Mobile and web experience'],
  },
];

const Projects = () => {
  const selector = useServiceSelector();
  const motion = usePageMotion();

  return (
    <div ref={motion}>
      <ServiceSelectorModal {...selector.modalProps} />

      <PageIntro
        title="Digital work, shaped around real needs."
        actions={<Button size="lg" onClick={() => selector.open()}>Find the right service</Button>}
      >
        Explore the services FutureTech Africa offers and a couple of product concepts we’re developing. We’ll confirm scope together before work begins.
      </PageIntro>

      <section className="on-ink relative isolate py-20 text-paper sm:py-32">
        <Aurora tone="dark" expand />
        <div className="shell split">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-split className="max-w-md text-title font-medium">From interface to implementation.</h2>
            <p data-fade className="mt-6 max-w-md text-lead text-muted-invert">Choose a service to begin a guided project enquiry.</p>
          </div>
          <ServiceList onSelect={selector.open} />
        </div>
      </section>

      <WebsitePackages onAskAboutPackage={selector.open} />

      <section className="shell border-t border-line py-20 sm:py-32">
        <div className="split">
          <h2 data-split className="max-w-md text-title font-medium">Product concepts from FutureTech.</h2>
          <p data-fade className="max-w-xl text-lead text-muted">These are concepts in development, not launched products or client case studies.</p>
        </div>
        <div className="mt-14">
          {concepts.map((concept) => (
            <article key={concept.name}>
              <div data-rule className="h-px bg-line" />
              <div data-fade className="grid gap-6 py-10 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 className="text-title font-medium">{concept.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-violet-deep">{concept.category}</p>
                </div>
                <div>
                  <p className="max-w-xl text-lead text-muted">{concept.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {concept.capabilities.map((capability) => (
                      <li key={capability} className="rounded-full bg-mist px-4 py-2 text-sm">{capability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CallToAction title="Have a different idea?" text="Tell us what you’re trying to build and we’ll take it from there.">
        <Button size="lg" variant="light" onClick={() => selector.open()}>Talk to our team</Button>
      </CallToAction>
    </div>
  );
};

export default Projects;
