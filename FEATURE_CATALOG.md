# Feature Catalog

Reusable pieces available in this app. **Check here before building anything new.**
Reuse first — only add a component when nothing below fits.

## Layout
- `DashboardLayout` — components/layout/dashboard-layout.tsx
- `Sidebar` — components/layout/sidebar.tsx
- `AppHeader` — components/layout/app-header.tsx
- `PageContainer` — components/shared/page-container.tsx
- `Navbar` — components/layout/navbar.tsx (marketing chrome)
- `Footer` — components/layout/footer.tsx (marketing chrome)
- `BrandMark` — components/layout/brand-mark.tsx

## Core app
- `SearchBar` — (planned; compose from components/ui/input.tsx)
- `DataTable` — build on components/ui/table.tsx
- `AuthForm` — build on react-hook-form + zod
- `SettingsForm` — build on react-hook-form + zod
- `PolicyPage` — pattern in app/legal/page.tsx
- `EmptyState` — components/shared/empty-state.tsx
- `LoadingState` — components/shared/loading-state.tsx
- `ErrorState` — components/shared/error-state.tsx

## Marketing / polish
- `HeroSection` (Aceternity-style) — components/aceternity/hero-highlight.tsx
- `Spotlight` (Aceternity-style) — components/aceternity/spotlight.tsx
- `SpotlightCard` — components/aceternity/spotlight-card.tsx
- `BentoGrid` / `BentoGridItem` (Magic UI) — components/magicui/bento-grid.tsx
- `ShimmerButton` (Magic UI) — components/magicui/shimmer-button.tsx
- `BlurFade` (Magic UI) — components/magicui/blur-fade.tsx
- `Reveal` — components/shared/reveal.tsx
- `RemoteSupportLink` — components/shared/remote-support-link.tsx — the single remote-support link (opens `REMOTE_SUPPORT_URL` in a new tab, shared aria-label + focus ring). Used by the nav, mobile menu, footer and the Services section.
- `SectionLabel` — components/shared/section-label.tsx
- `SectionHeading` — components/shared/section-heading.tsx — hairline draw + mono eyebrow + masked line-reveal title + optional description
- `ScrollWords` — components/shared/scroll-words.tsx — scrubbed word-by-word text reveal with accent words

## Pharma Strategies sections (home page)
- `Hero` (HeroNew) — components/sections/hero-new.tsx
- `Statement` — components/sections/statement.tsx
- `Services` — components/sections/services.tsx — `id="services"`; sticky left statement + four ruled service rows (scroll reveal, hover/focus chip stagger, remote-support line). Copy lives in `SERVICES` (`src/config/site.ts`)
- `FeatureBentoGrid` — components/sections/feature-bento-grid.tsx
- `Role tabs` (WhoItsFor) — components/sections/who-its-for.tsx
- `NarcoticsLedgerPinned` — components/sections/narcotics-ledger-pinned.tsx
- `Apps showcase` (AppsShowcase) — components/sections/apps-showcase.tsx — three floating app windows sharing one balance line
- `HowItWorksNew` — components/sections/how-it-works-new.tsx
- `PricingNew` — components/sections/pricing-new.tsx
- `FAQ` — components/sections/faq.tsx
- `ClosingBand` — components/sections/closing-band.tsx

## Content config
- `REMOTE_SUPPORT_URL` / `SERVICES` — src/config/site.ts — remote-support URL (placeholder) + all Services copy, edited in one place

## Motion
- `SmoothScrollProvider` — components/providers/smooth-scroll-provider.tsx
- `useLenis` — hooks/use-lenis.ts
- `usePrefersReducedMotion` — hooks/use-prefers-reduced-motion.ts
- `FadeInOnScroll` — components/motion/fade-in-on-scroll.tsx
- `StaggerReveal` — components/motion/stagger-reveal.tsx
- `ParallaxSection` — components/motion/parallax-section.tsx
- `SplitText` (React Bits) — components/react-bits/split-text.tsx — chars / words / **lines** (masked slide-up) + `highlight` word with an outline → filled-red wipe
- `ShinyText` (React Bits) — components/react-bits/shiny-text.tsx
- `StarBorder` (React Bits) — components/react-bits/star-border.tsx
- `Squares` (React Bits) — components/react-bits/squares.tsx
- `ClickSpark` (React Bits) — components/react-bits/click-spark.tsx
- `Magnet` (React Bits) — components/react-bits/magnet.tsx — pulls content toward the cursor (auto-off on touch + reduced motion)
- `Silk` (React Bits) — components/react-bits/silk.tsx — WebGL flow-field hero background (needs `ogl`); import the **default** export lazily, it is intentionally NOT re-exported from the barrel
- `CursorGlow` — components/effects/cursor-glow.tsx

## shadcn/ui primitives (do NOT hand-edit)
components/ui/* — button, card, dialog, sheet, table, tabs, form, input, select, badge,
dropdown-menu, tooltip, sonner/toast, and more.

## Demos / references
- app/dashboard/page.tsx — shows DashboardLayout + states + Magic UI + Aceternity pieces in use.

Update this file whenever a reusable component is added.
