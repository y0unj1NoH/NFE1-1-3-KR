import type { Database } from './supabase';

type PostData = Database['public']['Tables']['posts']['Row'];

export interface CreatePostFormData extends Pick<PostData, 'title' | 'content'> {
  book_id?: string;
}

interface UpdatePostFormData extends Pick<PostData, 'title' | 'content'> {
  book_id?: string;
}

export interface UpdatePostParams {
  postId: string;
  formData: UpdatePostFormData;
}
