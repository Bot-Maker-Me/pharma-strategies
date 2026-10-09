'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, LayoutDashboard, Loader2, LogOut, MessageSquare, Plus, Save, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase';

interface AdminApp {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  category: string;
  price_monthly: number | null;
  price_yearly: number | null;
  external_signup_url: string | null;
  is_active: boolean;
}

interface SubscriptionRow {
  id: string;
  plan: string;
  status: string;
  user: { name: string; email: string } | null;
  app: { name: string } | null;
}

function AdminNotConfigured() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="glass-panel w-full max-w-md rounded-panel p-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accentRed">
          Not configured
        </p>
        <h1 className="mt-3 font-heading text-2xl text-primaryText">Admin is offline</h1>
        <p className="mt-3 text-sm leading-relaxed text-secondaryText">
          This deployment has no Supabase credentials, so the dashboard cannot load.
          Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and
          SUPABASE_SERVICE_ROLE_KEY to the environment and redeploy.
        </p>
      </div>
    </main>
  );
}

const emptyApp: Omit<AdminApp, 'id'> = {
  slug: '',
  name: '',
  tagline: '',
  description: '',
  features: [],
  category: 'Compliance',
  price_monthly: null,
  price_yearly: null,
  external_signup_url: null,
  is_active: true,
};

function priceValue(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export default function AdminPage() {
  // isSupabaseConfigured is inlined at build time, so this branch never changes
  // between renders. Checking it before the hooks keeps a deployment without
  // credentials from throwing inside the Supabase client.
  if (!isSupabaseConfigured) return <AdminNotConfigured />;

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [apps, setApps] = useState<AdminApp[]>([]);
  const [selected, setSelected] = useState<AdminApp | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<AdminApp, 'id'>>(emptyApp);
  const [subscriptions, setSubscriptions] = useState<SubscriptionRow[]>([]);
  const [counts, setCounts] = useState({ users: 0, subscriptions: 0, leads: 0 });
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace('/admin/login'); return; }
      const { data: profile } = await supabase.from('users').select('role').eq('id', session.user.id).maybeSingle();
      if (profile?.role !== 'admin') { await supabase.auth.signOut(); router.replace('/admin/login'); return; }
      setAuthorized(true);
      const [appResult, subscriptionResult, userCount, subscriptionCount, leadCount, settings] = await Promise.all([
        supabase.from('apps').select('id, slug, name, tagline, description, features, category, price_monthly, price_yearly, external_signup_url, is_active').order('name'),
        supabase.from('subscriptions').select('id, plan, status, user:users(name, email), app:apps(name)').order('created_at', { ascending: false }).limit(50),
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('site_settings').select('logo_url').eq('id', 'default').maybeSingle(),
      ]);
      const loadedApps = (appResult.data as AdminApp[]) || [];
      setApps(loadedApps);
      setSelected(loadedApps[0] || null);
      setSubscriptions((subscriptionResult.data as unknown as SubscriptionRow[]) || []);
      setCounts({ users: userCount.count || 0, subscriptions: subscriptionCount.count || 0, leads: leadCount.count || 0 });
      setLogoUrl(settings.data?.logo_url || '');
      setLoading(false);
    }
    load();
  }, [router, supabase]);

  function startCreate() {
    setMessage('');
    setCreating(true);
    setSelected(null);
    setDraft({ ...emptyApp });
  }

  function selectApp(app: AdminApp) {
    setMessage('');
    setCreating(false);
    setSelected(app);
  }

  async function saveApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setMessage('');
    const { error } = await supabase.from('apps').update({
      name: selected.name,
      tagline: selected.tagline,
      description: selected.description,
      features: selected.features,
      category: selected.category,
      price_monthly: selected.price_monthly,
      price_yearly: selected.price_yearly,
      external_signup_url: selected.external_signup_url,
      is_active: selected.is_active,
      updated_at: new Date().toISOString(),
    }).eq('id', selected.id);
    setMessage(error ? 'Could not save this app.' : 'App settings saved.');
    if (!error) setApps((current) => current.map((app) => app.id === selected.id ? selected : app));
  }

  async function createApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const slug = draft.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    if (!slug || !draft.name.trim() || !draft.tagline.trim() || !draft.description.trim()) {
      setMessage('Add a slug, name, tagline, and description before publishing.');
      return;
    }
    setMessage('');
    const { data, error } = await supabase.from('apps').insert({
      slug,
      name: draft.name.trim(),
      tagline: draft.tagline.trim(),
      description: draft.description.trim(),
      features: draft.features,
      category: draft.category.trim() || 'Compliance',
      price_monthly: draft.price_monthly,
      price_yearly: draft.price_yearly,
      external_signup_url: draft.external_signup_url?.trim() || null,
      is_active: draft.is_active,
    }).select('id, slug, name, tagline, description, features, category, price_monthly, price_yearly, external_signup_url, is_active').maybeSingle();
    if (error || !data) {
      setMessage(error?.code === '23505' ? 'That slug is already in use. Choose another one.' : 'Could not create this app.');
      return;
    }
    const created = data as AdminApp;
    setApps((current) => [...current, created].sort((a, b) => a.name.localeCompare(b.name)));
    setSelected(created);
    setCreating(false);
    setMessage('New app card created.');
  }

  async function saveLogo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { error } = await supabase.from('site_settings').update({ logo_url: logoUrl || null, updated_at: new Date().toISOString() }).eq('id', 'default');
    setMessage(error ? 'Could not save the logo.' : 'Logo settings saved.');
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  if (loading || !authorized) return <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accentRed" /></main>;

  const editorApp = creating ? draft : selected;
  const updateEditor = (changes: Partial<Omit<AdminApp, 'id'>>) => {
    if (creating) setDraft((current) => ({ ...current, ...changes }));
    else setSelected((current) => current ? { ...current, ...changes } : current);
  };

  return <main className="min-h-[calc(100vh-4rem)] bg-midnight px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentRed">Protected workspace</p><h1 className="mt-2 font-heading text-4xl font-bold text-primaryText">Admin dashboard</h1><p className="mt-2 text-secondaryText">Manage public app content, pricing, destinations, branding, and operational visibility.</p></div><Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button></div>{message && <p className="mt-6 rounded-xl bg-accentRed/10 px-4 py-3 text-sm text-accentRed">{message}</p>}<div className="mt-8 grid gap-4 sm:grid-cols-3">{[{ Icon: Users, label: 'Users', value: counts.users }, { Icon: CreditCard, label: 'Subscriptions', value: counts.subscriptions }, { Icon: MessageSquare, label: 'Inquiries', value: counts.leads }].map(({ Icon, label, value }) => <div key={label} className="rounded-2xl border border-hairline bg-raisedDark p-5 shadow-soft"><Icon className="h-5 w-5 text-accentRed" /><p className="mt-4 text-sm text-secondaryText">{label}</p><p className="mt-1 font-heading text-3xl font-bold text-primaryText">{value}</p></div>)}</div><div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]"><aside className="rounded-2xl border border-hairline bg-raisedDark p-4 shadow-soft"><div className="flex items-center justify-between px-2"><h2 className="font-heading font-semibold text-primaryText">Apps</h2><Button type="button" variant="outline" size="icon" onClick={startCreate} aria-label="Create a new app"><Plus className="h-4 w-4" /></Button></div><div className="mt-3 space-y-1">{apps.map((app) => <button key={app.id} onClick={() => selectApp(app)} className={`w-full rounded-lg px-3 py-3 text-left text-sm ${selected?.id === app.id && !creating ? 'bg-accentRed/10 font-semibold text-accentRed' : 'text-secondaryText hover:bg-raisedDark'}`}>{app.name}<span className="mt-1 block text-xs text-secondaryText/70">{app.is_active ? 'Visible' : 'Hidden'}</span></button>)}</div></aside><section className="space-y-8"><form onSubmit={creating ? createApp : saveApp} className="rounded-2xl border border-hairline bg-raisedDark p-6 shadow-soft sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="font-heading text-xl font-semibold text-primaryText">{creating ? 'Create an app card' : 'App settings'}</h2><p className="mt-1 text-sm text-secondaryText">Add the card details and the destination customers should open.</p></div><Button type="submit" className="bg-accentRed text-primaryText hover:bg-accentRedBright">{creating ? <><Plus className="mr-2 h-4 w-4" />Create card</> : <><Save className="mr-2 h-4 w-4" />Save changes</>}</Button></div>{editorApp && <div className="mt-6 grid gap-4 sm:grid-cols-2">{creating && <div className="space-y-2"><Label htmlFor="app-slug">URL slug</Label><Input id="app-slug" placeholder="cold-chain-monitoring" value={editorApp.slug} onChange={(e) => updateEditor({ slug: e.target.value })} required /><p className="text-xs text-secondaryText">Used in the public link for this card.</p></div>}<div className="space-y-2"><Label htmlFor="app-name">Name</Label><Input id="app-name" value={editorApp.name} onChange={(e) => updateEditor({ name: e.target.value })} required /></div><div className="space-y-2"><Label htmlFor="app-tagline">Tagline</Label><Input id="app-tagline" value={editorApp.tagline} onChange={(e) => updateEditor({ tagline: e.target.value })} required /></div><div className="space-y-2"><Label htmlFor="app-category">Category</Label><Input id="app-category" value={editorApp.category} onChange={(e) => updateEditor({ category: e.target.value })} /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="app-description">Description</Label><Textarea id="app-description" rows={4} value={editorApp.description} onChange={(e) => updateEditor({ description: e.target.value })} required /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="app-features">Features</Label><Textarea id="app-features" rows={3} placeholder="One feature per line" value={editorApp.features.join('\n')} onChange={(e) => updateEditor({ features: e.target.value.split('\n').map((feature) => feature.trim()).filter(Boolean) })} /></div><div className="space-y-2"><Label htmlFor="app-monthly">Monthly price</Label><Input id="app-monthly" type="number" min="0" value={editorApp.price_monthly ?? ''} onChange={(e) => updateEditor({ price_monthly: priceValue(e.target.value) })} /></div><div className="space-y-2"><Label htmlFor="app-yearly">Yearly price</Label><Input id="app-yearly" type="number" min="0" value={editorApp.price_yearly ?? ''} onChange={(e) => updateEditor({ price_yearly: priceValue(e.target.value) })} /></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="app-destination">Destination link</Label><Input id="app-destination" type="url" placeholder="https://your-app.example.com" value={editorApp.external_signup_url ?? ''} onChange={(e) => updateEditor({ external_signup_url: e.target.value })} /><p className="text-xs text-secondaryText">Visitors open this link when they select the card.</p></div><label className="flex items-center gap-3 text-sm text-secondaryText sm:col-span-2"><input type="checkbox" checked={editorApp.is_active} onChange={(e) => updateEditor({ is_active: e.target.checked })} className="h-4 w-4 accent-accentRed" />Show this app publicly</label></div>}</form><form onSubmit={saveLogo} className="rounded-2xl border border-hairline bg-raisedDark p-6 shadow-soft"><h2 className="font-heading text-xl font-semibold text-primaryText">Branding</h2><p className="mt-1 text-sm text-secondaryText">Use a trusted HTTPS image URL or leave blank for the default mark.</p><div className="mt-4 flex gap-3"><Input type="url" placeholder="https://..." value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} /><Button type="submit" variant="outline">Save logo</Button></div></form><div className="rounded-2xl border border-hairline bg-raisedDark p-6 shadow-soft"><h2 className="font-heading text-xl font-semibold text-primaryText">Recent subscriptions</h2><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="border-b border-hairline text-secondaryText"><tr><th className="py-3 pr-4">User</th><th className="py-3 pr-4">App</th><th className="py-3 pr-4">Plan</th><th className="py-3">Status</th></tr></thead><tbody>{subscriptions.map((subscription) => <tr key={subscription.id} className="border-b border-hairline"><td className="py-3 pr-4 text-secondaryText">{subscription.user?.name || subscription.user?.email || 'Unknown'}</td><td className="py-3 pr-4 text-secondaryText">{subscription.app?.name || 'Unknown'}</td><td className="py-3 pr-4 text-secondaryText">{subscription.plan}</td><td className="py-3 text-accentRed">{subscription.status}</td></tr>)}</tbody></table></div></div></section></div></div></main>;
}
