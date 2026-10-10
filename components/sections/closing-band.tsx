'use client';

import { motion } from 'framer-motion';
import { SplitText } from '@/components/react-bits';
import { RevealFrame } from '@/components/motion/reveal-frame';
import { DemoForm } from '@/components/sections/demo-form';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';

const nextSteps = [
  { index: '01', text: 'A 30-minute walkthrough of the register' },
  { index: '02', text: 'Your substances loaded into a demo facility' },
  { index: '03', text: 'A sample audit export you can keep' },
];

export function ClosingBand() {
  return (
    <section className="relative overflow-hidden border-t border-hairline bg-midnight py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-background opacity-20" />
      <div
        aria-hidden
        className="glow-red pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 opacity-20"
      />

      <div className="ed-container relative">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: statement */}
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText">
              <span aria-hidden className="h-px w-8 bg-accentRed" />
              § 10 — BOOK A DEMO
            </p>
            <h2 className="mb-8 font-heading text-[clamp(2.25rem,5vw,4.25rem)] font-normal leading-[1.05] text-primaryText">
              <SplitText
                text="Make every count count."
                splitType="lines"
                delay={130}
                duration={1.1}
                highlight="count"
                blurChars
              />
            </h2>
            <p className="mb-10 max-w-md font-sans text-lg text-secondaryText">
              Tell us what you run, and we will walk through the register with your own substances in
              it — no slide deck, no sandbox that resets.
            </p>

            <ul className="space-y-4">
              {nextSteps.map((step, index) => (
                <motion.li
                  key={step.index}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: DESIGN_EASE_ARRAY }}
                  className="flex items-center gap-4 border-t border-hairline pt-4"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accentRed">
                    {step.index}
                  </span>
                  <span className="font-sans text-sm text-secondaryText">{step.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <RevealFrame delay={0.2}>
            <DemoForm />
          </RevealFrame>
        </div>
      </div>
    </section>
  );
}
