import type { Database } from './supabase';

type PostData = Database['public']['Tables']['posts']['Row'];

export type CreatePostFormData = Pick<PostData, 'title' | 'content' | 'user_id'>;

type UpdatePostFormData = Pick<PostData, 'title' | 'content'>;

export interface UpdatePostParams {
  postId: string;
  formData: UpdatePostFormData;
}
