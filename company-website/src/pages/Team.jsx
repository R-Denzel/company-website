// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    initials: 'DM',
    name: 'Denzel Robert Male',
    role: 'CEO & Founder',
    bio: 'Visionary leader and developer in tech innovation.',
  },
  {
    initials: 'JK',
    name: 'Jeremy Kasule',
    role: 'CTO',
    bio: 'Tech architect passionate about scalable solutions.',
  },
  {
    initials: 'HN',
    name: 'Hindu Nalubega',
    role: 'Head of Design',
    bio: 'Creative director focused on user experience excellence.',
  },
  {
    initials: 'BJ',
    name: 'Birungi Jannie',
    role: 'Lead Developer',
    bio: 'Full-stack developer with expertise in modern frameworks.',
  },
];

const Team = () => (
  <div className="bg-[#080B11]">
    <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 -z-10 bg-pattern opacity-30" />
      <div className="absolute -right-36 top-0 -z-10 h-96 w-96 rounded-full bg-[#D4AF37]/[0.05] blur-[110px]" />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Our people</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-6xl">Meet the team.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Get to know the people and roles behind FutureTech Africa.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Leadership & team</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            The people responsible for guiding, designing, and building our digital work.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-xl border border-white/[0.08] bg-[#0D121B] p-6"
            >
              <div
                aria-hidden="true"
                className="grid h-32 place-items-center rounded-lg border border-white/[0.08] bg-gradient-to-br from-[#D4AF37]/[0.12] via-[#111722] to-[#0B0F17]"
              >
                <span className="font-display text-4xl font-semibold tracking-[0.14em] text-[#E5C158]">{member.initials}</span>
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">{member.role}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-100">{member.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{member.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-white/[0.08] bg-[#0B0F17] py-16 sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 sm:text-3xl">Have a project in mind?</h2>
          <p className="mt-2 text-sm text-slate-400">Start a conversation with our team.</p>
        </div>
        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#E5C158] transition hover:gap-3">
          Get in touch
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default Team;
