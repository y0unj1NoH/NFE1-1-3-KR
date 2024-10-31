import { supabase } from 'lib/supabase';
import type { CreatePostFormData, UpdatePostParams } from 'types';

const getPostList = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
          *,
          userinfo (
            username,
            profile_url
          ),
          books (
            id,
            title,
            author,
            isbn,
            cover
          )
        `,
      )
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const getPostById = async (postId: string) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
          *,
          userinfo (
            username,
            profile_url
          ),
          books (
            id,
            title,
            author,
            isbn,
            cover
          ),
          comment (
            *,
            userinfo (
              username,
              profile_url
            )
          )
        `,
      )
      .eq('post_id', postId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

const createPost = async (formData: CreatePostFormData) => {
  try {
    const { data, error } = await supabase.from('posts').insert(formData).select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

const updatePost = async ({ postId, formData }: UpdatePostParams) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update(formData)
      .eq('post_id', postId)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

const deletePost = async (postId: string) => {
  try {
    const { error } = await supabase.from('posts').delete().eq('post_id', postId);

    if (error) throw error;

    return true; // 삭제 성공
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export { getPostList, getPostById, createPost, updatePost, deletePost };
