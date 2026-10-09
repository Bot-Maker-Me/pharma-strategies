import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured) {
      console.error('[leads] Supabase is not configured, so the lead was not stored.');
      return NextResponse.json(
        { error: 'Requests are not connected yet on this deployment. Please try again later.' },
        { status: 503 }
      );
    }

    const { error } = await createSupabaseServerClient().from('leads').insert({
      name,
      email,
      company: company || null,
      message,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to submit your message. Please try again.' },
        { status: 500 }
      );
    }

    const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    if (notificationEmail && resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'PharmaSuite <onboarding@resend.dev>', to: [notificationEmail], subject: `New PharmaSuite inquiry from ${name}`, text: `${name} (${email})${company ? ` from ${company}` : ''}\n\n${message}` }),
      });
    }

    return NextResponse.json({ success: true, message: 'Thanks! We will be in touch shortly.' }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
