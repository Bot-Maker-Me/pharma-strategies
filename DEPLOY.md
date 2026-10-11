# Deploying on Vercel

The app builds and runs with **zero environment variables**. Adding Supabase turns on
live app data, lead capture and `/admin`; without it those features degrade gracefully
(bundled content, a readable error on the lead form, an "Admin is offline" notice).

## Dashboard setup (once)

1. **Connect the repo** — Vercel → project → *Settings → Git* → Connect Git Repository →
   `Bot-Maker-Me/pharma-strategies`. The repo is private, so grant Vercel access to it.
2. **Production Branch: `main`.** Vercel's "push to the main branch" hint only applies to
   the branch configured here.
3. **Root Directory: leave empty (repo root).** A legacy duplicate Next.js app lives in
   `project/`; it is untracked and excluded in `tsconfig.json`. Never point the Root
   Directory at it.
4. **Node.js Version: 24.x** (*Settings → General*). This matches `engines.node` in
   `package.json`. Vercel discontinued Node 20, so a `20.x` pin now fails the build
   immediately with *"Node.js Version \"20.x\" is discontinued and must be upgraded"*.
5. **Environment Variables** (*Settings → Environment Variables*, all environments):

   | Key | Required | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | for data | public, inlined at build time |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | for data | public, inlined at build time |
   | `SUPABASE_SERVICE_ROLE_KEY` | for server routes | never `NEXT_PUBLIC_`-prefixed |
   | `NEXT_PUBLIC_APP_URL` | recommended | e.g. `https://<project>.vercel.app` |
   | `RESEND_API_KEY` | optional | email notification on new leads |
   | `LEAD_NOTIFICATION_EMAIL` | optional | recipient for that notification |

6. **Deploy.** Push to `main`, or hit *Deployments → Redeploy*.

## Why the earlier deployment never appeared

`lib/supabase.ts` used to create its client at module scope, and `createClient('')`
throws `supabaseUrl is required.`. On a host without env vars, importing that module
failed — and since `/apps` is statically generated, the production build died before a
deployment could exist. Clients are now lazy and guarded by `isSupabaseConfigured`, so
nothing env-dependent runs at import time.

## Supabase

The schema is already applied to `glgstbspabvmvgdvjyyu` (tables, RLS, policies, the
signup trigger and the seeded app catalog). `supabase/migrations/` is the record of how it
was built — add new migrations there and push them with
`npx supabase link --project-ref glgstbspabvmvgdvjyyu` then `npx supabase db push`.

`supabase/README.md` has the full walkthrough, including how to create the first
administrator — the browser can never promote itself.

`SUPABASE_SERVICE_ROLE_KEY` is optional for the features that exist today: the lead form's
INSERT and the `/go/[slug]` destination lookup are both permitted to the `anon` role by
RLS. Add it when you need server-side admin or audit writes.

## Fonts

Do not reintroduce `next/font/google`: it downloads each face during `next build`, and an
unreachable `fonts.gstatic.com` fails the entire deployment (this is what broke the first
Vercel build). The three families are loaded with a `<link>` in `app/layout.tsx` and
declared as `--font-display` / `--font-body` / `--font-mono` in `globals.css`. To remove
the third-party request entirely, self-host with `@fontsource/*` or `next/font/local` and
committed woff2 files.

## Package manager

The repo contains a `pnpm-workspace.yaml` (tool-generated for local build approvals)
next to the real `package-lock.json`. `vercel.json` pins `installCommand: "npm install"`
so Vercel uses npm and the lockfile instead of guessing pnpm with no `pnpm-lock.yaml`.

## Optional cleanup

`@netlify/plugin-nextjs` in `dependencies` is a leftover from an earlier Netlify attempt
and is not imported anywhere. Removing it needs a lockfile refresh (`npm install`) and is
not required for deployment.
