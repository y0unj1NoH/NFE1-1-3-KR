import { supabase } from 'lib/supabase';

const addLike = async ({ postId }: { postId: string }) => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

const removeLike = async ({ postId }: { postId: string }) => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error removing like:', error);
    throw error;
  }
};

export { addLike, removeLike };
