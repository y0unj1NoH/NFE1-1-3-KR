import type { Database } from './supabase';

type CommentData = Database['public']['Tables']['comment']['Row'];

export type CommentFormData = Pick<CommentData, 'post_id' | 'content'>;

export type UpdateCommentParams = Pick<CommentData, 'comment_id' | 'content'>;
