import { useEffect, useState } from 'react';
import { AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Aurora from '../components/Aurora';
import Button from '../components/Button';
import Photo from '../components/Photo';
import usePageMotion from '../hooks/usePageMotion';
import { contactChannels, linkTarget } from '../data/contacts';
import { photos } from '../data/photos';
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
  const motion = usePageMotion();

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
    <div ref={motion}>
      <section className="relative isolate">
        <Aurora mask="corner" />
        <div className="shell pb-16 pt-16 sm:pt-28">
          <h1 data-split data-delay="0.25" className="max-w-5xl text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            Let’s talk about your project.
          </h1>
          <div data-rule className="mt-12 h-px bg-ink/15 sm:mt-20" />
        </div>
      </section>

      <section className="shell split pb-20 sm:pb-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-fade data-delay="0.4" className="max-w-md text-lead text-muted">
            Have a question, an idea, or a project to scope? Send us a message or contact our team in Uganda and Kenya directly.
          </p>
          <ul className="mt-10">
            {contactChannels.map((channel) => (
              <li key={channel.href} data-fade data-delay="0.45" className="border-b border-line">
                <a href={channel.href} {...linkTarget(channel)} className="group flex items-center justify-between gap-4 py-5">
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{channel.label}</span>
                    <span className="mt-1 block break-all text-xl font-medium tracking-[-0.02em] sm:break-normal">{channel.value}</span>
                  </span>
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mist transition-colors duration-500 group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-45" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {serviceInquiry && (
            <div data-fade className="mt-8 rounded-2xl bg-mist p-6">
              <h2 className="text-sm font-semibold">Your project outline</h2>
              <p className="mt-3 text-lg font-medium">{serviceInquiry.service}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {serviceInquiry.market} · {serviceInquiry.stage} · {serviceInquiry.timeline}
              </p>
              {serviceInquiry.selectedPackage && (
                <p className="mt-1 text-sm leading-6 text-muted">
                  Package: {serviceInquiry.selectedPackage.name} · {serviceInquiry.selectedPackage.estimate}
                </p>
              )}
              <p className="mt-3 text-sm leading-6 text-muted">We’ve added these details to your message so you can fill in the project specifics.</p>
            </div>
          )}
        </div>

        <div data-fade data-delay="0.5">
          {isSubmitted ? (
            <div role="status" className="rounded-2xl bg-mist p-8 sm:p-12">
              <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-violet text-paper"><Check className="h-6 w-6" /></span>
              <h2 className="mt-8 text-title font-medium">Message sent</h2>
              <p className="mt-4 max-w-md text-lead text-muted">
                Thanks for reaching out. We’ll review your message and get back to you.
              </p>
              <Button
                size="lg"
                className="mt-8"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(makeInitialForm(null));
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-title font-medium">Tell us a little about it.</h2>
              <p className="mt-3 text-base text-muted">A few details will help us understand what you need.</p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label htmlFor="contact-name" className="block text-sm font-medium">
                    Your name *
                    <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleInputChange} autoComplete="name" required className="field" placeholder="Full name" />
                  </label>
                  <label htmlFor="contact-email" className="block text-sm font-medium">
                    Email address *
                    <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleInputChange} autoComplete="email" required className="field" placeholder="you@company.com" />
                  </label>
                </div>

                <label htmlFor="contact-subject" className="block text-sm font-medium">
                  What can we help with? *
                  <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleInputChange} required className="field" placeholder="Website, mobile app, custom software…" />
                </label>

                <label htmlFor="contact-message" className="block text-sm font-medium">
                  Project details *
                  <textarea id="contact-message" name="message" value={formData.message} onChange={handleInputChange} required rows={8} className="field resize-y leading-7" placeholder="What are you hoping to build or improve?" />
                </label>

                {error && (
                  <div role="alert" className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
                    <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            </>
          )}
        </div>
      </section>

      <div className="shell pb-20 sm:pb-32">
        <Photo {...photos.nairobi} className="h-[60svh] min-h-[18rem]" />
      </div>
    </div>
  );
};

export default Contact;
