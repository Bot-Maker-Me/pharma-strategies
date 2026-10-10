import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider';
import { CursorGlow } from '@/components/effects/cursor-glow';
import { ClickSpark } from '@/components/react-bits';
import { siteConfig } from '@/config/site';

/**
 * Fonts are loaded from Google's CDN with <link> rather than `next/font/google`.
 * `next/font` downloads every face during `next build`, so an unreachable
 * fonts.gstatic.com fails the whole deploy — the families are identical here, they just
 * resolve in the browser instead. `--font-display` / `--font-body` / `--font-mono` are
 * declared in `globals.css` and consumed by `tailwind.config.ts`.
 */
const FONT_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Manrope:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Controlled Substance Compliance`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'pharmaceutical compliance',
    'narcotics ledger',
    'controlled substances',
    'narcotics tracking',
    'medication administration records',
    'pharmacovigilance',
    'regulatory compliance',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — Controlled Substance Compliance`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_STYLESHEET} />
        <SmoothScrollProvider>
          <CursorGlow />
          <ClickSpark />
          <div className="paper-grain" />
          {/* Every page gets its own opaque background as well as the body, so no
              route can ever fall back to the browser's white default. */}
          <div className="relative flex min-h-screen flex-col bg-midnight text-primaryText">
            <Navbar />
            <main className="flex-1 bg-midnight">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
