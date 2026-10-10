import { PageHero } from '@/components/layout/page-hero';
import { AppsGrid } from '@/components/sections/apps-grid';
import { CtaBand } from '@/components/sections/cta-band';
import { apps as fallbackApps, type AppCategory } from '@/config/apps';
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase';

export const metadata = { title: 'Apps' };

// Static with a refresh window, and safe to build without Supabase credentials.
export const revalidate = 300;

type AppRow = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[] | null;
  category: AppCategory;
  is_active: boolean;
};

async function fetchApps(): Promise<AppRow[]> {
  const { data } = await createSupabaseServerClient().from('apps').select('slug, name, tagline, description, features, category, is_active').eq('is_active', true).order('created_at');
  return data ?? [];
}

/**
 * The bundled content is the fallback for every failure mode — no credentials, a
 * bad URL, or a request that never answers. The timeout matters at build time:
 * this page is generated statically, so an unanswered fetch would hang the deploy.
 */
async function loadApps() {
  if (!isSupabaseConfigured) return fallbackApps;

  try {
    const rows = await Promise.race([
      fetchApps(),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('apps request timed out')), 5000)),
    ]);

    if (!rows.length) return fallbackApps;

    return rows.map((app) => ({ slug: app.slug, name: app.name, tagline: app.tagline, description: app.description, features: app.features ?? [], category: app.category, isActive: app.is_active, icon: fallbackApps.find((fallback) => fallback.slug === app.slug)?.icon ?? 'LayoutDashboard', popular: app.slug === 'narcotics-ledger' }));
  } catch {
    return fallbackApps;
  }
}

export default async function AppsPage() {
  const apps = await loadApps();

  return (
    <>
      <PageHero
        eyebrow="§ 06 — Apps"
        title="Compliance tools for regulated teams"
        lead="Choose only the tools your operation needs. Every workspace reads and writes the same controlled-substance register."
        meta={[
          { label: 'Apps live', value: String(apps.length) },
          { label: 'Shared ledger', value: 'One register, every view' },
          { label: 'Access', value: 'Set by role' },
        ]}
      />

      <AppsGrid apps={apps} />

      <CtaBand
        eyebrow="§ 06.1 — Next step"
        title="Which app does your operation actually need?"
        description="Ten minutes on the phone usually settles it."
        secondaryHref="/pricing"
        secondaryLabel="See pricing"
      />
    </>
  );
}
