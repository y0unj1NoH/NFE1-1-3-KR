import type { Database } from './supabase';

export type BookData = Database['public']['Tables']['books']['Row'];
type Bookmark = Database['public']['Tables']['bookmarks']['Row'];

export interface BookMarkReturn extends Bookmark {
  books?: BookData;
}
