import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from './Button';
import Collapse from './Collapse';
import { services } from '../data/services';

/** Large-type accordion of services, designed to sit on the ink ground. */
const ServiceList = ({ onSelect }) => {
  const [openName, setOpenName] = useState(services[0].name);

  return (
    <ul className="border-t border-ink-line">
      {services.map((service, index) => {
        const isOpen = openName === service.name;
        const isComingSoon = service.status === 'Coming soon';
        const panelId = `service-panel-${index}`;
        const Icon = service.icon;

        return (
          <li key={service.name} data-fade className="border-b border-ink-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenName(isOpen ? '' : service.name)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span className={`text-row font-medium transition-all duration-500 ease-soft group-hover:translate-x-2 ${isOpen ? 'text-paper' : 'text-muted-invert group-hover:text-paper'}`}>
                  {service.name}
                </span>
                <span className="flex shrink-0 items-center gap-4">
                  {isComingSoon && <span className="hidden text-sm text-muted-invert sm:block">Coming soon</span>}
                  <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-500 ${isOpen ? 'bg-gradient-to-br from-violet-soft to-coral-soft text-ink' : 'bg-ink-soft text-paper group-hover:bg-violet'}`}>
                    <Plus className={`h-5 w-5 transition-transform duration-500 ease-soft ${isOpen ? 'rotate-45' : ''}`} />
                  </span>
                </span>
              </button>
            </h3>
            <Collapse open={isOpen} id={panelId}>
              <div className="flex flex-col items-start gap-6 pb-8 sm:flex-row sm:gap-8">
                <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-line text-coral-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="max-w-xl text-base leading-7 text-muted-invert">{service.description}</p>
                  {isComingSoon ? (
                    <p className="mt-4 text-sm text-muted-invert sm:hidden">Coming soon</p>
                  ) : (
                    <Button variant="light" className="mt-6" onClick={() => onSelect(service.name)}>
                      Discuss this service
                    </Button>
                  )}
                </div>
              </div>
            </Collapse>
          </li>
        );
      })}
    </ul>
  );
};

export default ServiceList;
