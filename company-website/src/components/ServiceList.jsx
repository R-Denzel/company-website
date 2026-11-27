import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from './Button';
import Collapse from './Collapse';
import { services } from '../data/services';

/** Accordion of services, designed to sit on a light ground. */
const ServiceList = ({ onSelect }) => {
  const [openName, setOpenName] = useState(services[0].name);

  return (
    <ul className="border-t border-line">
      {services.map((service, index) => {
        const isOpen = openName === service.name;
        const isComingSoon = service.status === 'Coming soon';
        const panelId = `service-panel-${index}`;

        return (
          <li key={service.name} data-fade className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenName(isOpen ? '' : service.name)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-subheading transition-colors duration-300 group-hover:text-brand-deep">{service.name}</span>
                <span className="flex shrink-0 items-center gap-4">
                  {isComingSoon && <span className="hidden text-sm text-muted sm:block">Coming soon</span>}
                  <Plus aria-hidden="true" className={`h-5 w-5 text-brand-deep transition-transform duration-300 ease-soft ${isOpen ? 'rotate-45' : ''}`} />
                </span>
              </button>
            </h3>
            <Collapse open={isOpen} id={panelId}>
              <div className="pb-6">
                <p className="max-w-xl text-muted">{service.description}</p>
                {isComingSoon ? (
                  <p className="mt-4 text-sm text-muted sm:hidden">Coming soon</p>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button onClick={() => onSelect(service.name)}>Discuss this service</Button>
                    <Button variant="secondary" to={`/solutions/${service.id}`}>What it includes</Button>
                  </div>
                )}
              </div>
            </Collapse>
          </li>
        );
      })}
    </ul>
  );
};

export default ServiceList;
