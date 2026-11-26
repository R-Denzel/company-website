import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import usePageMotion from '../hooks/usePageMotion';
import { teamMembers } from '../data/team';

const Team = () => {
  const motion = usePageMotion();

  return (
    <div ref={motion}>
      <PageIntro title="Meet the team.">
        Get to know the people and roles behind FutureTech Africa.
      </PageIntro>

      <section className="shell pb-20 sm:pb-32">
        <div className="split mb-12">
          <h2 data-split className="text-title font-medium">Leadership &amp; team</h2>
          <p data-fade className="max-w-xl text-lead text-muted">
            The people responsible for guiding, designing, and building our digital work.
          </p>
        </div>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <article key={member.name} className="group">
              <div data-clip aria-hidden="true" className="relative grid aspect-[4/3] place-items-center sm:aspect-[4/5] overflow-hidden rounded-xl bg-mist">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-ink via-violet-deep to-violet transition-transform duration-700 ease-soft group-hover:scale-y-100" />
                <span className="relative text-[clamp(4rem,7vw,6rem)] font-medium tracking-[-0.04em] transition-colors duration-500 group-hover:text-paper">
                  {member.initials}
                </span>
              </div>
              <div data-fade>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.025em]">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-violet-deep">{member.role}</p>
                <p className="mt-3 text-base leading-7 text-muted">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CallToAction title="Have a project in mind?" text="Start a conversation with our team.">
        <Button size="lg" variant="light" to="/contact">Get in touch</Button>
      </CallToAction>
    </div>
  );
};

export default Team;
