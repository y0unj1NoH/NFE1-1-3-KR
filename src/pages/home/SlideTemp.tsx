import { useRef } from 'react';

import PopularBooks from './PopularBooks';

import { useIntersectionObserver, useSetBackgroundColor } from 'hooks';

export const SlideTemp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  useSetBackgroundColor('bg-secondary', isVisible);

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative' ref={ref}>
      <PopularBooks />
    </div>
  );
};
