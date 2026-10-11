/**
 * Site content that is edited in one place.
 *
 * The marketing site's nav/footer config lives in `config/site.ts`. This module
 * holds the newer Services + remote-support content only, so both can be edited
 * without touching the other.
 */

/**
 * Remote support session link.
 * TODO: replace with the real remote-support URL before launch.
 */
export const REMOTE_SUPPORT_URL = 'https://example.com/remote-support';

export interface ServiceLink {
  label: string;
  href: string;
}

export interface Service {
  /** Mono index shown beside the row, e.g. "01". */
  number: string;
  title: string;
  description: string;
  items: string[];
  /** Optional action link, rendered on this row only. */
  link?: ServiceLink;
}

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'Remote Prescription Processing',
    description: 'Our team handles prescription processing for your pharmacy, remotely.',
    items: ['Live data entry and adjudication', 'Batch processing', 'Auto-refill program'],
  },
  {
    number: '02',
    title: 'Audit Protection',
    description:
      'We review your records and claims so problems are found before an auditor finds them.',
    items: ['Review discounting', 'LU codes', 'FOD forms generation', 'Early refill and short fill review'],
  },
  {
    number: '03',
    title: 'Consulting',
    description:
      'Hands-on help setting up and tightening the programs that keep your pharmacy compliant.',
    items: ['Virtual inventory setup', 'Narcotic reconciliation program', 'Compliance pack optimization program'],
  },
  {
    number: '04',
    title: 'Customized Pharmacy Portals',
    description:
      'We look at how your practice runs and recommend changes, then build apps and tools that streamline communication and resources.',
    items: ['Practice review and recommendations', 'Custom apps and tools', 'Communication and resource workflows'],
    // Same app link the apps listing uses ("Open app" → /go/[slug]).
    link: { label: 'See Pharma Portal', href: '/go/pharma-portal' },
  },
];
