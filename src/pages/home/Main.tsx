import { forwardRef, useEffect } from 'react';

import { MainClouds } from './MainClouds';
import { SearchableBookList } from './SearchableBookList';

import { useSetBackgroundColor } from 'hooks';
import { useIntroStore } from 'stores';

export const Main = forwardRef<HTMLDivElement, { isVisible: boolean }>(({ isVisible }, ref) => {
  useSetBackgroundColor('bg-secondary', isVisible);
  const { setIsVisible } = useIntroStore();

  useEffect(() => {
    setIsVisible(false);
  }, [setIsVisible, isVisible]);

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative' ref={ref}>
      <MainClouds />
      <SearchableBookList />
    </div>
  );
});
