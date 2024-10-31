import { supabase } from 'lib/supabase';
import type { BookData } from 'types';

// get all book datalist
export const getBookDataList = async (): Promise<BookData[]> => {
  const { data, error } = await supabase.from('books').select('*');
  if (error) throw error;
  return data;
};

// get single book data
export const getBookDataById = async (bookId: string): Promise<BookData> => {
  const { data, error } = await supabase.from('books').select('*').eq('id', bookId).single();
  if (error) throw error;
  return data;
};
