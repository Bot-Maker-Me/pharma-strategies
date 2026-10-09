import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Whether this deployment has Supabase credentials.
 *
 * Check this before touching a client. A build without credentials must still
 * compile and render — `next build` runs before env vars are guaranteed to be
 * present, and the marketing pages fall back to the bundled content.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey)
);

const MISSING_CONFIG =
  'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (server routes also want SUPABASE_SERVICE_ROLE_KEY).';

let browserClient: SupabaseClient | null = null;
let serverClient: SupabaseClient | null = null;

/**
 * Clients are created lazily (and cached) instead of at module scope.
 * `createClient('')` throws, so creating them eagerly meant that importing this
 * module broke the build on any deployment without credentials.
 */
export function createSupabaseBrowserClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) throw new Error(MISSING_CONFIG);
  browserClient ??= createClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}

export function createSupabaseServerClient(): SupabaseClient {
  if (!supabaseUrl || !(supabaseServiceRoleKey || supabaseAnonKey)) throw new Error(MISSING_CONFIG);
  serverClient ??= createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey);
  return serverClient;
}
