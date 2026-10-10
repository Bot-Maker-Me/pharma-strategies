import { PageHero } from '@/components/layout/page-hero';
import { SectionHeading } from '@/components/shared/section-heading';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata = { title: 'About' };

const pillars = [
  {
    index: '01',
    title: 'Records first',
    body: 'Every workflow ends in a record that someone who was not there can read and trust.',
  },
  {
    index: '02',
    title: 'Ownership is visible',
    body: 'It is always clear who performed an action and who confirmed it, on the entry itself.',
  },
  {
    index: '03',
    title: 'No surplus features',
    body: 'If a feature does not make regulated work safer or faster, it does not ship.',
  },
];

const cards = [
  {
    title: 'Our focus',
    body: 'We focus on practical workflows that support the people responsible for safe, compliant operations every day.',
  },
  {
    title: 'Our approach',
    body: 'We favour modular tools, clear ownership, and records that help teams understand what happened and why.',
  },
  {
    title: 'Who we build for',
    body: 'Retail pharmacies, nursing homes and care facilities that have to account for every controlled substance.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="§ A1 — About Pharma Strategies"
        title="Compliance software should make careful work clearer"
        lead="Pharma Strategies helps pharmaceutical, pharmacy, and care operations teams manage important work with less friction and more accountability."
        meta={[
          { label: 'Built for', value: 'Pharmacies, nursing homes, care' },
          { label: 'Core object', value: 'The controlled-substance register' },
          { label: 'Standard', value: 'Every entry signed and timestamped' },
        ]}
      />

      {/* What we build */}
      <section className="bg-raisedDark py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ A2 — What we build"
            title="Software that follows the work, not the other way around"
            description="No migration project, no re-training week. The register fits the counting routine your team already has."
          />

          <StaggerReveal className="grid gap-6 md:grid-cols-3" stagger={0.12} y={32}>
            {cards.map((card) => (
              <article key={card.title} className="glass-panel rounded-panel p-7">
                <h3 className="mb-3 font-heading text-xl text-primaryText">{card.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-secondaryText">{card.body}</p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-midnight py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ A3 — How we work"
            title="Three rules we do not bend"
            description="They decide what we build, what we refuse to build, and how a record looks when it is finished."
          />

          <StaggerReveal className="grid gap-px border border-hairline bg-hairline md:grid-cols-3" stagger={0.14} y={36}>
            {pillars.map((pillar) => (
              <div key={pillar.index} className="bg-midnight p-7">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {pillar.index}
                </p>
                <h3 className="mb-3 font-heading text-xl text-primaryText">{pillar.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-secondaryText">{pillar.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CtaBand
        eyebrow="§ A4 — Next step"
        title="See the register with your own substances in it."
        description="A short walkthrough, your operation, no slide deck."
        secondaryHref="/apps"
        secondaryLabel="See the apps"
      />
    </>
  );
}
