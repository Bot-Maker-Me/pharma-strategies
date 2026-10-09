/**
 * Canonical site URL. Prefers NEXT_PUBLIC_APP_URL so preview deployments point
 * at themselves, and always falls back to a valid absolute URL because
 * `metadataBase` and the sitemap call `new URL()` on this value during build.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!raw) return 'https://pharmastrategies.com';
  try {
    return new URL(raw).origin;
  } catch {
    return 'https://pharmastrategies.com';
  }
}

export const siteConfig = {
  name: 'Pharma Strategies',
  description:
    'A focused compliance marketplace for pharmaceutical and care operations teams.',
  url: resolveSiteUrl(),
  logo: '/logo.svg',
  links: {
    twitter: 'https://twitter.com/pharmasuite',
    linkedin: 'https://linkedin.com/company/pharmasuite',
    github: 'https://github.com/pharmasuite',
  },
  nav: [
    { label: 'Apps', href: '/apps' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ],
  footer: {
    sections: [
      {
        title: 'Apps',
        links: [
          { label: 'Narcotics Ledger', href: '/apps/narcotics-ledger' },
          { label: 'Nursing Home', href: '/apps/nursing-home' },
          { label: 'Pharma Portal', href: '/apps/pharma-portal' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Legal & Privacy', href: '/legal' },
        ],
      },
    ],
  },
};
