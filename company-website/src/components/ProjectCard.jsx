import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { logEvent } from '../lib/analytics';
import { sampleFor } from '../samples/registry';

/** Portfolio entry. Every product and sample uses this one card, so none outweighs another. */
const ProjectCard = ({ project }) => {
  // Hovering or focusing a sample fetches it early, so it opens without a wait.
  const fetchEarly = project.isSample ? () => sampleFor(project.to)?.preload() : undefined;
  const handleClick = project.productId ? () => logEvent('product_cta', { product: project.productId, action: 'view' }) : undefined;

  return (
    <Link
      to={project.to}
      onClick={handleClick}
      onPointerEnter={fetchEarly}
      onFocus={fetchEarly}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-colors duration-300 hover:border-brand-deep"
    >
      <div className="aspect-[16/10] overflow-hidden border-b border-line bg-mist">
        <img
          src={project.image}
          alt={project.alt}
          width="1440"
          height="900"
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${project.isSample ? 'object-center' : 'object-top'}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-subheading">{project.name}</h3>
          {project.status && <StatusBadge status={project.status} />}
        </div>
        <p className="mt-1 text-sm text-muted">{project.category}</p>
        <p className="mt-3 text-muted">{project.description}</p>
        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-brand-deep">
          {project.action}
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 ease-soft group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
