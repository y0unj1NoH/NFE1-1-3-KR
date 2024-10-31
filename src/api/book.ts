import { supabase } from 'lib/supabase';
import type { BookData, SearchBookParams } from 'types';

// get all book datalist
const getBookDataList = async (): Promise<BookData[]> => {
  try {
    const { data, error } = await supabase.from('books').select('*');

    if (error) {
      console.error('Error fetching books:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error while fetching books:', error);
    throw error;
  }
};

// get single book data
interface GetBookParams {
  bookId: string;
}

const getBookDataById = async ({ bookId }: GetBookParams): Promise<BookData> => {
  try {
    const { data, error } = await supabase.from('books').select('*').eq('id', bookId).single();

    if (error) {
      console.error('Error fetching book:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error while fetching book:', error);
    throw error;
  }
};

// search book data
const searchBook = async ({ bookTitle }: SearchBookParams): Promise<BookData[]> => {
  try {
    const { data, error } = await supabase.from('books').select('*').eq('title', bookTitle);

    if (error) {
      console.error('Error searching books:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error while searching books:', error);
    throw error;
  }
};

export { getBookDataList, getBookDataById, searchBook };
