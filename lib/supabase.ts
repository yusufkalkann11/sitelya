import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export const LEAD_STATUSES = ['new', 'contacted', 'proposal', 'won', 'lost', 'spam'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string | null;
  package: string | null;
  message: string;
  locale: string;
  source: string | null;
  status: LeadStatus;
  is_read: boolean;
  notes: string;
  kvkk_accepted_at: string;
};

let client: SupabaseClient | null = null;

export function isDbConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Service role anahtarı RLS'yi aşar; bu istemci yalnızca sunucuda kullanılır.
export function db() {
  if (!isDbConfigured()) {
    throw new Error('SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlı değil.');
  }
  client ??= createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
