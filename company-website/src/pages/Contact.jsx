import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle2, Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { sendContactEmail } from '../utils/emailService';

const makeInitialForm = (serviceInquiry) => ({
  name: '',
  email: '',
  subject: serviceInquiry?.service || '',
  message: serviceInquiry
    ? `Service: ${serviceInquiry.service}\nMarket: ${serviceInquiry.market}\nProject stage: ${serviceInquiry.stage}\nPreferred timeline: ${serviceInquiry.timeline}\n${serviceInquiry.selectedPackage ? `Selected package: ${serviceInquiry.selectedPackage.name}\nIndicative estimate: ${serviceInquiry.selectedPackage.estimate}\nReference price: ${serviceInquiry.selectedPackage.referencePrice}\n` : ''}\nProject details:\n`
    : '',
});

const Contact = () => {
  const location = useLocation();
  const serviceInquiry = location.state?.serviceInquiry;
  const [formData, setFormData] = useState(() => makeInitialForm(serviceInquiry));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (serviceInquiry) setFormData(makeInitialForm(serviceInquiry));
  }, [serviceInquiry]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await sendContactEmail(formData);
      setIsSubmitted(true);
    } catch (sendError) {
      console.error('Error sending email:', sendError);
      setError('We couldn’t send your message. Please try again or email us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#080B11]">
      <section className="relative isolate overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 -z-10 bg-pattern opacity-30" />
        <div className="absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-[#D4AF37]/[0.05] blur-[110px]" />
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Get in touch</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">Let’s talk about your project.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Have a question, an idea, or a project to scope? Send us a message or contact our team in Uganda and Kenya directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-xl border border-white/[0.09] bg-[#0D121B] p-5 sm:p-8"
          >
            {isSubmitted ? (
              <div className="py-12 text-center" role="status">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.08] text-[#E5C158]">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-semibold text-slate-100">Message sent</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
                  Thanks for reaching out. We’ll review your message and get back to you.
                </p>
                <Button className="mt-6" variant="secondary" onClick={() => {
                  setIsSubmitted(false);
                  setFormData(makeInitialForm(null));
                }}>
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Project enquiry</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-100">Tell us a little about it.</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">A few details will help us understand what you need.</p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">Your name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        autoComplete="name"
                        required
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/60"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300">Email address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        required
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/60"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300">What can we help with? *</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-2 w-full rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/60"
                      placeholder="Website, mobile app, custom software…"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">Project details *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={7}
                      className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-[#080B11] px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#D4AF37]/60"
                      placeholder="What are you hoping to build or improve?"
                    />
                  </div>

                  {error && (
                    <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/[0.07] p-4 text-sm text-red-200">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? 'Sending…' : 'Send message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-white/[0.09] bg-[#0D121B] p-6 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Contact details</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-100">Reach our team</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Choose whichever way is easiest for you.</p>

              <div className="mt-6 space-y-5">
                <a href="mailto:futuretechafrica1.0@gmail.com" className="group flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-xs text-slate-500">Email</span>
                    <span className="mt-1 block break-all text-sm font-medium text-slate-200 transition group-hover:text-[#E5C158]">futuretechafrica1.0@gmail.com</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-600 transition group-hover:text-[#E5C158]" />
                </a>
                <a href="tel:+256774861658" className="group flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="pt-0.5">
                    <span className="block text-xs text-slate-500">Uganda</span>
                    <span className="mt-1 block text-sm font-medium text-slate-200 transition group-hover:text-[#E5C158]">+256 774 861 658</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-600 transition group-hover:text-[#E5C158]" />
                </a>
                <a href="tel:+254797332824" className="group flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] text-[#E5C158]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="pt-0.5">
                    <span className="block text-xs text-slate-500">Kenya</span>
                    <span className="mt-1 block text-sm font-medium text-slate-200 transition group-hover:text-[#E5C158]">+254 797 332 824</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-600 transition group-hover:text-[#E5C158]" />
                </a>
              </div>
            </div>

            {serviceInquiry && (
              <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.045] p-6">
                <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Your project outline
                </span>
                <p className="mt-3 text-sm font-semibold text-slate-100">{serviceInquiry.service}</p>
                <p className="mt-2 text-xs leading-6 text-slate-400">
                  {serviceInquiry.market} · {serviceInquiry.stage} · {serviceInquiry.timeline}
                </p>
                {serviceInquiry.selectedPackage && (
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Package: {serviceInquiry.selectedPackage.name} · {serviceInquiry.selectedPackage.estimate}
                  </p>
                )}
                <p className="mt-3 text-xs leading-5 text-slate-500">We’ve added these details to your message so you can fill in the project specifics.</p>
              </div>
            )}
          </motion.aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
