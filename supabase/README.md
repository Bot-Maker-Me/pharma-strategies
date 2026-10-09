# Supabase setup

Project: `https://glgstbspabvmvgdvjyyu.supabase.co` (`glgstbspabvmvgdvjyyu`).

**The schema is already applied to that project** — six tables, RLS on all of them,
twenty policies, the `on_auth_user_created` trigger, and the seeded app catalog.
`supabase/migrations/` is the record of how it was built; keep adding migrations there
rather than editing the live schema by hand.

## What exists

| Table | Purpose | Who can touch it |
| --- | --- | --- |
| `users` | Profiles keyed to `auth.users`, `role` = `user` \| `admin` | own row; admins read all; `role` is not client-writable |
| `apps` | Marketplace catalog | public SELECT of active rows; admin-only writes |
| `subscriptions` | User → app subscriptions | own rows; admins read/update/delete |
| `leads` | Contact / demo requests | anonymous INSERT; admin-only read |
| `audit_logs` | Compliance trail | own rows; admins read all; writes are service-role only |
| `site_settings` | Public brand settings (`id = 'default'`) | public SELECT; admin-only writes |

`handle_new_user()` creates a `users` row with `role = 'user'` whenever an Auth account is
created, so signing up never grants privileges.

## Create the first administrator

There is deliberately no way for a browser user to promote themselves.

1. Supabase dashboard → *Authentication* → *Users* → **Add user** — email + password,
   confirm the user. This creates the matching `users` row automatically.
2. Promote it (SQL Editor, or any trusted admin connection):

   ```sql
   update public.users set role = 'admin' where email = 'YOUR-ADMIN-EMAIL';
   ```

3. Sign in at `/admin/login`.

## Credentials

`lib/supabase.ts` reads these. Copy from Supabase → *Project Settings* → *API*.

| Variable | Value | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://glgstbspabvmvgdvjyyu.supabase.co` | inlined into the browser bundle |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | publishable / anon key | browser-safe, RLS applies |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key | **server only** — never `NEXT_PUBLIC_` |

The first two are set in `.env` for local work and still need adding in Vercel →
*Settings → Environment Variables*. The service-role key is optional for today's features:
the lead form's INSERT and the `/go/[slug]` destination lookup are both permitted to the
`anon` role by RLS. Add it when you need server-side admin or audit writes.

## Recreating this elsewhere

Run the migrations in `supabase/migrations/` in timestamp order — either paste them into
the SQL Editor one after another, or link the project and push:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

## Worth revisiting

`apps.external_signup_url` still holds the placeholder `https://app.pharmasuite.com/...`
destinations from the original seed. Every `/go/<slug>` click redirects there, so update
those in the admin dashboard once the real signup URLs exist.
