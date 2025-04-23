import type { BookData } from 'types';

const getMockBookDataById = async ({
  bookId,
}: {
  bookId: string;
}): Promise<BookData & { isBookmarked: boolean }> => {
  try {
    const response = await fetch(`/api/books/${bookId}`);
    if (!response.ok) {
      throw new Error('도서 조회에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('도서 조회 중 오류 발생:', error);
    throw error;
  }
};

const searchMockBook = async ({ query }: { query: string }): Promise<BookData[]> => {
  try {
    const response = await fetch(`/api/books/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('도서 검색에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('도서 검색 중 오류 발생:', error);
    throw error;
  }
};

const getMockPopularBooks = async (): Promise<BookData[]> => {
  try {
    const response = await fetch('/api/books/popular');
    if (!response.ok) {
      throw new Error('인기 도서 조회에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('인기 도서 조회 중 오류 발생:', error);
    throw error;
  }
}; 

export { getMockBookDataById, getMockPopularBooks, searchMockBook };

