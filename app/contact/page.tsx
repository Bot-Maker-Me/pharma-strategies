'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), company: form.get('company'), message: form.get('message') }) });
    setBusy(false);
    setStatus(response.ok ? 'Thanks. Your message has been received.' : 'We could not send your message. Please try again.');
    if (response.ok) event.currentTarget.reset();
  }
  return <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8"><div className="rounded-3xl border border-hairline bg-raisedDark p-8 shadow-soft sm:p-12"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-accentRed">Contact Pharma Strategies</p><h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-primaryText">Let&apos;s talk about your operation</h1><p className="mt-4 leading-7 text-secondaryText">Tell us what you are trying to improve and our team will follow up.</p><form onSubmit={submit} className="mt-8 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required /></div><div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" name="email" type="email" required /></div></div><div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" name="company" /></div><div className="space-y-2"><Label htmlFor="message">How can we help?</Label><Textarea id="message" name="message" required rows={6} /></div><Button type="submit" disabled={busy} className="bg-accentRed text-primaryText hover:bg-accentRedBright">{busy ? 'Sending...' : 'Send message'}</Button>{status && <p className="text-sm text-secondaryText" role="status">{status}</p>}</form></div></main>;
}
