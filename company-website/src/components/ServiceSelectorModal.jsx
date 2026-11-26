import { useRef, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { services } from '../data/services';
import Button from './Button';
import Dialog from './Dialog';
import { gsap, prefersReducedMotion, useGSAP } from '../lib/gsap';

const markets = ['Uganda', 'Kenya', 'Other African market', 'Outside Africa'];
const timelines = ['As soon as possible', '1–3 months', 'Flexible'];
const stages = ['Exploring an idea', 'Ready to start', 'Improving an existing product'];

const steps = ['Choose a service', 'Project scope', 'Review'];

const ServiceSelectorModal = ({ isOpen, onClose, onContinue, initialService = '', initialPackage = null }) => {
  const [step, setStep] = useState(0);
  const [wasOpen, setWasOpen] = useState(false);
  const [selection, setSelection] = useState({
    service: '',
    market: 'Uganda',
    stage: stages[0],
    timeline: timelines[1],
    selectedPackage: null,
  });
  const body = useRef(null);

  // Reset to the first step with the requested service each time the sheet opens.
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setStep(0);
      setSelection((current) => ({
        ...current,
        service: initialService,
        market: initialPackage?.market === 'Uganda' || initialPackage?.market === 'Kenya'
          ? initialPackage.market
          : initialPackage
            ? 'Outside Africa'
            : current.market,
        selectedPackage: initialPackage,
      }));
    }
  }

  useGSAP(() => {
    if (!body.current || prefersReducedMotion()) return;
    gsap.fromTo(body.current.children, { autoAlpha: 0, x: 32 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: 'soft', stagger: 0.05 });
  }, { dependencies: [step] });

  const selectedService = services.find((service) => service.name === selection.service);
  const update = (field) => (event) => setSelection((current) => ({ ...current, [field]: event.target.value }));

  return (
    <Dialog open={isOpen} onClose={onClose} labelledBy="service-selector-title" closeLabel="Close service selector">
      <h2 id="service-selector-title" className="text-title font-medium">{steps[step]}</h2>

      <div className="mt-6 h-px bg-line">
        <div
          className="h-px origin-left bg-ink transition-transform duration-700 ease-soft"
          style={{ transform: `scaleX(${(step + 1) / steps.length})` }}
        />
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">Step {step + 1} of {steps.length}</p>

      <div ref={body} key={step} className="mt-8">
        {step === 0 && (
          <>
            <p className="mb-4 text-base text-muted">Pick the service that best matches what you have in mind.</p>
            <div role="group" aria-label="Services">
              {services.map((service) => {
                const isSelected = selection.service === service.name;
                const isComingSoon = service.status === 'Coming soon';

                return (
                  <button
                    key={service.name}
                    type="button"
                    disabled={isComingSoon}
                    aria-pressed={isSelected}
                    onClick={() => setSelection((current) => ({
                      ...current,
                      service: service.name,
                      selectedPackage: service.name === current.service ? current.selectedPackage : null,
                    }))}
                    className="group flex w-full items-start justify-between gap-5 border-b border-line py-4 text-left disabled:cursor-not-allowed"
                  >
                    <span>
                      <span className={`block text-lg font-medium ${isComingSoon ? 'text-muted' : ''}`}>{service.shortName}</span>
                      <span className="mt-1 block text-sm leading-6 text-muted">{service.description}</span>
                    </span>
                    {isComingSoon ? (
                      <span className="shrink-0 pt-1 text-sm text-muted">Coming soon</span>
                    ) : (
                      <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isSelected ? 'bg-ink text-paper' : 'bg-mist text-transparent group-hover:bg-line'}`}>
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <label className="block text-sm font-medium">
              Where will the product be used?
              <select value={selection.market} onChange={update('market')} className="field">
                {markets.map((market) => <option key={market}>{market}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              What stage are you at?
              <select value={selection.stage} onChange={update('stage')} className="field">
                {stages.map((stage) => <option key={stage}>{stage}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Preferred timeline
              <select value={selection.timeline} onChange={update('timeline')} className="field">
                {timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
              </select>
            </label>
          </div>
        )}

        {step === 2 && (
          <>
            <dl>
              {[
                ['Service', selectedService?.name],
                ['Market', selection.market],
                ['Project stage', selection.stage],
                ['Timeline', selection.timeline],
                ...(selection.selectedPackage ? [[
                  'Selected package',
                  `${selection.selectedPackage.name} · ${selection.selectedPackage.estimate} estimate · ${selection.selectedPackage.referencePrice} reference`,
                ]] : []),
              ].map(([term, value]) => (
                <div key={term} className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:justify-between sm:gap-8">
                  <dt className="text-muted">{term}</dt>
                  <dd className="font-medium sm:max-w-sm sm:text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-base leading-7 text-muted">
              Next, tell us how to reach you and share any details that will help us understand the project.
            </p>
          </>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <Button variant="ghost" size="lg" icon={ArrowLeft} arrow={false} onClick={() => setStep((current) => current - 1)}>
            Back
          </Button>
        ) : <span />}
        {step < steps.length - 1 ? (
          <Button size="lg" disabled={step === 0 && !selection.service} onClick={() => setStep((current) => current + 1)}>
            Continue
          </Button>
        ) : (
          <Button size="lg" onClick={() => onContinue(selection)}>Continue to contact</Button>
        )}
      </div>
    </Dialog>
  );
};

export default ServiceSelectorModal;
