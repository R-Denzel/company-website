import ProjectCard from './ProjectCard';

/**
 * Equal-width cards: one column on phones, two on tablets, three on desktops.
 * `centered` balances a final row that is not full.
 */
const ProjectGrid = ({ items, centered = false }) => (
  <ul data-fade className={`grid auto-rows-fr gap-6 sm:flex sm:flex-wrap ${centered ? 'sm:justify-center' : ''}`}>
    {items.map((project) => (
      <li key={project.key} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
        <ProjectCard project={project} />
      </li>
    ))}
  </ul>
);

export default ProjectGrid;
