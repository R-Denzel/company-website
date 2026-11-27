import { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import Dialog from '../components/Dialog';
import PageIntro from '../components/PageIntro';
import Photo from '../components/Photo';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { photos } from '../data/photos';
import { sendProposalEmail } from '../utils/emailService';

const collaborationWays = [
  {
    title: 'Share your expertise',
    description: 'Tell us about your experience and the kinds of projects you would be interested in contributing to.',
  },
  {
    title: 'Explore a partnership',
    description: 'Have an idea for working together? Share the context and what a useful collaboration could look like.',
  },
  {
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
  const motion = usePageMotion();
  useSeo('Opportunities', 'Send FutureTech Africa a partnership, collaboration or internship enquiry.');

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

  const openForm = () => {
    setIsSubmitted(false);
    setError('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (!isLoading) setIsFormOpen(false);
  };

  const update = (field) => (event) => setFormData((current) => ({ ...current, [field]: event.target.value }));

  return (
    <div ref={motion}>
      <PageIntro
        title="Good work starts with a good collaboration."
        actions={<Button size="lg" onClick={openForm}>Send a collaboration enquiry</Button>}
      >
        We welcome thoughtful enquiries from people and organizations interested in building useful digital products with FutureTech Africa.
      </PageIntro>

      <div className="shell pt-16 sm:pt-24">
        <Photo {...photos.collaborators} className="aspect-[4/3] sm:aspect-[21/9]" />
      </div>

      <section className="shell section">
        <div className="split">
          <h2 data-split className="max-w-xl text-heading">What would you like to explore?</h2>
          <p data-fade className="max-w-xl text-muted">This is an open enquiry channel, not a list of active job vacancies.</p>
        </div>
        <ul className="mt-12">
          {collaborationWays.map((way) => (
            <li key={way.title} data-fade className="grid gap-2 border-t border-line py-6 lg:grid-cols-2 lg:gap-16">
              <h3 className="text-subheading">{way.title}</h3>
              <p className="max-w-xl text-muted">{way.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <CallToAction title="Tell us what you’d like to work on." text="Share a few details and our team can take it from there.">
        <Button size="lg" onClick={openForm}>Start an enquiry</Button>
      </CallToAction>

      <Dialog open={isFormOpen} onClose={closeForm} labelledBy="collaboration-form-title" closeLabel="Close enquiry form">
        <h2 id="collaboration-form-title" className="text-subheading">
          {isSubmitted ? 'Thanks for reaching out.' : 'Tell us about your idea.'}
        </h2>

        {isSubmitted ? (
          <div role="status" className="mt-8">
            <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-brand text-ink"><Check className="h-6 w-6" /></span>
            <p className="mt-6 text-muted">Your enquiry has been sent to our team.</p>
            <Button size="lg" variant="secondary" arrow={false} className="mt-8" onClick={closeForm}>Close</Button>
          </div>
        ) : (
          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium">
              Your name *
              <input required autoComplete="name" value={formData.name} onChange={update('name')} className="field" />
            </label>
            <label className="block text-sm font-medium">
              Email address *
              <input required type="email" autoComplete="email" value={formData.email} onChange={update('email')} className="field" />
            </label>
            <label className="block text-sm font-medium">
              What kind of enquiry is this?
              <select value={formData.interest} onChange={update('interest')} className="field">
                <option value="general">General enquiry</option>
                <option value="partnership">Partnership</option>
                <option value="collaboration">Project collaboration</option>
                <option value="internship">Internship enquiry</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Your message *
              <textarea
                required
                rows={5}
                value={formData.proposal}
                onChange={update('proposal')}
                className="field resize-y"
                placeholder="Share your idea, experience, or the kind of collaboration you have in mind."
              />
            </label>
            {error && (
              <div role="alert" className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
                <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Sending…' : 'Send enquiry'}
            </Button>
          </form>
        )}
      </Dialog>
    </div>
  );
};

export default Opportunities;
