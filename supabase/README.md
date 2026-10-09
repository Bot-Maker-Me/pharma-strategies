# Supabase setup

The project at `https://glgstbspabvmvgdvjyyu.supabase.co` is empty — it has no tables
yet. The application expects six tables, RLS policies, an Auth trigger and a seeded app
catalog. Everything needed is in this folder.

## 1. Apply the schema

**Easiest — one paste:** open the Supabase dashboard → *SQL Editor* → *New query*, paste
all of `supabase/setup.sql`, and run it. That file is the six migrations in
`supabase/migrations/` concatenated in order; it is idempotent, so re-running it is safe.

**Repeatable — Supabase CLI:**

```bash
npx supabase login
npx supabase link --project-ref glgstbspabvmvgdvjyyu
npx supabase db push
```

Prefer the CLI once you start adding migrations — it keeps `supabase/migrations/` as the
single source of truth. `supabase/setup.sql` is a convenience copy; if you add a
migration, re-generate it by concatenating the files in timestamp order.

## 2. What gets created

| Table | Purpose |
| --- | --- |
| `users` | Profiles keyed to `auth.users`, with `role` (`user` \| `admin`) |
| `apps` | Marketplace catalog — publicly readable while `is_active` |
| `subscriptions` | User → app subscriptions |
| `leads` | Contact / demo requests (anonymous INSERT, admin read) |
| `audit_logs` | Compliance trail, service-role writes only |
| `site_settings` | Public brand settings, admin-writable |

Plus: RLS on every table, an `on_auth_user_created` trigger that creates a `users` profile
with `role = 'user'`, and a seed of the three live apps (Narcotics Ledger, Nursing Home,
Pharma Portal).

## 3. Create the first administrator

There is deliberately no way for a browser user to promote themselves.

1. Supabase dashboard → *Authentication* → *Users* → **Add user**. Enter an email and
   password and confirm the user (or invite yourself and set a password). This creates
   the matching `users` row automatically.
2. Promote that profile in the SQL Editor:

   ```sql
   update public.users set role = 'admin' where email = 'YOUR-ADMIN-EMAIL';
   ```

3. Sign in at `/admin/login` with that email and password.

## 4. Credentials

Environment variables are read in `lib/supabase.ts`. Copy the values from
Supabase → *Project Settings* → *API*:

| Variable | Where it comes from | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | `https://glgstbspabvmvgdvjyyu.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` key | browser-safe, RLS applies |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key | **server only** — never `NEXT_PUBLIC_` |

Add them to `.env.local` for local/preview work and to Vercel → *Settings → Environment
Variables* for the deployment. Without them the site still builds and serves bundled
content, lead capture returns "not connected yet", and `/admin` shows an offline notice.
