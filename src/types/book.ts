import type { Database } from './supabase';

export type BookData = Database['public']['Tables']['books']['Row'];

export interface SearchBookParams {
  bookTitle: string;
}
