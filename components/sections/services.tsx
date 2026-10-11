'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { RemoteSupportLink } from '@/components/shared/remote-support-link';
import { SERVICES, type Service } from '@/src/config/site';
import { cn } from '@/lib/utils';

/**
 * One service row. Rows are ruled lines, not cards: a 1px hairline that draws
 * left→right on scroll, a mono index, a display title and the sub-services as
 * small ruled chips.
 *
 * Hover / keyboard focus is pure CSS (`group-hover` / `group-focus-within`).
 * The chips only hide behind that state on hover-capable devices
 * (`@media (hover: hover)`); on touch they are always visible, which is why
 * there is no JS hover detection (and therefore no hydration flash).
 */
function ServiceRow({ service }: { service: Service }) {
  return (
    <div
      data-service-row
      tabIndex={0}
      className={cn(
        'group relative px-2 py-9 outline-none transition-colors duration-500',
        'hover:bg-raisedDark focus-within:bg-raisedDark',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accentRed'
      )}
    >
      <span
        data-service-rule
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-hairline"
      />

      <div className="grid gap-4 md:grid-cols-[3.5rem_minmax(0,1fr)]">
        <span className="font-mono text-[11px] uppercase tracking-widest text-secondaryText">
          {service.number}
        </span>

        <div className="min-w-0">
          <h3
            className={cn(
              'font-heading text-[clamp(1.75rem,3.2vw,3rem)] font-bold leading-[1.08] text-primaryText',
              'transition-transform duration-500 group-hover:translate-x-2 group-focus-within:translate-x-2'
            )}
          >
            {service.title}
          </h3>

          <p className="mt-4 max-w-[52ch] font-sans text-base leading-relaxed text-secondaryText">
            {service.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {service.items.map((item, index) => (
              <li
                key={item}
                style={{ transitionDelay: `${index * 0.05}s` }}
                className={cn(
                  'inline-flex items-center gap-2.5 rounded-[2px] border border-hairline px-3 py-2 font-sans text-sm text-primaryText',
                  'transition-all duration-300',
                  // Hidden only on devices that really hover AND allow motion —
                  // touch and reduced-motion always get the final state.
                  '[@media(hover:hover)_and_(prefers-reduced-motion:no-preference)]:translate-y-1',
                  '[@media(hover:hover)_and_(prefers-reduced-motion:no-preference)]:opacity-0',
                  'group-hover:translate-y-0 group-hover:opacity-100',
                  'group-focus-within:translate-y-0 group-focus-within:opacity-100'
                )}
              >
                <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full bg-accentRed" />
                {item}
              </li>
            ))}
          </ul>

          {service.link ? (
            <Link
              href={service.link.href}
              className="group/portal mt-7 inline-flex items-center font-mono text-[11px] uppercase tracking-widest text-accentRed transition-colors hover:text-primaryText focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed"
            >
              {service.link.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/portal:translate-x-1" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const scope = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !scope.current) return;

      const rows = Array.from(
        scope.current.querySelectorAll<HTMLElement>('[data-service-row]')
      );
      if (rows.length === 0) return;

      const rules = rows
        .map((row) => row.querySelector<HTMLElement>('[data-service-rule]'))
        .filter((rule): rule is HTMLElement => rule !== null);

      const trigger =
        scope.current.querySelector<HTMLElement>('[data-services-list]') ?? scope.current;

      // Rows: fade + 24px rise, 0.7s, 0.1s stagger, once.
      gsap.from(rows, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger, start: 'top 85%', once: true },
      });

      // The hairline above each row draws left to right.
      gsap.from(rules, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger, start: 'top 85%', once: true },
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section
      id="services"
      ref={scope}
      className="relative scroll-mt-[88px] bg-midnight py-28 lg:py-36"
    >
      <div className="ed-container">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left: sticky statement. Unsticks and stacks above the rows below 1024px. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[104px]">
              <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText">
                <span aria-hidden className="h-px w-8 bg-accentRed" />
                — SERVICES
              </p>

              <h2 className="font-heading text-[clamp(2.25rem,5vw,4.5rem)] font-normal leading-[1.06] text-primaryText">
                What we do for your pharmacy.
              </h2>

              <p className="mt-6 max-w-sm font-sans text-lg text-secondaryText">
                Services from our team, alongside the software.
              </p>
            </div>
          </div>

          {/* Right: four ruled service rows. */}
          <div className="lg:col-span-8">
            <div data-services-list>
              {SERVICES.map((service) => (
                <ServiceRow key={service.number} service={service} />
              ))}
            </div>

            <div className="mt-12 border-t border-hairline pt-6">
              <RemoteSupportLink className="group inline-flex items-center gap-2 font-sans text-sm text-secondaryText transition-colors hover:text-primaryText">
                Need help now? Start a remote support session
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </RemoteSupportLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
