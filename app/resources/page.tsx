import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { SectionHeading } from '@/components/shared/section-heading';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata = { title: 'Resources' };

const resources = [
  {
    tag: 'Checklist',
    title: 'Controlled substances: a setup checklist',
    body: 'Everything a new register needs before the first delivery: substances, minimum levels, roles and signatories.',
  },
  {
    tag: 'Guide',
    title: 'Mapping your existing ledger',
    body: 'Move a paper or spreadsheet ledger into the register without losing the history that made it useful.',
  },
  {
    tag: 'Guide',
    title: 'Audit-readiness in one afternoon',
    body: 'What a reviewer asks for, what the export contains, and how to hand it over in one file.',
  },
  {
    tag: 'Template',
    title: 'Roles and permissions template',
    body: 'A starting point for pharmacist, nurse and administrator access across a single site or a group.',
  },
  {
    tag: 'Guide',
    title: 'Discrepancy playbook',
    body: 'What to do in the first hour after a cycle count does not reconcile, and what the record should say.',
  },
  {
    tag: 'Updates',
    title: 'What is new in Pharma Strategies',
    body: 'Product changes, newest first. Ask us and we will send the current release note.',
  },
];

const support = [
  {
    index: '01',
    title: 'Plan',
    body: 'We map your substances, sites and staffing before anything is configured.',
  },
  {
    index: '02',
    title: 'Configure',
    body: 'Substances, minimum levels, roles and signatures are loaded with you, not for you.',
  },
  {
    index: '03',
    title: 'Go live',
    body: 'Your team runs the register on day one, with a sample export to review.',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="§ R1 — Resources"
        title="Practical guidance for regulated operations"
        lead="Implementation guidance, compliance planning checklists, and product updates — written for the people who have to hand the record over."
        meta={[
          { label: 'Format', value: 'Guides and checklists' },
          { label: 'Written from', value: 'Live registers' },
          { label: 'Access', value: 'Ask us and we send it' },
        ]}
      />

      {/* Library */}
      <section className="bg-raisedDark py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ R2 — Library"
            title="What we are writing first"
            description="Each piece is short, checklist-shaped, and written to be used during a workday — not read on a weekend."
          />

          <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1} y={32}>
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href="/contact"
                className="glass-panel group flex h-full flex-col rounded-panel p-6 transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="mb-5 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {resource.tag}
                </span>
                <h3 className="mb-3 font-heading text-xl leading-snug text-primaryText">
                  {resource.title}
                </h3>
                <p className="flex-1 font-sans text-sm leading-relaxed text-secondaryText">
                  {resource.body}
                </p>
                <span className="mt-6 flex items-center border-t border-hairline pt-4 font-mono text-[10px] uppercase tracking-widest text-secondaryText transition-colors group-hover:text-accentRed">
                  Ask us for it
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Implementation support */}
      <section className="bg-midnight py-28 lg:py-36">
        <div className="ed-container">
          <SectionHeading
            label="§ R3 — Implementation support"
            title="Rollout, handled with you"
            description="Most facilities are counting in the register within two business days."
          />

          <StaggerReveal className="grid gap-px border border-hairline bg-hairline md:grid-cols-3" stagger={0.14} y={36}>
            {support.map((step) => (
              <div key={step.index} className="bg-midnight p-7">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {step.index}
                </p>
                <h3 className="mb-3 font-heading text-xl text-primaryText">{step.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-secondaryText">{step.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CtaBand
        eyebrow="§ R4 — Next step"
        title="Want the checklist for your facility first?"
        description="Tell us what you run and we will send the relevant guide before the demo."
        secondaryHref="/platform"
        secondaryLabel="How the platform works"
      />
    </>
  );
}
