import Headline from './Headline';

/** Closing band shared by every page. */
const CallToAction = ({ title, text, children }) => (
  <section className="bg-mist">
    <div className="shell section flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2 data-split className="max-w-2xl text-heading"><Headline text={title} /></h2>
        <p data-fade className="mt-3 max-w-xl text-muted">{text}</p>
      </div>
      <div data-fade className="flex flex-wrap gap-3">{children}</div>
    </div>
  </section>
);

export default CallToAction;
