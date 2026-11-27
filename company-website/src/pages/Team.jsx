import Button from '../components/Button';
import CallToAction from '../components/CallToAction';
import PageIntro from '../components/PageIntro';
import usePageMotion from '../hooks/usePageMotion';
import useSeo from '../hooks/useSeo';
import { teamMembers } from '../data/team';

const Team = () => {
  const motion = usePageMotion();
  useSeo('Team', 'The people and roles behind FutureTech Africa.');

  return (
    <div ref={motion}>
      <PageIntro title="Meet the team.">
        Get to know the people and roles behind FutureTech Africa.
      </PageIntro>

      <section className="shell section">
        <div className="split mb-12">
          <h2 data-split className="text-heading">Leadership &amp; team</h2>
          <p data-fade className="max-w-xl text-muted">
            The people responsible for guiding, designing, and building our digital work.
          </p>
        </div>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member) => (
            <article key={member.name}>
              <div data-clip aria-hidden="true" className="grid aspect-[4/3] place-items-center rounded-xl bg-mist">
                <span className="text-heading">{member.initials}</span>
              </div>
              <div data-fade>
                <h3 className="mt-4 text-subheading">{member.name}</h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
                <p className="mt-3 leading-7 text-muted">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CallToAction title="Have a project in mind?" text="Start a conversation with our team.">
        <Button size="lg" to="/contact">Get in touch</Button>
      </CallToAction>
    </div>
  );
};

export default Team;
