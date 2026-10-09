'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookLock, HeartPulse, LayoutDashboard, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/shared/reveal';
import { apps as fallbackApps, type ComplianceApp } from '@/config/apps';

const iconMap: Record<string, LucideIcon> = { BookLock, HeartPulse, LayoutDashboard };

type PublicApp = Pick<ComplianceApp, 'slug' | 'name' | 'tagline' | 'description' | 'category' | 'icon' | 'features' | 'isActive' | 'popular'>;

export function AppsGrid({ apps = fallbackApps }: { apps?: PublicApp[] }) {
  return (
    <section id="apps" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primaryText sm:text-4xl">Compliance apps, ready to deploy</h2>
          <p className="mt-4 text-lg text-secondaryText">Choose only the tools your operation needs. Each workspace is built for regulated teams and can be managed independently.</p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => {
            const Icon = iconMap[app.icon] ?? LayoutDashboard;
            return (
              <Reveal key={app.slug} delay={index * 0.08}>
                <Link href={`/go/${app.slug}`} className="block h-full" aria-label={`Open ${app.name}`}>
                  <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="group relative flex h-full flex-col rounded-2xl border border-hairline bg-raisedDark p-6 shadow-soft transition-shadow hover:shadow-lift">
                    {app.popular && <span className="absolute -top-3 right-4 rounded-full bg-accentRed px-3 py-1 text-xs font-semibold text-primaryText shadow-md">Popular</span>}
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-hairline bg-raisedDark shadow-md"><Icon className="h-6 w-6 text-primaryText" /></div>
                      <div><h3 className="font-heading text-lg font-semibold text-primaryText">{app.name}</h3><p className="text-sm text-secondaryText">{app.category}</p></div>
                    </div>
                    <p className="text-sm text-secondaryText">{app.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-secondaryText">{app.description}</p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {(Array.isArray(app.features) ? app.features : []).slice(0, 3).map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-secondaryText"><span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accentRed/10"><span className="h-1.5 w-1.5 rounded-full bg-accentRed" /></span>{feature}</li>)}
                    </ul>
                    <div className="mt-6 flex items-center justify-between border-t border-hairline pt-5"><Badge variant="outline" className="bg-accentRed/10 text-accentRed ring-1 ring-accentRed/30">Available</Badge><span className="text-sm font-medium text-secondaryText transition-colors group-hover:text-accentRed">Open app <ArrowUpRight className="ml-1 inline h-4 w-4" /></span></div>
                  </motion.article>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
