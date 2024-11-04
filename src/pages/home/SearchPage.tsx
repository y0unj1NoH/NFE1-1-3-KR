import { MainClouds } from './MainClouds';
import { SearchableBookList } from './SearchableBookList';

import { useSetBackgroundColor } from 'hooks';

export const SearchPage = () => {
  useSetBackgroundColor('bg-secondary', true);

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      <MainClouds />
      <SearchableBookList />
    </div>
  );
};
