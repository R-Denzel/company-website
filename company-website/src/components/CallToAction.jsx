import Aurora from './Aurora';

/** Closing band shared by every page. */
const CallToAction = ({ title, text, children }) => (
  <section className="on-ink relative isolate py-20 text-paper sm:py-32">
    <Aurora tone="dark" />
    <div className="shell">
      <h2 data-split className="max-w-5xl text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[1] tracking-[-0.04em]">
        {title}
      </h2>
      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <p data-fade className="max-w-lg text-lead text-paper/90">{text}</p>
        <div data-fade className="flex flex-wrap gap-3">{children}</div>
      </div>
    </div>
  </section>
);

export default CallToAction;
