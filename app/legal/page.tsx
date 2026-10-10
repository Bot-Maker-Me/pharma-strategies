import { PageHero } from '@/components/layout/page-hero';
import { StaggerReveal } from '@/components/motion/stagger-reveal';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata = { title: 'Legal, Privacy & Compliance' };

const sections = [
  ['Privacy and personal information', 'We collect only information needed to provide the service, respond to inquiries, manage accounts, administer subscriptions, prevent abuse, and meet legal obligations. We do not store payment card numbers in Pharma Strategies. Payment details should be handled by the authorized payment processor. Access is limited by role, encrypted in transit, and protected with database access rules. Contact us to request access, correction, portability, or deletion where applicable under Canadian privacy law.'],
  ['Canadian privacy notice', 'For Canadian users, our privacy practices are intended to support applicable federal and provincial requirements, including PIPEDA and substantially similar provincial privacy legislation where applicable. We identify purposes, limit collection, retain information only as needed, use reasonable safeguards, and provide a contact route for privacy questions or complaints. Provincial health-information rules may apply to customer workflows; customers remain responsible for configuring lawful notices, consents, retention, and access procedures for their own records.'],
  ['Age and permitted use', 'The service is for businesses and authorized professional users. You must be at least 18 years old and legally able to enter an agreement. Do not use the service for unlawful activity, emergency care, diagnosis, or any purpose that requires a regulated clinical or legal decision without appropriate professional oversight.'],
  ['Terms of service', 'Use of Pharma Strategies is subject to an order or subscription agreement, these terms, and applicable law. Customers are responsible for account security, accurate information, lawful instructions, permissions, retention, and the content they upload. We may suspend access for abuse, security threats, non-payment, or legal requirements. Service descriptions and availability may change.'],
  ['Security and incident response', 'We use access controls, least-privilege database policies, server-side administration checks, encrypted transport, audit records, and private server-side destination redirects. No online service can promise zero risk. If we confirm a breach, we will investigate, contain, preserve evidence, meet applicable notification duties, and communicate with affected customers and regulators as required.'],
  ['Healthcare and regulated records', 'Pharma Strategies is a software platform, not a healthcare provider, pharmacy, legal advisor, or regulator. Customers must determine whether their use involves personal health information, controlled-substance records, or other regulated data and must complete their own compliance assessment before production use.'],
  ['Contact and governing terms', 'Privacy questions, requests, and incident notices should be sent through the contact form. These pages are a general product notice, not legal advice, and should be reviewed by qualified Canadian counsel for your business, province, contracts, retention schedule, and regulated workflows before launch.'],
] as const;

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="§ L1 — Legal centre"
        title="Legal, privacy & compliance"
        lead="Clear operating rules for customers, users, and Canadian privacy expectations. Last updated October 6, 2026."
        meta={[
          { label: 'Jurisdiction', value: 'Canada' },
          { label: 'Framework', value: 'PIPEDA-aligned' },
          { label: 'Data location', value: 'Managed cloud region' },
        ]}
      />

      <section className="bg-midnight py-28 lg:py-36">
        <div className="ed-container">
          <div className="grid gap-12 lg:grid-cols-12">
            <nav aria-label="Legal sections" className="lg:col-span-4">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                On this page
              </p>
              <ol className="space-y-3">
                {sections.map(([title], index) => (
                  <li key={title} className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-accentRed">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-sans text-sm text-secondaryText">{title}</span>
                  </li>
                ))}
              </ol>
            </nav>

            <StaggerReveal className="lg:col-span-8" stagger={0.08} y={24}>
              {sections.map(([title, body], index) => (
                <section key={title} className="border-t border-hairline py-8 first:border-t-0 first:pt-0">
                  <div className="mb-3 flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tabular-nums text-accentRed">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading text-xl text-primaryText">{title}</h2>
                  </div>
                  <p className="font-sans leading-8 text-secondaryText">{body}</p>
                </section>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="§ L2 — Questions"
        title="Privacy question, or a request about your data?"
        description="Send it through the contact form and it reaches the team that handles it."
        secondaryHref="/resources"
        secondaryLabel="Read the resources"
      />
    </>
  );
}
