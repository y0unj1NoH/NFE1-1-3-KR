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
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const [postResponse, likeResponse] = await Promise.all([
      supabase
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
        .single(),

      // 로그인한 경우만 좋아요 여부 확인
      userId
        ? supabase
            .from('post_likes')
            .select('*')
            .eq('post_id', postId)
            .eq('user_id', userId)
            .maybeSingle()
        : null,
    ]);

    if (postResponse.error) throw postResponse.error;

    return {
      ...postResponse.data,
      isLiked: Boolean(likeResponse?.data),
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

const createPost = async (formData: CreatePostFormData) => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const { data, error } = await supabase
      .from('posts')
      .insert({ user_id: userId, ...formData })
      .select();

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
