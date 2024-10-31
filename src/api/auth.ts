import { supabase } from 'lib/supabase';
import type { UserInfo } from 'types/auth';

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    const { data: userInfo, error } = await supabase
      .from('userinfo')
      .select('*')
      .eq('user_id', userId)
      .single<UserInfo>();

    if (error) throw error;

    return userInfo;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
