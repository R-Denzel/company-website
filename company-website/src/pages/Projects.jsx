import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Smartphone, Workflow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ServiceSelectorModal from '../components/ServiceSelectorModal';
import WebsitePackages from '../components/WebsitePackages';
import { services } from '../data/services';

const concepts = [
  {
    name: 'Handyman App',
    category: 'Service marketplace · Product concept',
    description: 'A proposed mobile and web platform to help people find and book help for home repairs and maintenance.',
    capabilities: ['Service listings and discovery', 'Booking and scheduling', 'Customer and provider profiles'],
    icon: Smartphone,
  },
  {
    name: 'AI Chat & Counsel App',
    category: 'Conversational product · Product concept',
    description: 'An early product idea for a supportive chat experience focused on guidance, mentorship, and human connection.',
    capabilities: ['Conversational interface', 'Thoughtful privacy design', 'Mobile and web experience'],
    icon: Workflow,
  },
];

const Projects = () => {
  const [isServiceSelectorOpen, setIsServiceSelectorOpen] = useState(false);
  const [initialService, setInitialService] = useState('');
  const [initialPackage, setInitialPackage] = useState(null);
  const navigate = useNavigate();

  const openServiceSelector = (serviceName = '', packageSelection = null) => {
    setInitialService(serviceName);
    setInitialPackage(packageSelection);
    setIsServiceSelectorOpen(true);
  };

  return (
    <div className="bg-[#080B11]">
      <ServiceSelectorModal
        isOpen={isServiceSelectorOpen}
        onClose={() => setIsServiceSelectorOpen(false)}
        initialService={initialService}
        initialPackage={initialPackage}
        onContinue={(project) => {
          setIsServiceSelectorOpen(false);
          navigate('/contact', { state: { serviceInquiry: project } });
        }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 -z-10 bg-pattern opacity-30" />
        <div className="absolute -right-36 top-0 -z-10 h-96 w-96 rounded-full bg-[#D4AF37]/[0.05] blur-[110px]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Services & product ideas</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-6xl">Digital work, shaped around real needs.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Explore the services FutureTech Africa offers and a couple of product concepts we’re developing. We’ll confirm scope together before work begins.
            </p>
            <Button className="mt-8" size="lg" onClick={() => openServiceSelector()}>
              Find the right service
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Our services</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">From interface to implementation.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">Choose a service to begin a guided project enquiry.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  type="button"
                  key={service.name}
                  onClick={() => service.status !== 'Coming soon' && openServiceSelector(service.name)}
                  disabled={service.status === 'Coming soon'}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-xl border border-white/[0.08] bg-[#0D121B] p-6 text-left transition duration-300 ${
                    service.status === 'Coming soon' ? 'cursor-default' : 'hover:-translate-y-1 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className={`text-[9px] uppercase tracking-[0.16em] ${service.status === 'Coming soon' ? 'text-slate-500' : 'text-[#D4AF37]'}`}>
                      {service.status}
                    </span>
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-slate-100">{service.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p>
                  {service.status !== 'Coming soon' && <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#E5C158]">Discuss this service <ArrowUpRight className="h-3.5 w-3.5" /></span>}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <WebsitePackages onAskAboutPackage={openServiceSelector} />

      <section className="border-y border-white/[0.08] bg-[#0B0F17] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">In development</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Product concepts from FutureTech.</h2>
            </div>
            <p className="max-w-md text-xs leading-6 text-slate-500">These are concepts in development, not launched products or client case studies.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {concepts.map((concept, index) => {
              const Icon = concept.icon;
              return (
                <motion.article
                  key={concept.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-xl border border-white/[0.08] bg-[#0D121B] p-6 sm:p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">{concept.category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-100">{concept.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{concept.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/[0.08] pt-5">
                    {concept.capabilities.map((capability) => (
                      <li key={capability} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                        {capability}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Have a different idea?</h2>
            <p className="mt-2 text-sm text-slate-400">Tell us what you’re trying to build and we’ll take it from there.</p>
          </div>
          <Button size="lg" onClick={() => openServiceSelector()}>
            Talk to our team
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Projects;
