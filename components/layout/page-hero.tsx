'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/react-bits';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';

interface PageHeroProps {
  /** Mono eyebrow, e.g. "§ P1 — PRICING". */
  eyebrow: string;
  title: string;
  lead?: string;
  /** Optional three-cell fact strip under the headline. */
  meta?: { label: string; value: string }[];
  children?: ReactNode;
}

/**
 * The opening band for every interior page: its own midnight background (never
 * inherited from the body), the ledger grid, an ambient glow, a masked serif
 * headline reveal and an optional fact strip. This is what keeps `/about`,
 * `/pricing`, `/resources`, `/apps` and `/contact` reading as the same site as
 * the home page.
 */
export function PageHero({ eyebrow, title, lead, meta, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-midnight pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-background opacity-20" />
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 opacity-25"
      />

      <div className="ed-container relative">
        <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText">
          <span aria-hidden className="h-px w-8 bg-accentRed" />
          {eyebrow}
        </p>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h1 className="font-heading text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1.06] text-primaryText lg:col-span-7">
            <SplitText text={title} splitType="lines" delay={110} duration={1} />
          </h1>

          {lead ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: DESIGN_EASE_ARRAY }}
              className="font-sans text-lg text-secondaryText lg:col-span-5 lg:border-l lg:border-hairline lg:pl-8"
            >
              {lead}
            </motion.p>
          ) : null}
        </div>

        {meta && meta.length ? (
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: DESIGN_EASE_ARRAY }}
            className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-3"
          >
            {meta.map((item) => (
              <div key={item.label} className="bg-midnight p-6">
                <dt className="mb-2 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                  {item.label}
                </dt>
                <dd className="font-heading text-2xl leading-snug text-primaryText">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        ) : null}

        {children}
      </div>
    </section>
  );
}
