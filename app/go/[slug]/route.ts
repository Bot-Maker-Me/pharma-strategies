import { NextResponse } from 'next/server';
import { createSupabaseServerClient, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  // Redirect relative to the incoming request, so it works on any domain
  // (preview, production, custom) without extra configuration.
  const fallback = new URL('/apps', request.url);

  if (!isSupabaseConfigured) return NextResponse.redirect(fallback);

  let destination: string | null | undefined;

  try {
    const { data } = await createSupabaseServerClient()
      .from('apps')
      .select('external_signup_url, is_active')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .maybeSingle();

    destination = data?.external_signup_url;
  } catch {
    return NextResponse.redirect(fallback);
  }

  if (!destination) return NextResponse.redirect(fallback);

  try {
    const target = new URL(destination);
    if (!['http:', 'https:'].includes(target.protocol)) throw new Error('Unsupported destination');
    return NextResponse.redirect(target);
  } catch {
    return NextResponse.redirect(fallback);
  }
}
