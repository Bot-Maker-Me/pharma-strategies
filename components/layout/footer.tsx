import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { REMOTE_SUPPORT_URL } from '@/src/config/site';
import { RemoteSupportLink } from '@/components/shared/remote-support-link';

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'The register', href: '/platform' },
      { label: 'Apps', href: '/apps' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Services', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Resources', href: '/resources' },
      { label: 'Contact', href: '/contact' },
      { label: 'Remote support', href: REMOTE_SUPPORT_URL, external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Legal & privacy', href: '/legal' },
      { label: 'Admin sign in', href: '/admin/login' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-midnight">
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 opacity-20"
      />

      <div className="ed-container relative py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-heading text-2xl font-normal leading-none tracking-[-0.01em] text-primaryText"
            >
              Pharma Strategies
            </Link>
            <p className="mt-5 max-w-xs font-sans text-sm text-secondaryText">
              A controlled-substance register with dual signatures, discrepancy alerts and an audit
              trail you can hand over.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-secondaryText/70">
              Built for pharmacies, nursing homes and care facilities
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-widest text-secondaryText">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <RemoteSupportLink className="font-sans text-sm text-secondaryText transition-colors hover:text-primaryText">
                          {link.label}
                        </RemoteSupportLink>
                      ) : link.href.startsWith('#') ? (
                        <a
                          href={link.href}
                          className="font-sans text-sm text-secondaryText transition-colors hover:text-primaryText"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-sans text-sm text-secondaryText transition-colors hover:text-primaryText"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText/60">
            &copy; 2026 {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText/60">
            Every entry signed · every count reconciled
          </p>
        </div>
      </div>
    </footer>
  );
}
