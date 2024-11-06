import { useEffect } from 'react';

import { MainClouds } from './MainClouds';
import { SearchableBookList } from './SearchableBookList';

import { useSetBackgroundColor } from 'hooks';
import { useSearchQueryStore } from 'stores';

export const SearchPage = () => {
  useSetBackgroundColor('bg-secondary', true);

  const { reset } = useSearchQueryStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      <MainClouds />
      <SearchableBookList />
    </div>
  );
};
