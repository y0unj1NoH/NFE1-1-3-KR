import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';

import { getBookList, searchBook } from 'api';
import { useSearchQueryStore } from 'stores';

export const useBookList = () => {
  const { query, resetQuery } = useSearchQueryStore();

  const { data: popularBooks, refetch: fetchPopularBooks } = useQuery({
    queryKey: ['books'],
    queryFn: getBookList,
    enabled: false,
  });

  const { data: searchResults, refetch: fetchSearchBooks } = useQuery({
    queryKey: ['searchBook', query],
    queryFn: () => searchBook({ bookTitle: query }),
    enabled: false,
  });

  const debouncedFetchSearchBooks = useCallback(
    debounce(() => {
      void fetchSearchBooks();
    }, 300),
    [fetchSearchBooks],
  );

  useEffect(() => {
    resetQuery();
  }, [resetQuery]);

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
