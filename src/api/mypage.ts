import { supabase } from 'lib/supabase';

const getMyComment = async () => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

    const { data, error } = await supabase.from('comment').select().eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching comment', error);
    throw error;
  }
};

const getMyPost = async () => {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;

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
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export { getMyComment, getMyPost };
