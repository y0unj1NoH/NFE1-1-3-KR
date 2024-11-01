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
const getBookDataById = async ({
  bookId,
}: {
  bookId: string;
}): Promise<BookData & { isBookmarked: boolean }> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const [bookResponse, bookmarkResponse] = await Promise.all([
      supabase.from('books').select('*').eq('id', bookId).single(),

      session
        ? supabase.from('bookmarks').select('id').eq('book_id', bookId).maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);

    if (bookResponse.error) {
      console.error('Error fetching book:', bookResponse.error);
      throw bookResponse.error;
    }

    if (bookmarkResponse.error) {
      console.error('Error checking bookmark:', bookmarkResponse.error);
      throw bookmarkResponse.error;
    }

    return {
      ...bookResponse.data,
      isBookmarked: !!bookmarkResponse.data,
    };
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
