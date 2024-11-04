import { supabase } from 'lib/supabase';
import type { BookMarkReturn } from 'types';

// const getBookMarkList = async (): Promise<BookMarkReturn[]> => {
//   const { data, error } = await supabase
//     .from('bookmarks')
//     .select('*, books(*)')
//     .returns<BookMarkReturn[]>();

//   if (error) throw error;
//   return data;
// };

const getBookMarkList = async (userId: string): Promise<BookMarkReturn[]> => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*, books(*)')
    .eq('user_id', userId)
    .returns<BookMarkReturn[]>();

  if (error) throw error;
  return data;
};

const addBookMark = async ({ bookId }: { bookId: string }): Promise<BookMarkReturn> => {
  if (!bookId) {
    throw new Error('책 ID가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ book_id: bookId })
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteBookMark = async ({ bookId }: { bookId: string }): Promise<BookMarkReturn> => {
  if (!bookId) {
    throw new Error('책 ID가 필요합니다.');
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('book_id', bookId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export { getBookMarkList, addBookMark, deleteBookMark };
