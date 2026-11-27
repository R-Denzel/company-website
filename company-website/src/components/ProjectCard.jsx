import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { sampleFor } from '../samples/registry';

/** Portfolio entry. Samples open inside this site; live projects open in a new tab. */
const ProjectCard = ({ project, wide = false }) => {
  const Wrapper = project.isSample ? Link : 'a';
  // Hovering or focusing a sample fetches it early, so it opens without a wait.
  const fetchEarly = () => sampleFor(project.url)?.preload();
  const linkProps = project.isSample
    ? { to: project.url, onPointerEnter: fetchEarly, onFocus: fetchEarly }
    : { href: project.url, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Wrapper {...linkProps} className={`group block ${wide ? 'md:col-span-2' : ''}`}>
      <div data-clip className={`relative overflow-hidden rounded-2xl border border-line bg-mist ${wide ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[16/10]'}`}>
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-transform duration-1000 ease-soft group-hover:scale-105 ${project.isSample ? 'object-center' : 'object-top'}`}
        />
        <span aria-hidden="true" className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-ink text-paper transition-all duration-500 ease-soft group-hover:scale-110 group-hover:bg-violet">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-soft group-hover:rotate-45" />
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h3 className="text-row font-medium">{project.name}</h3>
        {project.status && <StatusBadge status={project.status} />}
      </div>
      <p className="mt-1 text-sm font-semibold text-violet-deep">{project.category}</p>
      <p className="mt-3 max-w-md text-base leading-7 text-muted">{project.description}</p>
      <span className="sr-only">{project.isSample ? 'Open the sample website' : 'Open the beta in a new tab'}</span>
    </Wrapper>
  );
};

export default ProjectCard;
