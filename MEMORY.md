# Project Memory (Retention Log)

## Stack
- Next.js 13 (App Router) + React 18 + TypeScript
- UI: shadcn + Magic UI + Aceternity-style + OpenDesign DESIGN.md
- Style: Tailwind only
- Motion: Framer Motion (GSAP + Lenis already power scroll in this app)
- Data: Supabase client (`lib/supabase.ts`), Prisma schema (`prisma/schema.prisma`), route handlers under `app/api/`
- Quality bar: production SaaS, anti-slop

## Architecture decisions
- 2026-10-09: Hoisted the Next.js app out of the `project/` submodule to the repository root, because the dev server runs from the app root. `project/` is left in place as the original submodule.
- 2026-10-09: Established a governance + design-system layer at the repo root: AI_RULES.md, AGENTS.md, DESIGN.md, FEATURE_CATALOG.md, MEMORY.md, security.md, Code-Style.md, database.md, API-guide.md.

## Lessons learned
- (append)

## Security notes
- Never commit `.env` (ignored). Only `.env.example` is tracked.
- (append)

## Graphify / knowledge graph
- Run Graphify when available to build a persistent codebase graph.
- Prefer graph queries over re-reading the whole repo before large refactors.
- Setup commands:
  ```sh
  uv tool install graphifyy
  graphify install
  graphify .
  ```
- Graphify was NOT executed here (this environment has no shell access). Run the commands above locally, then append the generated graph summary below.

## Motion stack
- Lenis smooth scroll: provider at `components/providers/smooth-scroll-provider.tsx`; instance exposed via `hooks/use-lenis.ts`. Driven by the GSAP ticker (single rAF loop). No `scrollerProxy` needed — Lenis scrolls the native window, so ScrollTrigger's default scroller works.
- GSAP: central registration in `lib/gsap.ts` (ScrollTrigger registered once). Helpers in `components/motion/` — `FadeInOnScroll`, `StaggerReveal`, `ParallaxSection` (all use `useGSAP` for automatic cleanup).
- React Bits: copy-paste distribution (no npm package). Added at `components/react-bits/` — `SplitText`, `ShinyText`, `StarBorder`, `Squares`, `Magnet`, `Silk`; barrel export in `components/react-bits/index.ts` (`Silk` is deliberately excluded so its OGL/WebGL bundle stays lazy).
- `SplitText` (lines mode) uses the now-free GSAP `SplitText` plugin (`type: 'lines'`, `mask: 'lines'`, `autoSplit`). Its rendered tree is intentionally independent of `prefers-reduced-motion` and all animated state lives in `split-lines*` CSS classes toggled by GSAP — this stops React re-renders from clobbering the DOM that SplitText restructures.
- `lib/gsap.ts` also registers `SplitText` + `CustomEase` and exposes `DESIGN_EASE` (id `design` = cubic-bezier(0.22, 1, 0.36, 1)) and `DESIGN_EASE_ARRAY` for Framer Motion.
- Dependencies: `lenis`, `gsap`, `@gsap/react`, `framer-motion` were already in package.json. Added `ogl` (v1) for the React Bits `Silk` WebGL background.

## Session log
- 2026-10-09: Setup complete — governance files created, shadcn registries (Magic UI + Aceternity) configured, reusable Magic UI / Aceternity-style components and base shells added, app hoisted to the repo root.
- 2026-10-09: Motion stack added — refactored the Lenis provider (dropped redundant `scrollerProxy`, added reactive reduced-motion handling and anchor offset), added `lib/gsap.ts`, three GSAP motion helpers, four React Bits components, and demos on the home page and `/dashboard`.
- 2026-10-09: Layout + performance pass — fixed the stacked/overlapping captions in `narcotics-ledger-pinned`, rebuilt `apps-horizontal` as a measured sticky horizontal scroller, removed per-`mousemove` React state from the hero and bento grid (now rAF/CSS-variable driven), corrected section numbering (§05–§09), and added global cursor effects (`CursorGlow`, `ClickSpark`).
- 2026-10-09: Hero motion pass (DESIGN.md) — installed `ogl` and added React Bits `Silk` (lazy, in-view, tinted midnight/blue/faint-red with a static gradient fallback for reduced motion / <768px / no WebGL) and `Magnet`; upgraded `SplitText` for masked line reveals + a `highlight` outline→fill-red wipe. Rebuilt the hero: SplitText H1, magnetised buttons, spring-tilted ledger with a cursor sheen, per-row write-in + VERIFIED stamp press, drifting chips with pointer depth, and a GSAP ScrollTrigger scrub (headline scale/opacity, ledger -80px). Everything respects reduced motion and animates transform/opacity only. Not verified visually — no shell/visual access here.

- 2026-10-09: Density + reveal pass — added `components/shared/scroll-words.tsx` (GSAP ScrollTrigger scrub, per-word opacity/y reveal, `accent` words in red, reduced-motion safe) and `components/shared/section-heading.tsx` (drawing hairline + mono eyebrow + masked `SplitText` line reveal + optional right-hand description, `size="compact"` variant). Rebuilt `§ 02 Statement` on `ScrollWords` with a scroll-drawn accent rule, sub-copy and three principles; rebuilt the marquee strip as a seamless two-row Magic UI `Marquee` (reversed second row); gave §03/§04/§05/§06/§07/§08/§09 real headings; enriched `§ 04 Who it's for` (role-view chrome, ticked benefits, "Granted" access tags, three-cell shared-foundation strip); made `§ 05 Narcotics ledger` step-aware (per-step nav target, detail lists that brighten in sequence, register/header/signature ring highlights, VERIFIED stamp presses only on step 03, `01 / 03` counter) and switched its register to an explicit `grid-cols-[3rem_minmax(0,1fr)_2.75rem_2.75rem_2.75rem]` template so drug names can no longer collide with the numbers.

- 2026-10-09: High-fidelity visual pass — moved the palette to the refined medical-tech spec (`midnight #0B1220` / `raisedDark #111827` / `hairline #24314B` / cream `#F5F0E8` / copy `#9AA7BD` / `accentRed #C23B3B` + `accentRedBright #E04A4A`), swapped the type stack to Playfair Display (`--font-display`) + Manrope (`--font-body`) + IBM Plex Mono (`--font-mono`, all semantic variable names), added layered `boxShadow` tokens, and rebuilt the surface system in `globals.css`: `.ed-container` (1360px, clamp(20px,5vw,80px) gutters, now used by every home band, the navbar, the footer and `PageContainer`), a deeper `.glass-panel` (inner highlight + navy inner glow + far shadow), new `.panel-lift` / `.paper-sheet`, softer film grain, navy scrollbar, and `::selection`. Section rhythm standardised to `py-28 lg:py-36` and every section label now carries the `h-px w-8 bg-accentRed` rule. Replaced the pinned horizontal `apps-horizontal` with `apps-showcase` (three floating app windows that all render the same "Shared balance · Oxycodone 5mg · 18" line), turned the roles "Granted" tags into a real 5-row permissions checklist, gave pricing aligned feature rows with the CTA pinned to the card floor, indexed the FAQ rows with circular toggles, and wired the final CTA form to `POST /api/leads` with idle / submitting / sent / error states.

- 2026-10-09: Numbers + paired text reveal — `SplitText` (lines mode) gained `blurChars`, which splits `lines,chars` and pairs the masked line slide with a per-character `blur(12px) → 0` resolve in the same GSAP timeline (one ScrollTrigger, `onComplete` still drives the accent wipe). Enabled on `SectionHeading` (default size only), the hero H1 and the closing headline. Magic UI `NumberTicker` now drives the hero "Counted today" badge, the three hero register readouts and the three pricing prices. The hero top band was empty on tall viewports, so it is now a framed three-part column: a **live-register masthead** (pulsing red dot, three recent register entries with a mask fade, a "Scroll" cue), the copy + register grid, and a **register readout rail** (Entries today 128 / Substances on file 24 / Signature pairs 48). Hero stage reduced to 460px with chips repositioned inside it, `justify-between` so the band fills the viewport without overflowing. Standalone absolute scroll hint removed (the masthead carries it).

- 2026-10-09: Vercel deploy fix — `lib/supabase.ts` no longer calls `createClient` at module scope (it throws `supabaseUrl is required.` when credentials are absent, which broke every build on a host without env vars). Clients are now created lazily + cached behind `isSupabaseConfigured`, so importing the module is always safe. `/apps` falls back to `config/apps.ts` content (now `revalidate = 300`), `POST /api/leads` returns a 503 instead of crashing, `/go/[slug]` redirects relative to `request.url` (no more localhost fallback) and `/admin` renders an "Admin is offline" notice when unconfigured. Added `vercel.json` (framework `nextjs`, `installCommand: npm install` — pins npm because the repo also carries `pnpm-workspace.yaml`), rewrote `.env.example` to the real variable set, and `config/site.ts` now validates `NEXT_PUBLIC_APP_URL` (falling back to the production domain) so `metadataBase`/sitemap `new URL()` can never throw. The legacy `project/` duplicate app is untracked and already excluded in `tsconfig.json` — do not re-add it.

## Motion caveats
- Smooth scroll fully disables itself when `prefers-reduced-motion: reduce` is set.
- Scrollable overlays (modals/drawers) should opt out of Lenis with `data-lenis-prevent`; use `useLenis()` to `stop()`/`start()` if needed.
- `Squares` canvas renders a single static frame under reduced motion.
- The hero `Silk` background only mounts when the section is in view AND width ≥ 768px AND WebGL is available AND motion is allowed; otherwise it falls back to a static radial gradient (`radial-gradient` on `#0B1220`).
- `SplitText` in `lines` mode renders its final state (no split, accent already filled red) under reduced motion.
