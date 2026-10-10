import { PageHero } from '@/components/layout/page-hero';
import { SectionHeading } from '@/components/shared/section-heading';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata = { title: 'Platform' };

const pillars = [
  {
    title: 'Modular by design',
    body: 'Start with one app and expand as your operation grows. Nothing needs to be ripped out later.',
  },
  {
    title: 'Built for accountability',
    body: 'Approvals, records and operational ownership stay visible on the entry itself.',
  },
  {
    title: 'Ready for review',
    body: 'Internal teams and external reviewers read the same source of truth, in the same format.',
  },
];

const register = [
  {
    index: '01',
    title: 'One register',
    body: 'Every substance, every facility, one set of balances that cannot drift apart.',
  },
  {
    index: '02',
    title: 'Dual signatures',
    body: 'A movement is written by one person and confirmed by another, by name.',
  },
  {
    index: '03',
    title: 'Audit export',
    body: 'Entries, signatures and timestamps leave as a single review-ready file.',
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="§ 00 — Platform"
        title="A focused operating layer for compliance work"
        lead="Pharma Strategies brings regulated workflows, audit visibility, and team approvals into a clear workspace without forcing you to buy tools you do not need."
        meta={[
          { label: 'Foundation', value: 'The controlled-substance register' },
          { label: 'Apps', value: 'Added as you need them' },
          { label: 'Export', value: 'Audit-ready, one file' },
        ]}
      />

      <section className="bg-raisedDark py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ 00.1 — Principles"
            title="What the platform is built on"
            description="Three commitments that shape every screen, table and permission in the product."
          />

          <StaggerReveal className="grid gap-6 md:grid-cols-3" stagger={0.12} y={32}>
            {pillars.map((pillar) => (
              <article key={pillar.title} className="glass-panel rounded-panel p-7">
                <h3 className="mb-3 font-heading text-xl text-primaryText">{pillar.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-secondaryText">{pillar.body}</p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="bg-midnight py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ 00.2 — The register"
            title="Everything on top of one record"
            description="Apps change what people see and do. The register underneath does not change."
          />

          <StaggerReveal className="grid gap-px border border-hairline bg-hairline md:grid-cols-3" stagger={0.14} y={36}>
            {register.map((item) => (
              <div key={item.index} className="bg-midnight p-7">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {item.index}
                </p>
                <h3 className="mb-3 font-heading text-xl text-primaryText">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-secondaryText">{item.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CtaBand
        eyebrow="§ 00.3 — Next step"
        title="Walk through the platform with your own substances."
        description="A demo facility, loaded with your register, in thirty minutes."
        secondaryHref="/apps"
        secondaryLabel="See the apps"
      />
    </>
  );
}
