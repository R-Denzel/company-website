// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Handshake, Layers3, Lightbulb, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import aboutCircuitTree from '../assets/about-circuit-tree.jpg';
import { services } from '../data/services';

const principles = [
  {
    icon: Compass,
    title: 'Start with your goals',
    description: 'We take time to understand the people, needs, and day-to-day problems behind each project.',
  },
  {
    icon: Handshake,
    title: 'Build in partnership',
    description: 'You stay part of the process, with clear conversations from first brief through delivery.',
  },
  {
    icon: Layers3,
    title: 'Keep it practical',
    description: 'We focus on useful, maintainable digital tools that fit the work they are meant to support.',
  },
  {
    icon: ShieldCheck,
    title: 'Care about the details',
    description: 'Thoughtful design, reliable implementation, and a clear handover all matter.',
  },
];

const foundingGoals = [
  {
    title: 'Better digital payments',
    description: 'Create dependable payment experiences that make transactions simpler for people and businesses.',
  },
  {
    title: 'Value for money',
    description: 'Build fit-for-purpose technology with clear, lasting value for the organizations investing in it.',
  },
  {
    title: 'Recognition for developers',
    description: 'Recognize developers as creators and support a meaningful stake in the value their work helps create.',
  },
  {
    title: 'IT that helps companies',
    description: 'Help organizations use IT to improve operations, serve customers, and grow.',
  },
  {
    title: 'Explore what technology can do',
    description: 'Explore responsible uses of advanced AI, including the long-term potential of superintelligence, across industries.',
  },
];

const About = () => (
  <div className="bg-[#080B11]">
    <section className="group relative isolate overflow-hidden border-b border-white/[0.08]">
      <div
        aria-hidden="true"
        className="about-hero-background absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${aboutCircuitTree})`, backgroundPosition: 'center 45%' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#080B11]/95 via-[#080B11]/80 to-[#080B11]/55" />
      <div className="absolute inset-0 z-0 bg-pattern opacity-20" />
      <div className="absolute -left-36 top-0 z-0 h-96 w-96 rounded-full bg-[#D4AF37]/[0.06] blur-[110px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">About FutureTech Africa</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-6xl">
            Technology should make good work easier.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            We help businesses and institutions turn practical ideas into useful digital products—from websites and mobile apps to custom software and payment tools.
          </p>
          <Link to="/contact" className="mt-8 inline-flex">
            <Button size="lg">
              Tell us what you’re building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
      <a
        href="https://www.pinterest.com/pin/723250021451356106/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Image credit: M (@misthunter14), Pinterest"
        className="absolute bottom-4 right-5 z-10 text-[10px] text-slate-300 opacity-100 transition-opacity hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
      >
        Image by M (@misthunter14)
      </a>
    </section>

    <section className="border-b border-white/[0.08] bg-[#0B0F17] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Why we started</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
            Technology should create value for the people who use it and build it.
          </h2>
          <p className="mt-5 text-sm leading-8 text-slate-400 sm:text-base">
            We started FutureTech Africa to make technology more useful and impactful: improving payments, delivering value for money, recognizing developers and the stake they have in their work, and helping companies use IT to solve real problems. We also want to explore how advanced technology and AI can serve many industries responsibly.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {foundingGoals.map((goal, index) => (
            <motion.article
              key={goal.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-xl border border-white/[0.08] bg-[#0D121B] p-6"
            >
              <h3 className="text-base font-semibold text-slate-100">{goal.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{goal.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-b border-white/[0.08] bg-[#0B0F17] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">What guides us</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100">A thoughtful way to build.</h2>
        </div>
        <p className="max-w-3xl text-sm leading-8 text-slate-400 sm:text-base">
          Digital projects work best when they start with a real need. We bring design and development together to help clarify the problem, agree on a useful scope, and make something people can use. The right approach depends on the project—so we begin by listening.
        </p>
      </div>
    </section>

    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">How we work</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Clear thinking. Useful technology. Shared progress.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="rounded-xl border border-white/[0.08] bg-[#0D121B] p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-slate-100">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{principle.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="border-y border-white/[0.08] bg-[#0B0F17] py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Our people</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Get to know the people behind our work.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
            Explore the people at FutureTech Africa and the roles they bring to each project.
          </p>
        </div>
        <Link
          to="/team"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#E5C158] transition hover:gap-3"
        >
          Meet the team
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    <section className="border-y border-white/[0.08] bg-[#0B0F17] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">What we do</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Support for the whole digital journey.</h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#E5C158] transition hover:gap-3">
            View services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.name} className="flex gap-4 rounded-lg border border-white/[0.07] bg-[#0D121B] p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#D4AF37]/[0.07] text-[#E5C158]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">{service.name}</h3>
                    {service.status === 'Coming soon' && (
                      <span className="text-[9px] uppercase tracking-wider text-slate-500">Coming soon</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs leading-6 text-slate-400">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Lightbulb className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-100 sm:text-3xl">Have an idea you’d like to explore?</h2>
          <p className="mt-2 text-sm text-slate-400">Start with a conversation about what you need.</p>
        </div>
        <Link to="/contact">
          <Button size="lg">
            Get in touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  </div>
);

export default About;
