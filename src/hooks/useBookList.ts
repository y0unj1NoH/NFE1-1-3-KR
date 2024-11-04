import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';

import { getPopularBooks, searchBook } from 'api';
import { useSearchQueryStore } from 'stores';

export const useBookList = () => {
  const { query } = useSearchQueryStore();

  const { data: popularBooks, refetch: fetchPopularBooks } = useQuery({
    queryKey: ['popularBooks'],
    queryFn: getPopularBooks,
    enabled: false,
  });

  const { data: searchResults, refetch: fetchSearchBooks } = useQuery({
    queryKey: ['searchBook', query],
    queryFn: () => searchBook({ query }),
    enabled: false,
  });

  const debouncedFetchSearchBooks = useCallback(
    debounce(() => {
      void fetchSearchBooks();
    }, 300),
    [fetchSearchBooks],
  );

  useEffect(() => {
    if (query) {
      void debouncedFetchSearchBooks();
    } else {
      void fetchPopularBooks();
    }
  }, [query, fetchPopularBooks, debouncedFetchSearchBooks]);

  const data = query ? searchResults : popularBooks;
  const isEmpty = query && (!data || data.length === 0);

  return { data, isEmpty };
};

export default useBookList;
