'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { DESIGN_EASE_ARRAY } from '@/lib/gsap';

const fields = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Alex Doe', required: true },
  { name: 'email', label: 'Work email', type: 'email', placeholder: 'alex@facility.com', required: true },
  { name: 'company', label: 'Facility', type: 'text', placeholder: 'Northside Pharmacy', required: false },
] as const;

type Status = 'idle' | 'submitting' | 'sent' | 'error';

/**
 * The demo request form. Posts to `/api/leads` and renders real idle /
 * submitting / sent / error states — shared by the home closing band and the
 * `/contact` page so both behave identically.
 */
export function DemoForm({ className = '' }: { className?: string }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(payload?.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full border-b border-hairline bg-transparent py-3 font-sans text-primaryText placeholder:text-secondaryText/40 transition-colors focus:border-accentRed focus:outline-none';

  return (
    <div className={`glass-panel panel-lift rounded-panel p-8 sm:p-10 ${className}`}>
      {status === 'sent' ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: DESIGN_EASE_ARRAY }}
          className="py-6"
          aria-live="polite"
        >
          <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-accentRed/50 text-accentRed">
            <Check className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <h3 className="mb-3 font-heading text-2xl text-primaryText">Request received</h3>
          <p className="mb-8 font-sans text-secondaryText">
            We reply within one business day, usually with two or three times that suit your
            facility.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="rounded-button border border-hairline px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-secondaryText transition-colors hover:border-accentRed hover:text-accentRed"
            >
              Send another
            </button>
            <Link
              href="/apps"
              className="font-mono text-[11px] uppercase tracking-widest text-accentRed transition-colors hover:text-primaryText"
            >
              See the apps
            </Link>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-secondaryText"
              >
                {field.label}
                {field.required ? <span className="ml-1 text-accentRed">*</span> : null}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, [field.name]: event.target.value }))
                }
                className={inputClass}
                required={field.required}
                autoComplete={
                  field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'organization'
                }
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-secondaryText"
            >
              What do you need to track?
              <span className="ml-1 text-accentRed">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Two locations, roughly 400 controlled items, two pharmacists and six nurses."
              value={formData.message}
              onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
              rows={3}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          {status === 'error' ? (
            <p aria-live="polite" className="font-mono text-xs text-accentRedBright">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="rounded-button bg-accentRed px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-midnight shadow-[0_24px_60px_-28px_rgba(194,59,59,0.85)] transition-colors hover:bg-accentRedBright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentRed disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Book a demo'}
            </button>
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondaryText/70">
              No newsletter, no resellers
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
