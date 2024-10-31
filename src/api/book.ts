import { supabase } from 'lib/supabase';
import type { BookData } from 'types';

// get all book list
const getBookList = async (): Promise<BookData[]> => {
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
const getBookDataById = async ({ bookId }: { bookId: string }): Promise<BookData> => {
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
const searchBook = async ({ bookTitle }: { bookTitle: string }): Promise<BookData[]> => {
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

export { getBookList, getBookDataById, searchBook };
