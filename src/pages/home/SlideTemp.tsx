import { forwardRef, useEffect } from 'react';

import PopularBooks from './PopularBooks';

import { useSetBackgroundColor } from 'hooks';
import { useIntroStore } from 'stores';

export const SlideTemp = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    useSetBackgroundColor('bg-secondary', isVisible);
    const { setIsVisible } = useIntroStore();

    useEffect(() => {
      setIsVisible(false);
    }, [setIsVisible, isVisible]);

    return (
      <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative' ref={ref}>
        <PopularBooks />
      </div>
    );
  },
);
