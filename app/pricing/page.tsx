import { PageHero } from '@/components/layout/page-hero';
import { SectionHeading } from '@/components/shared/section-heading';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { PricingNew } from '@/components/sections/pricing-new';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata = { title: 'Pricing' };

const included = [
  {
    title: 'The controlled-substance register',
    body: 'Live balances per substance per facility, updated by every movement.',
  },
  {
    title: 'Dual signatures',
    body: 'One signer receives, one confirms. Both names sit on the entry.',
  },
  {
    title: 'Discrepancy alerts',
    body: 'A count that does not reconcile is flagged the moment it is entered.',
  },
  {
    title: 'Audit export',
    body: 'One file with entries, signatures and timestamps, ready to hand over.',
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="§ P1 — Pricing"
        title="Pricing that scales with your operation"
        lead="Start with a single facility or run the register across a group. Every plan includes the register, dual signatures and audit export."
        meta={[
          { label: 'Setup', value: 'No setup fees' },
          { label: 'Billing', value: 'Monthly or yearly' },
          { label: 'Commitment', value: 'Cancel at any time' },
        ]}
      />

      <PricingNew />

      <section className="bg-raisedDark py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ P2 — Included"
            title="On every plan, without exception"
            description="The parts that make a record defensible are never the part we charge extra for."
          />

          <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1} y={28}>
            {included.map((item) => (
              <article key={item.title} className="glass-panel rounded-panel p-6">
                <h3 className="mb-3 font-heading text-lg leading-snug text-primaryText">
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-secondaryText">{item.body}</p>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CtaBand
        eyebrow="§ P3 — Next step"
        title="Not sure which plan fits your sites?"
        description="Tell us the number of facilities and staff and we will say plainly which plan you need."
        secondaryHref="/apps"
        secondaryLabel="See the apps"
      />
    </>
  );
}
