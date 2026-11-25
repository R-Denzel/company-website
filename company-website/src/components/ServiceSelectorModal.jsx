import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { services } from '../data/services';
import Button from './Button';

const markets = ['Uganda', 'Kenya', 'Other African market', 'Outside Africa'];
const timelines = ['As soon as possible', '1–3 months', 'Flexible'];
const stages = ['Exploring an idea', 'Ready to start', 'Improving an existing product'];

const steps = ['Choose a service', 'Project scope', 'Review'];

const ServiceSelectorModal = ({ isOpen, onClose, onContinue, initialService = '', initialPackage = null }) => {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({
    service: '',
    market: 'Uganda',
    stage: stages[0],
    timeline: timelines[1],
    selectedPackage: null,
  });

  useEffect(() => {
    if (!isOpen) return undefined;

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

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, initialService, initialPackage]);

  const closeModal = () => {
    setStep(0);
    onClose();
  };

  const selectedService = services.find((service) => service.name === selection.service);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-selector-title"
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17] shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Project intake · 0{step + 1} of 03
                </p>
                <h2 id="service-selector-title" className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">
                  {steps[step]}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close service selector"
                className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:border-white/30 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-0.5 bg-white/5">
              <motion.div
                className="h-full bg-[#D4AF37]"
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {step === 0 && (
                  <motion.div
                    key="service"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="mb-5 text-sm text-slate-400">
                      Pick the service that best matches what you have in mind.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((service) => {
                        const Icon = service.icon;
                        const isSelected = selection.service === service.name;
                        const isComingSoon = service.status === 'Coming soon';

                        return (
                          <button
                            key={service.name}
                            type="button"
                            disabled={isComingSoon}
                            onClick={() => setSelection((current) => ({
                              ...current,
                              service: service.name,
                              selectedPackage: service.name === current.service ? current.selectedPackage : null,
                            }))}
                            className={`group rounded-xl border p-4 text-left transition duration-200 ${
                              isSelected
                                ? 'border-[#D4AF37]/70 bg-[#D4AF37]/[0.07]'
                                : 'border-white/10 bg-white/[0.02] hover:-translate-y-0.5 hover:border-white/25'
                            } ${isComingSoon ? 'cursor-not-allowed opacity-55' : ''}`}
                          >
                            <span className="flex items-center justify-between">
                              <Icon className={`h-5 w-5 ${isSelected ? 'text-[#E5C158]' : 'text-slate-400'}`} />
                              {isComingSoon ? (
                                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                  Coming soon
                                </span>
                              ) : isSelected ? (
                                <Check className="h-4 w-4 text-[#E5C158]" />
                              ) : null}
                            </span>
                            <span className="mt-4 block text-sm font-semibold text-slate-100">
                              {service.shortName}
                            </span>
                            <span className="mt-2 block text-xs leading-relaxed text-slate-400">
                              {service.description}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="scope"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <label className="text-sm text-slate-300">
                      Where will the product be used?
                      <select
                        value={selection.market}
                        onChange={(event) => setSelection((current) => ({ ...current, market: event.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#111722] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/70"
                      >
                        {markets.map((market) => <option key={market}>{market}</option>)}
                      </select>
                    </label>
                    <label className="text-sm text-slate-300">
                      What stage are you at?
                      <select
                        value={selection.stage}
                        onChange={(event) => setSelection((current) => ({ ...current, stage: event.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#111722] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/70"
                      >
                        {stages.map((stage) => <option key={stage}>{stage}</option>)}
                      </select>
                    </label>
                    <label className="text-sm text-slate-300 sm:col-span-2">
                      Preferred timeline
                      <select
                        value={selection.timeline}
                        onChange={(event) => setSelection((current) => ({ ...current, timeline: event.target.value }))}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#111722] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/70"
                      >
                        {timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
                      </select>
                    </label>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-5 sm:p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                      Your project outline
                    </p>
                    <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs text-slate-500">Service</dt>
                        <dd className="mt-1 text-sm font-medium text-slate-100">{selectedService?.name}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500">Market</dt>
                        <dd className="mt-1 text-sm font-medium text-slate-100">{selection.market}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500">Project stage</dt>
                        <dd className="mt-1 text-sm font-medium text-slate-100">{selection.stage}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-500">Timeline</dt>
                        <dd className="mt-1 text-sm font-medium text-slate-100">{selection.timeline}</dd>
                      </div>
                      {selection.selectedPackage && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs text-slate-500">Selected package</dt>
                          <dd className="mt-1 text-sm font-medium text-slate-100">
                            {selection.selectedPackage.name}
                          </dd>
                          <dd className="mt-1 text-xs text-slate-400">
                            {selection.selectedPackage.estimate} estimate · {selection.selectedPackage.referencePrice} reference
                          </dd>
                        </div>
                      )}
                    </dl>
                    <p className="mt-6 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-400">
                      Next, tell us how to reach you and share any details that will help us understand the project.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-7 flex flex-col-reverse justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => setStep((current) => current - 1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : <span />}
                {step < 2 ? (
                  <Button
                    variant="primary"
                    disabled={step === 0 && !selection.service}
                    onClick={() => setStep((current) => current + 1)}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => {
                    onContinue(selection);
                    setStep(0);
                  }}>
                    Continue to contact
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceSelectorModal;
