'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');

    if (!isSupabaseConfigured) {
      setError('Admin sign-in is not configured on this deployment.');
      setBusy(false);
      return;
    }

    const { error: signInError } = await createSupabaseBrowserClient().auth.signInWithPassword({ email, password });
    if (signInError) {
      setError('Sign-in failed. Check your details or contact the account owner.');
      setBusy(false);
      return;
    }
    router.replace('/admin');
  }

  return <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-navy-50/50 px-4 py-16"><div className="w-full max-w-md rounded-3xl border border-navy-100 bg-white p-8 shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-teal-500"><ShieldCheck className="h-6 w-6 text-white" /></div><h1 className="mt-6 font-heading text-3xl font-bold text-navy-900">Admin sign in</h1><p className="mt-2 text-sm leading-relaxed text-navy-600">Use the administrator account provisioned in Supabase Auth. Admin access is verified against the protected profile role.</p><form onSubmit={handleSubmit} className="mt-8 space-y-5"><div className="space-y-2"><Label htmlFor="admin-email">Email</Label><Input id="admin-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" /></div><div className="space-y-2"><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></div>{error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<Button type="submit" disabled={busy} className="w-full bg-teal-500 text-white hover:bg-teal-600">{busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</> : 'Sign in securely'}</Button></form></div></main>;
}
