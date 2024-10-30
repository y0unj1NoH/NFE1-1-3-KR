import type { Database } from './supabase';

export type UserInfo = Database['public']['Tables']['userinfo']['Row'];
