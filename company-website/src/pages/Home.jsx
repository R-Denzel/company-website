import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Compass,
  CreditCard,
  Globe2,
  Layers3,
  Smartphone,
  Workflow,
} from 'lucide-react';
import Button from '../components/Button';
import ServiceSelectorModal from '../components/ServiceSelectorModal';
import WebsitePackages from '../components/WebsitePackages';
import { services } from '../data/services';

const workflow = [
  { number: '01', title: 'Tell us what you need', text: 'Choose a service and share the essentials about your idea.' },
  { number: '02', title: 'Shape the scope', text: 'We learn about your goals, users, market, and timeline.' },
  { number: '03', title: 'Agree on a plan', text: 'We follow up to discuss the right approach and next steps.' },
  { number: '04', title: 'Build together', text: 'Design, development, feedback, and launch—kept clear from day one.' },
];

const capabilityIcons = [Smartphone, Code2, Workflow, CreditCard, Layers3];

const featuredProjects = [
  {
    name: 'Payro',
    category: 'Digital payments',
    description: 'A payment project with a simple promise: “Split smart · pay easy.”',
    url: 'https://www.payro.co.ke',
  },
  {
    name: 'CheckinHQ',
    category: 'Booking management',
    description: 'Simple booking management for businesses.',
    url: 'https://checkinhq.vercel.app/',
  },
  {
    name: 'My Duka POS',
    category: 'Point of sale & inventory',
    description: 'A mobile-first POS and inventory management system for small businesses.',
    url: 'https://myduka-pos-hruz.onrender.com/',
  },
];

const Home = () => {
  const [isServiceSelectorOpen, setIsServiceSelectorOpen] = useState(false);
  const [initialService, setInitialService] = useState('');
  const [initialPackage, setInitialPackage] = useState(null);
  const navigate = useNavigate();

  const openServiceSelector = (serviceName = '', packageSelection = null) => {
    setInitialService(serviceName);
    setInitialPackage(packageSelection);
    setIsServiceSelectorOpen(true);
  };

  const handleServiceContinue = (project) => {
    setIsServiceSelectorOpen(false);
    navigate('/contact', { state: { serviceInquiry: project } });
  };

  return (
    <div className="overflow-hidden">
      <ServiceSelectorModal
        isOpen={isServiceSelectorOpen}
        onClose={() => setIsServiceSelectorOpen(false)}
        onContinue={handleServiceContinue}
        initialService={initialService}
        initialPackage={initialPackage}
      />

      <section className="relative isolate border-b border-white/[0.07] bg-[#080B11]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-pattern opacity-40" />
          <div className="absolute -left-48 top-8 h-[34rem] w-[34rem] rounded-full bg-[#D4AF37]/[0.055] blur-[120px]" />
          <motion.div
            className="absolute right-[10%] top-16 h-80 w-80 rounded-full bg-[#D4AF37]/[0.045] blur-[100px]"
            animate={{ y: [0, 18, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="mx-auto grid w-full grid-cols-1 min-h-[calc(100vh-76px)] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="min-w-0 max-w-2xl"
          >
            <h1 className="mt-7 text-[clamp(1.8rem,9vw,2.8rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-slate-100 sm:text-[clamp(2.8rem,6.2vw,5.5rem)]">
              Build what
              <br />
              <span className="font-medium text-[#D4AF37]">moves you forward.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              FutureTech Africa designs and develops websites, mobile applications, custom software,
              and practical digital tools for businesses and institutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => openServiceSelector()}>
                Select a service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link to="/projects">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore what we build
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/[0.09] pt-6 text-xs text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#D4AF37]" />Built around your needs</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#D4AF37]" />Clear project conversations</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
            className="relative mx-auto w-full min-w-0 max-w-xl"
          >
            <div className="absolute -inset-5 rounded-[2rem] border border-[#D4AF37]/[0.08]" />
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0D121B]/95 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Project intake</p>
                  <p className="mt-1 text-sm font-medium text-slate-100">Start with what you need</p>
                </div>
                <span className="rounded-md border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-500">01 / 03</span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm leading-6 text-slate-400">
                  Select a service to begin a guided project enquiry.
                </p>
                <div className="mt-5 space-y-2.5">
                  {services.slice(0, 4).map((service, index) => {
                    const Icon = capabilityIcons[index];

                    return (
                      <button
                        key={service.name}
                        type="button"
                        onClick={() => openServiceSelector(service.name)}
                        className="group flex w-full items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.018] px-4 py-3.5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/[0.045]"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-[#111722] text-[#D4AF37] transition group-hover:border-[#D4AF37]/30">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-slate-200">{service.shortName}</span>
                          <span className="mt-1 block truncate text-xs text-slate-500">{service.description}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-[#E5C158]" />
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => openServiceSelector()}
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#E5C158] transition hover:text-[#F6EDC8]"
                >
                  View all available services
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.018] px-5 py-3.5 text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:px-6">
                <span>Website · Software · Digital systems</span>
                <Globe2 className="h-4 w-4 text-[#D4AF37]/70" />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#111722]/95 px-4 py-3 shadow-xl sm:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#D4AF37]/10 text-[#E5C158]"><Compass className="h-4 w-4" /></span>
              <span>
                <span className="block text-xs font-semibold text-slate-200">A guided first step</span>
                <span className="mt-1 block text-[10px] text-slate-500">A clearer brief, together</span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <a href="#services" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-500 transition hover:text-[#E5C158] lg:flex">
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </section>

      <section className="border-b border-white/[0.07] bg-[#0A0E15]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">What we help you create</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-slate-300 sm:text-sm">
            {['Web & mobile apps', 'Custom software', 'AI-assisted automation', 'Digital payment & POS'].map((capability) => (
              <span key={capability} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                {capability}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-[#0B0F17] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Our services</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Technology for the way you work.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                From first concept to a working product, choose the kind of support your project needs.
              </p>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#E5C158] transition hover:gap-3">
              Explore services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isComingSoon = service.status === 'Coming soon';

              return (
                <motion.button
                  key={service.name}
                  type="button"
                  onClick={() => !isComingSoon && openServiceSelector(service.name)}
                  disabled={isComingSoon}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.055 }}
                  className={`group rounded-xl border border-white/[0.08] bg-[#0D121B] p-6 text-left transition duration-300 ${
                    isComingSoon ? 'cursor-default' : 'hover:-translate-y-1 hover:border-[#D4AF37]/35 hover:bg-[#111722]'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158] transition group-hover:border-[#D4AF37]/45">
                      <Icon className="h-5 w-5" />
                    </span>
                    {isComingSoon ? (
                      <span className="text-[9px] uppercase tracking-wider text-slate-500">Coming soon</span>
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-[#E5C158]" />
                    )}
                  </span>
                  <span className="mt-6 block text-base font-semibold text-slate-100">{service.name}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-400">{service.description}</span>
                  {!isComingSoon && <span className="mt-5 block text-xs font-semibold text-[#D4AF37]">Discuss this service <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></span>}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="selected-work" className="border-y border-[#D8E2DF] bg-[#F3F4EC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#16796F]">Selected work</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#12232B] sm:text-4xl">Live projects. Practical solutions.</h2>
            <p className="mt-4 text-sm leading-7 text-[#52616A] sm:text-base">
              Explore a few projects we’ve worked on, from payments and bookings to retail tools.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex h-full flex-col rounded-xl border border-[#DCE3DD] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#16796F]/40 hover:shadow-lg"
              >
                <div className="mb-6 flex h-36 items-center justify-between rounded-lg border border-[#D5E6E0] bg-gradient-to-br from-[#E1F0EA] via-[#E6F0EE] to-[#E8EDF2] px-5">
                  <span className="font-display text-2xl font-semibold tracking-tight text-[#16796F]">{project.name}</span>
                  <ArrowUpRight className="h-5 w-5 text-[#16796F] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#16796F]">{project.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#12232B]">{project.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#52616A]">{project.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-[#E5E9E5] pt-4 text-xs font-semibold text-[#16796F]">
                  Open live demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#080B11] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">A straightforward path from idea to launch.</h2>
              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                Good work starts with a clear conversation. We keep the process collaborative, practical, and focused on what you want to achieve.
              </p>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#E5C158] transition hover:gap-3">
                More about how we work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-0 sm:grid-cols-2">
              {workflow.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="border-t border-white/[0.1] py-5 sm:px-5 sm:py-6 [&:nth-child(odd)]:sm:border-r [&:nth-child(even)]:sm:pl-7 [&:nth-child(3)]:sm:border-b-0 [&:nth-child(4)]:sm:border-b-0"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-[#D4AF37]">{step.number}</span>
                  <h3 className="mt-3 text-sm font-semibold text-slate-100 sm:text-base">{step.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WebsitePackages onAskAboutPackage={openServiceSelector} />

      <section className="border-t border-white/[0.08] bg-[#080B11] py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Let’s build something useful</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Have a project in mind?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Tell us what you’re working on. We’ll start by understanding your idea and what you need next.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => openServiceSelector()}>
              Start a project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">Contact us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
