/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { supabase } from 'lib/supabase';

export interface BookData {
  id: string;
  title: string;
  author: string;
  description: string;
  rating_info: string;
  cover: string;
  category_name: string;
  isbn: string;
  isbn13: string;
}

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
