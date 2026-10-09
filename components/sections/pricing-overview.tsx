'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';
import { platformPricing } from '@/config/apps';

export function PricingOverview() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="bg-raisedDark/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primaryText sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-secondaryText">
            Start with a single app or subscribe to the full platform. No hidden
            fees, cancel anytime.
          </p>
        </Reveal>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-medium ${!yearly ? 'text-primaryText' : 'text-secondaryText/70'}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative h-7 w-14 rounded-full bg-hairline"
            aria-label="Toggle billing period"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-accentRed shadow-md ${
                yearly ? 'left-7' : 'left-0.5'
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${yearly ? 'text-primaryText' : 'text-secondaryText/70'}`}
          >
            Yearly
            <span className="ml-1.5 rounded-full bg-accentRed/10 px-2 py-0.5 text-xs font-medium text-accentRed">
              Save ~17%
            </span>
          </span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {platformPricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-raisedDark p-6 shadow-soft transition-shadow hover:shadow-lift ${
                  tier.highlighted
                    ? 'border-accentRed ring-2 ring-accentRed/25'
                    : 'border-hairline'
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-xl font-semibold text-primaryText">
                    {tier.name}
                  </h3>
                  {tier.highlighted && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accentRed">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-secondaryText">
                  {tier.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={yearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="font-heading text-4xl font-bold text-primaryText"
                    >
                      ${yearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-secondaryText">
                    /{yearly ? 'year' : 'month'}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-secondaryText"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accentRed" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`mt-6 w-full ${
                    tier.highlighted
                      ? 'bg-accentRed text-primaryText hover:bg-accentRedBright'
                      : ''
                  }`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <a href={tier.ctaHref}>{tier.ctaLabel}</a>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
