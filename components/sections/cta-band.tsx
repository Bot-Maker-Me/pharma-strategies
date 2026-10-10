'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';

interface CtaBandProps {
  eyebrow: string;
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/** Reusable closing band so every interior page ends on the same call to action. */
export function CtaBand({
  eyebrow,
  title,
  description,
  primaryHref = '/contact',
  primaryLabel = 'Book a demo',
  secondaryHref = '/pricing',
  secondaryLabel = 'See pricing',
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-raisedDark py-20 lg:py-24">
      <div
        aria-hidden
        className="glow-red pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 opacity-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: DESIGN_EASE_ARRAY }}
        className="ed-container relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText">
            <span aria-hidden className="h-px w-8 bg-accentRed" />
            {eyebrow}
          </p>
          <h2 className="font-heading text-[clamp(1.85rem,4vw,3rem)] font-normal leading-[1.1] text-primaryText">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 font-sans text-lg text-secondaryText">{description}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={primaryHref}
            className="group inline-flex items-center rounded-button bg-accentRed px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-midnight shadow-[0_24px_60px_-28px_rgba(194,59,59,0.85)] transition-colors hover:bg-accentRedBright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed"
          >
            {primaryLabel}
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryHref}
            className="rounded-button border border-hairline px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:border-accentRed hover:text-accentRed"
          >
            {secondaryLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
