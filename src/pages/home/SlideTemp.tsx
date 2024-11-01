import { forwardRef } from 'react';

import PopularBooks from './PopularBooks';

import { useSetBackgroundColor } from 'hooks';

export const SlideTemp = forwardRef<HTMLDivElement, { isVisible: boolean }>(
  ({ isVisible }, ref) => {
    useSetBackgroundColor('bg-secondary', isVisible);

    return (
      <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative' ref={ref}>
        <PopularBooks />
      </div>
    );
  },
);
