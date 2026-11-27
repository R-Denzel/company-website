import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import ProjectGrid from '../components/ProjectGrid';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { caseStudyStandard, concepts, publishedCaseStudies } from '../content/caseStudies';
import { productCards, sampleCards } from '../data/portfolio';

const Work = () => {
  const motion = usePageMotion();
  useSeo('Work', 'Case studies, product walkthroughs, demonstration websites and concepts from FutureTech Africa.');

  return (
    <div ref={motion}>
      <PageIntro title="Work you can open and try.">
        We keep customer case studies, our own products, demonstrations and early concepts clearly apart.
      </PageIntro>

      <section id="case-studies" className="shell scroll-mt-24 section" aria-labelledby="cases-heading">
        <div className="split">
          <h2 id="cases-heading" data-split className="text-heading">Case studies</h2>
          <div data-fade>
            {publishedCaseStudies.length === 0 && (
              <p className="max-w-xl text-muted">
                No case studies are published yet. We publish one only with the customer’s permission and results we can evidence.
              </p>
            )}
          </div>
        </div>
        {publishedCaseStudies.map((study) => (
          <article key={study.id} className="mt-10 border-t border-line pt-8">
            <h3 className="text-subheading">{study.customer}</h3>
            <p className="mt-1 text-sm text-muted">{study.sector} · {study.country}</p>
            <p className="mt-4 max-w-3xl leading-7">{study.problem} {study.solution}</p>
            <p className="mt-3 max-w-3xl leading-7">{study.baseline} {study.outcome}</p>
            <p className="mt-3 max-w-3xl text-sm text-muted">{study.disclosure}</p>
          </article>
        ))}
        <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
          {caseStudyStandard.map(([title, text]) => (
            <div key={title} data-fade className="border-t border-line py-6">
              <dt className="font-medium">{title}</dt>
              <dd className="mt-2 leading-7 text-muted">{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell border-t border-line section" aria-labelledby="walk-heading">
        <div className="split mb-10">
          <h2 id="walk-heading" data-split className="text-heading">Product walkthroughs</h2>
          <p data-fade className="max-w-xl text-muted">Our own products, in beta. These are not customer case studies.</p>
        </div>
        <ProjectGrid items={productCards} />
      </section>

      <section id="demonstrations" className="shell scroll-mt-24 border-t border-line section" aria-labelledby="sample-heading">
        <div className="split mb-10">
          <h2 id="sample-heading" data-split className="text-heading">Demonstrations and sample builds</h2>
          <p data-fade className="max-w-xl text-muted">
            Sample websites for an invented perfume house and tech shop. They are not client projects.
          </p>
        </div>
        <ProjectGrid items={sampleCards} />
      </section>

      <section className="shell border-t border-line section" aria-labelledby="concept-heading">
        <div className="split">
          <h2 id="concept-heading" data-split className="text-heading">Concepts in development</h2>
          <p data-fade className="max-w-xl text-muted">Ideas we are exploring. They are not launched products.</p>
        </div>
        <div className="mt-10">
          {concepts.map((concept) => (
            <article key={concept.name} data-fade className="grid gap-3 border-t border-line py-8 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="text-subheading">{concept.name}</h3>
                <p className="mt-1 text-sm text-muted">{concept.category}</p>
              </div>
              <p className="max-w-xl text-muted">{concept.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CallToAction title="Have a project in mind?" text="Tell us what you’re working on and what you need next.">
        <Button size="lg" to="/contact">Start a project</Button>
      </CallToAction>
    </div>
  );
};

export default Work;
