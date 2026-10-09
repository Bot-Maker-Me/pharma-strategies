import { AppsGrid } from '@/components/sections/apps-grid';
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
  return <main><div className="mx-auto max-w-7xl px-4 pb-4 pt-16 text-center sm:px-6 lg:px-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentRed">Pharma Strategies marketplace</p><h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-primaryText sm:text-5xl">Compliance tools for regulated teams</h1></div><AppsGrid apps={apps} /></main>;
}
