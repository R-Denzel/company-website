import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import ProjectCard from '../components/ProjectCard';
import usePageMotion from '../hooks/usePageMotion';
import { featuredProjects, sampleProjects } from '../data/projects';

const Portfolio = () => {
  const motion = usePageMotion();

  return (
    <div ref={motion}>
      <PageIntro title="Work you can open and try.">
        Live projects we’ve worked on, and sample websites that show what we can build.
      </PageIntro>

      <section className="shell py-16 sm:py-24" aria-labelledby="sample-heading">
        <div className="split mb-10">
          <h2 id="sample-heading" data-split className="text-title font-medium">Sample websites</h2>
          <p data-fade className="max-w-xl text-lead text-muted">
            Demonstration shops for a perfume house and a phone and laptop seller. They are not client projects.
          </p>
        </div>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {sampleProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <section className="shell pb-20 sm:pb-32" aria-labelledby="live-heading">
        <div className="split mb-10">
          <h2 id="live-heading" data-split className="text-title font-medium">Live projects</h2>
          <p data-fade className="max-w-xl text-lead text-muted">From payments and bookings to retail tools.</p>
        </div>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} wide={index === 0} />
          ))}
        </div>
      </section>

      <CallToAction title="Have a project in mind?" text="Tell us what you’re working on and what you need next.">
        <Button size="lg" variant="light" to="/contact">Start a project</Button>
      </CallToAction>
    </div>
  );
};

export default Portfolio;
