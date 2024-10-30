import { useRef } from 'react';

import { Background } from 'components';
import { useIntersectionObserver, useSetBackgroundColor } from 'hooks';

export const Intro = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(pageRef);

  useSetBackgroundColor('bg-intro', isVisible);

  return (
    <div className='h-[calc(100vh-6rem)] w-full relative' ref={pageRef}>
      <h1>Intro</h1>
      {isVisible && <Background />}
    </div>
  );
};
