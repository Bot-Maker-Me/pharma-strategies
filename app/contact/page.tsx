import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { DemoForm } from '@/components/sections/demo-form';
import { StaggerReveal } from '@/components/motion/stagger-reveal';

export const metadata = { title: 'Book a demo' };

const agenda = [
  {
    index: '01',
    title: 'You describe the operation',
    body: 'Sites, substances, who receives stock and who signs for it.',
  },
  {
    index: '02',
    title: 'We load a demo facility',
    body: 'Your substances and minimum levels appear in a register you can click through.',
  },
  {
    index: '03',
    title: 'You keep the export',
    body: 'Walk away with a sample audit export and a plan for your first count.',
  },
];

const facts = [
  { label: 'Response time', value: 'One business day' },
  { label: 'First call', value: '30 minutes' },
  { label: 'Obligation', value: 'None — keep the export' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="§ 10 — Book a demo"
        title="Let's talk about your operation"
        lead="Tell us what you are trying to improve and our team will follow up with two or three times that suit your facility."
        meta={facts}
      />

      <section className="bg-raisedDark py-28 lg:py-36">
        <div className="ed-container grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText">
              <span aria-hidden className="h-px w-8 bg-accentRed" />
              § CD — What happens next
            </p>
            <h2 className="mb-10 font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.1] text-primaryText">
              A working session, not a sales call
            </h2>

            <StaggerReveal className="space-y-4" stagger={0.12} y={24}>
              {agenda.map((item) => (
                <div key={item.index} className="border-t border-hairline pt-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accentRed">
                      {item.index}
                    </span>
                    <h3 className="font-heading text-lg text-primaryText">{item.title}</h3>
                  </div>
                  <p className="mt-2 pl-8 font-sans text-sm leading-relaxed text-secondaryText">
                    {item.body}
                  </p>
                </div>
              ))}
            </StaggerReveal>

            <p className="mt-10 max-w-md font-sans text-sm text-secondaryText">
              Prefer to read first? The{' '}
              <Link href="/platform" className="text-accentRed underline-offset-4 hover:underline">
                platform overview
              </Link>{' '}
              and{' '}
              <Link href="/resources" className="text-accentRed underline-offset-4 hover:underline">
                resource library
              </Link>{' '}
              cover most of what the call will.
            </p>
          </div>

          <DemoForm />
        </div>
      </section>
    </>
  );
}
