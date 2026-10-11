'use client';

import { useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, Menu, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';
import { useLenis } from '@/hooks/use-lenis';
import { RemoteSupportLink } from '@/components/shared/remote-support-link';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ctaClass =
    'rounded-button bg-accentRed px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-midnight transition-colors hover:bg-accentRedBright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed';

  // Cream outlined counterpart to the red CTA — deliberately quieter.
  const remoteSupportClass =
    'group inline-flex items-center gap-2 rounded-[2px] border border-[rgba(237,230,218,0.4)] px-4 py-2 font-mono text-[12px] uppercase tracking-widest text-primaryText/80 transition-colors hover:border-[#EDE6DA] hover:text-primaryText';

  // Smooth-scroll to the Services section via the shared Lenis instance, and
  // fall back to the native anchor jump (offset handled by the section's
  // `scroll-mt`) when smooth scrolling is disabled.
  const handleServicesClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    const target = document.getElementById('services');
    if (!target) return;
    if (lenis) {
      event.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'glass-blur border-b border-hairline' : 'border-b border-transparent'
      )}
    >
      <nav className="ed-container flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="font-heading text-[1.4rem] font-normal leading-none tracking-[-0.01em] text-primaryText"
        >
          Pharma Strategies
        </Link>

        <div className="hidden items-center gap-8 min-[1120px]:flex">
          <a
            href="#services"
            onClick={handleServicesClick}
            className="font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:text-primaryText"
          >
            Services
          </a>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:text-primaryText"
            >
              {item.label}
            </Link>
          ))}
          <RemoteSupportLink className={remoteSupportClass}>
            <Headset className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            Remote support
          </RemoteSupportLink>
          <Link href="/contact" className={ctaClass}>
            Book a demo
          </Link>
        </div>

        <button
          className="p-2 text-primaryText min-[1120px]:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: DESIGN_EASE_ARRAY }}
            className="overflow-hidden border-t border-hairline bg-midnight/95 backdrop-blur-xl min-[1120px]:hidden"
          >
            <div className="ed-container flex flex-col gap-5 py-6">
              <RemoteSupportLink className="group inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-[rgba(237,230,218,0.4)] px-4 py-3 font-mono text-[12px] uppercase tracking-widest text-primaryText/80 transition-colors hover:border-[#EDE6DA] hover:text-primaryText">
                <Headset className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                Remote support
              </RemoteSupportLink>
              <a
                href="#services"
                onClick={handleServicesClick}
                className="font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:text-primaryText"
              >
                Services
              </a>
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:text-primaryText"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={cn(ctaClass, 'self-start')}
              >
                Book a demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
