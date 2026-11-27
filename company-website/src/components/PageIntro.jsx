import Headline from './Headline';

/** Opening block for inner pages: title, supporting copy and any actions. */
const PageIntro = ({ title, children, actions }) => (
  <section className="on-ink logo-ground relative text-paper">
    <div className="shell section">
      <h1 data-split data-delay="0.1" className="max-w-3xl text-heading"><Headline text={title} /></h1>
      <p data-fade data-delay="0.15" className="mt-5 max-w-2xl text-muted-invert">{children}</p>
      {actions && <div data-fade data-delay="0.2" className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </div>
    <div data-rule aria-hidden="true" className="streak" />
  </section>
);

export default PageIntro;
