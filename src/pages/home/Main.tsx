import { forwardRef, useEffect } from 'react';

import { SearchPage } from './SearchPage';

import { useSetBackgroundColor } from 'hooks';
import { useIntroStore } from 'stores';

export const Main = forwardRef<HTMLDivElement, { isVisible: boolean }>(({ isVisible }, ref) => {
  useSetBackgroundColor('bg-secondary', isVisible);
  const { setIsVisible } = useIntroStore();

  useEffect(() => {
    setIsVisible(false);
  }, [setIsVisible, isVisible]);

  return (
    <div ref={ref}>
      {/* <div className='relative w-full h-[calc(100vh-6rem)] border-black border-8' /> */}
      <SearchPage />
    </div>
  );
});
