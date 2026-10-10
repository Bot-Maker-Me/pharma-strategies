'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookLock, HeartPulse, LayoutDashboard, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { apps as fallbackApps, type ComplianceApp } from '@/config/apps';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = { BookLock, HeartPulse, LayoutDashboard };

type PublicApp = Pick<
  ComplianceApp,
  'slug' | 'name' | 'tagline' | 'description' | 'category' | 'icon' | 'features' | 'isActive' | 'popular'
>;

/**
 * The marketplace listing. Cards read as product windows: mono index, serif
 * name, category eyebrow, feature markers and a single "Open app" action that
 * routes through `/go/[slug]`.
 */
export function AppsGrid({ apps = fallbackApps }: { apps?: PublicApp[] }) {
  return (
    <section id="apps" className="bg-midnight py-28 lg:py-36">
      <div className="ed-container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, index) => {
            const Icon = iconMap[app.icon] ?? LayoutDashboard;
            return (
              <motion.article
                key={app.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: DESIGN_EASE_ARRAY }}
                className={cn(
                  'glass-panel group flex flex-col rounded-panel p-6 transition-transform duration-500 hover:-translate-y-1.5',
                  app.popular && 'ring-1 ring-inset ring-accentRed/30'
                )}
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-hairline text-accentRed">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-2 font-heading text-2xl leading-snug text-primaryText">
                  {app.name}
                </h3>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-accentRed">
                  {app.category}
                </p>
                <p className="mb-3 font-sans text-sm text-primaryText/90">{app.tagline}</p>
                <p className="mb-6 font-sans text-sm leading-relaxed text-secondaryText">
                  {app.description}
                </p>

                <ul className="mb-6 flex-1 space-y-2">
                  {(Array.isArray(app.features) ? app.features : []).slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 font-sans text-sm text-secondaryText">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accentRed"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between border-t border-hairline pt-5">
                  <Badge
                    variant="outline"
                    className="border-accentRed/30 bg-accentRed/10 font-mono text-[10px] uppercase tracking-widest text-accentRed"
                  >
                    Available
                  </Badge>
                  <Link
                    href={`/go/${app.slug}`}
                    aria-label={`Open ${app.name}`}
                    className="inline-flex items-center font-mono text-[10px] uppercase tracking-widest text-secondaryText transition-colors hover:text-accentRed"
                  >
                    Open app
                    <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
