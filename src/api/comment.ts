import { supabase } from 'lib/supabase';
import type { CommentFormData, UpdateCommentParams } from 'types';

const createComment = async (formData: CommentFormData) => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const { data, error } = await supabase
      .from('comment')
      .insert({ user_id: userId, ...formData })
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

const updateComment = async ({ comment_id, content }: UpdateCommentParams) => {
  try {
    const { data, error } = await supabase
      .from('comment')
      .update({
        content: content,
      })
      .eq('comment_id', comment_id)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const { error } = await supabase.from('comment').delete().eq('comment_id', commentId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export { createComment, updateComment, deleteComment };
