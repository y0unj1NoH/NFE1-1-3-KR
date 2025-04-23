import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// import { getPopularBooks, searchBook } from 'api';
import { getMockPopularBooks, searchMockBook } from 'api';
import { useSearchQueryStore } from 'stores';

export const useBookList = () => {
  const { query } = useSearchQueryStore();

  // 실제 API 사용 시
  // const { data: popularBooks, refetch: fetchPopularBooks } = useQuery({
  //   queryKey: ['popularBooks'],
  //   queryFn: getPopularBooks,
  //   enabled: false,
  // });

  // const { data: searchResults, refetch: fetchSearchBooks } = useQuery({
  //   queryKey: ['searchBook', query],
  //   queryFn: () => searchBook({ query }),
  //   enabled: false,
  // });

  // Mock API 사용
  const { data: popularBooks, refetch: fetchPopularBooks } = useQuery({
    queryKey: ['mockPopularBooks'],
    queryFn: getMockPopularBooks,
    enabled: false,
  });

  const { data: searchResults, refetch: fetchSearchBooks } = useQuery({
    queryKey: ['mockSearchBook', query],
    queryFn: () => searchMockBook({ query }),
    enabled: false,
  });

  useEffect(() => {
    if (query) {
      void fetchSearchBooks();
    } else {
      void fetchPopularBooks();
    }
  }, [query, fetchPopularBooks, fetchSearchBooks]);

  const data = query ? searchResults : popularBooks;

  let dataType: 'popular' | 'searchResults' | 'noResults' = 'popular';
  if (query) {
    if (!data || data.length === 0) {
      dataType = 'noResults';
    } else {
      dataType = 'searchResults';
    }
  }

  return { data, dataType };
};

export default useBookList;
