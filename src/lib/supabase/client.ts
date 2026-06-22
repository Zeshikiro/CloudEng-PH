import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return a minimal mock if Supabase isn't configured
  if (!url || !key || url.includes('placeholder')) {
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder'
    );
  }

  return createBrowserClient(url, key);
}
