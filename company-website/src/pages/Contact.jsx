import { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import MarketSelector from '../components/MarketSelector';
import PageIntro from '../components/PageIntro';
import Photo from '../components/Photo';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { whatsappLink } from '../content/markets';
import { addons, allPackages, billingLabels, findPackage, formatPrice } from '../content/pricing';
import { products } from '../content/products';
import { needs, segments } from '../content/segments';
import { contactChannels, linkTarget } from '../data/contacts';
import { photos } from '../data/photos';
import { logEvent } from '../lib/analytics';
import { enquirySubject, enquiryText, initialEnquiry, locationBands, sizeBands, timelines } from '../lib/enquiry';
import { setMarket, setSegment, usePreferences } from '../lib/preferences';
import { sendContactEmail } from '../utils/emailService';

const Field = ({ label, children }) => (
  <label className="block text-sm font-medium">
    {label}
    {children}
  </label>
);

const Contact = () => {
  const location = useLocation();
  const preferences = usePreferences();
  const prefill = location.state?.enquiry;
  const [form, setForm] = useState(() => initialEnquiry(preferences, prefill));
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const motion = usePageMotion();
  useSeo('Contact and discovery call', 'Request a quote or book a discovery call with FutureTech Africa in Uganda or Kenya.');

  // The market buttons in the header and this form always agree.
  const values = { ...form, market: preferences.market };
  const chosen = findPackage(values.packageId);
  const isDiscovery = values.segment === 'corporate';

  const set = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const text = (field, props = {}) => <input value={values[field]} onChange={set(field)} className="field" {...props} />;
  const select = (field, options, empty, props = {}) => (
    <select value={values[field]} onChange={set(field)} className="field" {...props}>
      <option value="">{empty}</option>
      {options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
    </select>
  );
  const same = (list) => list.map((entry) => [entry, entry]);

  const finish = (channel) => {
    logEvent('enquiry_completed', { channel, market: values.market, segment: values.segment || 'unset', package: values.packageId || 'none' });
    setStatus(channel);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (event.nativeEvent.submitter?.value === 'whatsapp') {
      logEvent('whatsapp_click', { market: values.market, from: 'enquiry_form' });
      window.open(whatsappLink(values.market, `${enquirySubject(values)}\n\n${enquiryText(values)}`), '_blank', 'noopener');
      finish('whatsapp');
      return;
    }

    setStatus('sending');
    try {
      await sendContactEmail({ name: values.name, email: values.email, subject: enquirySubject(values), message: enquiryText(values) });
      finish('email');
    } catch (sendError) {
      console.error('Error sending email:', sendError);
      setError('We couldn’t send your enquiry by email. Send it on WhatsApp instead, or email us directly.');
      setStatus('idle');
    }
  };

  const done = status === 'email' || status === 'whatsapp';

  return (
    <div ref={motion}>
      <PageIntro title={isDiscovery ? 'Book a discovery call.' : 'Let’s talk about your project.'}>
        Send an enquiry, or contact our team in Uganda and Kenya directly.
      </PageIntro>

      <section className="shell section split">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ul>
            {contactChannels.map((channel) => (
              <li key={channel.href} data-fade data-delay="0.45" className="border-b border-line">
                <a href={channel.href} {...linkTarget(channel)} onClick={() => channel.isExternal && logEvent('whatsapp_click', { from: 'contact_page' })} className="group flex items-center justify-between gap-4 py-5">
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{channel.label}</span>
                    <span className="mt-1 block break-all font-medium sm:break-normal">{channel.value}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-deep transition-transform duration-300 ease-soft group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>

          {chosen && (
            <div className="mt-8 rounded-xl bg-mist p-6">
              <h2 className="text-sm font-medium">Your chosen package</h2>
              <p className="mt-3 font-medium">{chosen.name}</p>
              <p className="mt-1 tabular-nums">{formatPrice(chosen.price, values.market)}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{billingLabels[chosen.billing]}. Indicative; your quotation confirms scope and price.</p>
            </div>
          )}
        </div>

        <div data-fade data-delay="0.5">
          {done ? (
            <div role="status" className="rounded-xl bg-mist p-8 sm:p-12">
              <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-brand text-ink"><Check className="h-6 w-6" /></span>
              <h2 className="mt-8 text-subheading">{status === 'email' ? 'Enquiry sent' : 'Finish in WhatsApp'}</h2>
              <p className="mt-4 max-w-md text-muted">
                {status === 'email'
                  ? 'Thanks for reaching out. We’ll review your enquiry and get back to you.'
                  : 'We opened WhatsApp with your details filled in. Press send there to reach us. If nothing opened, use a WhatsApp link on this page.'}
              </p>
              <Button size="lg" className="mt-8" onClick={() => { setForm(initialEnquiry(preferences)); setStatus('idle'); }}>New enquiry</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <p className="mb-3 text-sm font-medium">Market</p>
                <MarketSelector />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Business category *">
                  <select
                    required
                    value={values.segment}
                    onChange={(event) => { set('segment')(event); setSegment(event.target.value); }}
                    className="field"
                  >
                    <option value="">Choose one</option>
                    {segments.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
                  </select>
                </Field>
                <Field label="Main need">{select('need', needs.map((entry) => [entry.id, entry.label]), 'Not sure yet')}</Field>
                <Field label="Package or service">
                  {select('packageId', allPackages.map((entry) => [entry.id, entry.name]), values.service || 'Recommend one')}
                </Field>
                <Field label="Product of interest">{select('product', products.map((entry) => [entry.id, entry.name]), 'None')}</Field>
                <Field label="Industry">{text('industry', { placeholder: 'Retail, school, clinic…' })}</Field>
                <Field label="Team size">{select('size', same(sizeBands), 'Choose one')}</Field>
                <Field label="Locations">{select('locations', same(locationBands), 'Choose one')}</Field>
                <Field label="Timeline">{select('timeline', same(timelines), 'Choose one')}</Field>
                <Field label="Current tools">{text('tools', { placeholder: 'Spreadsheets, paper, other software…' })}</Field>
                <Field label="Budget range (optional)">{text('budget', { placeholder: 'In your own words' })}</Field>
              </div>

              <fieldset>
                <legend className="text-sm font-medium">Add-ons</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {addons.map((entry) => (
                    <label key={entry.id} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={values.addonIds.includes(entry.id)}
                        onChange={(event) => setForm((current) => ({ ...current, addonIds: event.target.checked ? [...current.addonIds, entry.id] : current.addonIds.filter((id) => id !== entry.id) }))}
                        className="h-5 w-5 shrink-0 accent-brand-deep"
                      />
                      {entry.name}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Your name *">{text('name', { required: true, autoComplete: 'name', placeholder: 'Full name' })}</Field>
                <Field label="Email address *">{text('email', { required: true, type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })}</Field>
                <Field label="Phone (optional)">{text('phone', { type: 'tel', autoComplete: 'tel' })}</Field>
                <Field label="Organisation (optional)">{text('organisation', { autoComplete: 'organization' })}</Field>
              </div>

              <Field label="What problem do you want solved? *">
                <textarea required rows={5} value={values.message} onChange={set('message')} className="field resize-y leading-7" placeholder="What are you hoping to build or improve?" />
              </Field>

              {error && (
                <div role="alert" className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
                  <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" value="email" size="lg" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send by email'}
                </Button>
                <Button type="submit" value="whatsapp" size="lg" variant="secondary" icon={MessageCircle} disabled={status === 'sending'}>
                  Send on WhatsApp
                </Button>
              </div>
              <p className="text-sm leading-6 text-muted">We use these details only to respond to your enquiry. Choosing WhatsApp shares them through WhatsApp.</p>
            </form>
          )}
        </div>
      </section>

      <div className="shell pb-16 sm:pb-24">
        <Photo {...photos.nairobi} className="aspect-[4/3] sm:aspect-[21/9]" />
      </div>
    </div>
  );
};

// A new set of choices from elsewhere starts a fresh form.
const ContactPage = () => {
  const location = useLocation();
  const marketFromLink = location.state?.enquiry?.market;

  useEffect(() => {
    if (marketFromLink) setMarket(marketFromLink);
  }, [location.key, marketFromLink]);

  return <Contact key={location.key} />;
};

export default ContactPage;
