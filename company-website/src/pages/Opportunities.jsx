import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle2, Handshake, Lightbulb, Send, Users, X } from 'lucide-react';
import Button from '../components/Button';
import { sendProposalEmail } from '../utils/emailService';

const collaborationWays = [
  {
    icon: Users,
    title: 'Share your expertise',
    description: 'Tell us about your experience and the kinds of projects you would be interested in contributing to.',
  },
  {
    icon: Handshake,
    title: 'Explore a partnership',
    description: 'Have an idea for working together? Share the context and what a useful collaboration could look like.',
  },
  {
    icon: Lightbulb,
    title: 'Propose an idea',
    description: 'Bring forward a product or project idea and start a conversation with our team.',
  },
];

const Opportunities = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', proposal: '', interest: 'general' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await sendProposalEmail(formData);
      setIsSubmitted(true);
    } catch (submitError) {
      console.error('Error sending collaboration inquiry:', submitError);
      setError('We couldn’t send your inquiry. Please try again or email us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setIsSubmitted(false);
    setError('');
  };

  return (
    <div className="bg-[#080B11]">
      <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 -z-10 bg-pattern opacity-30" />
        <div className="absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-[#D4AF37]/[0.05] blur-[110px]" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Work with us</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-6xl">Good work starts with a good collaboration.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              We welcome thoughtful enquiries from people and organizations interested in building useful digital products with FutureTech Africa.
            </p>
            <Button className="mt-8" size="lg" onClick={() => setIsFormOpen(true)}>
              Send a collaboration enquiry
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Ways to connect</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">What would you like to explore?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">This is an open enquiry channel, not a list of active job vacancies.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {collaborationWays.map((way, index) => {
              const Icon = way.icon;
              return (
                <motion.article
                  key={way.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="rounded-xl border border-white/[0.08] bg-[#0D121B] p-6 sm:p-7"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-slate-100">{way.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{way.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0B0F17] py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Have something in mind?</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">Tell us what you’d like to work on.</h2>
            <p className="mt-2 text-sm text-slate-400">Share a few details and our team can take it from there.</p>
          </div>
          <Button size="lg" onClick={() => setIsFormOpen(true)}>
            Start an enquiry
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isLoading) closeForm();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="collaboration-form-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="my-auto w-full max-w-2xl rounded-xl border border-white/10 bg-[#0D121B] p-5 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Collaboration enquiry</p>
                <h2 id="collaboration-form-title" className="mt-2 text-2xl font-semibold text-slate-100">
                  {isSubmitted ? 'Thanks for reaching out.' : 'Tell us about your idea.'}
                </h2>
              </div>
              <button type="button" onClick={closeForm} disabled={isLoading} aria-label="Close enquiry form" className="rounded-md p-2 text-slate-500 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-40">
                <X className="h-5 w-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div role="status" className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[#E5C158]" />
                <p className="mt-4 text-sm leading-7 text-slate-400">Your enquiry has been sent to our team.</p>
                <Button className="mt-6" variant="secondary" onClick={closeForm}>Close</Button>
              </div>
            ) : (
              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-medium text-slate-300">
                    Your name *
                    <input
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/60"
                    />
                  </label>
                  <label className="text-xs font-medium text-slate-300">
                    Email address *
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/60"
                    />
                  </label>
                </div>
                <label className="block text-xs font-medium text-slate-300">
                  What kind of enquiry is this?
                  <select
                    value={formData.interest}
                    onChange={(event) => setFormData((current) => ({ ...current, interest: event.target.value }))}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-[#D4AF37]/60"
                  >
                    <option value="general">General enquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="collaboration">Project collaboration</option>
                    <option value="internship">Internship enquiry</option>
                  </select>
                </label>
                <label className="block text-xs font-medium text-slate-300">
                  Your message *
                  <textarea
                    required
                    rows={6}
                    value={formData.proposal}
                    onChange={(event) => setFormData((current) => ({ ...current, proposal: event.target.value }))}
                    className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-[#D4AF37]/60"
                    placeholder="Share your idea, experience, or the kind of collaboration you have in mind."
                  />
                </label>
                {error && (
                  <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/[0.07] p-4 text-sm text-red-200">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? 'Sending…' : 'Send enquiry'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.section>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
