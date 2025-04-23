import { http, HttpResponse } from 'msw';

import { mockBooks } from '../data/booksData';

export const booksHandlers = [
  // 인기 도서 조회
  http.get('/api/books/popular', () => {
    const popularBooks = [...mockBooks]
      .sort((a, b) => (b.rating_info || 0) - (a.rating_info || 0))
      .slice(0, 14);

    return HttpResponse.json(popularBooks);
  }),

  // 도서 검색
  http.get('/api/books/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    
    const filteredBooks = mockBooks.filter(
      (book) =>
        book.title?.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query)
    );

    return HttpResponse.json(filteredBooks);
  }),

  // 단일 도서 조회
  http.get('/api/books/:id', ({ params }) => {
    const book = mockBooks.find((b) => b.id === params.id);

    if (!book) {
      return new HttpResponse(
        JSON.stringify({ message: '도서를 찾을 수 없습니다.' }),
        { status: 404 }
      );
    }

    // 실제 로그인 상태를 모킹하기 어려우므로, 기본적으로 북마크되지 않은 상태로 반환
    return HttpResponse.json({
      ...book,
      isBookmarked: false,
    });
  }),
]; 
