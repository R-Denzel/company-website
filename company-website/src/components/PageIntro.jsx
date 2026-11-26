import Aurora from './Aurora';

/** Opening block for inner pages: oversized title, then supporting copy on the right column. */
const PageIntro = ({ title, children, actions }) => (
  <section className="relative isolate">
    <Aurora mask="corner" />
    <div className="shell pb-16 pt-16 sm:pb-24 sm:pt-28">
      <h1 data-split data-delay="0.25" className="max-w-6xl text-[clamp(2.75rem,8vw,6rem)] font-medium leading-[0.98] tracking-[-0.04em]">
        {title}
      </h1>
      <div data-rule className="mt-12 h-px bg-ink/15 sm:mt-20" />
      <div className="split pt-8">
        <div className="lg:col-start-2">
          <p data-fade data-delay="0.45" className="max-w-xl text-lead text-muted">{children}</p>
          {actions && <div data-fade data-delay="0.5" className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </div>
  </section>
);

export default PageIntro;
