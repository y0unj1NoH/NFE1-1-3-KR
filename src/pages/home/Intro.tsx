import { useRef, useEffect } from 'react';

import { useIntersectionObserver, useSetBackgroundColor } from 'hooks';

export const Intro = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(pageRef);

  useSetBackgroundColor('bg-intro', isVisible);

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  return (
    <div className='h-[calc(100vh-6rem)] w-full' ref={pageRef}>
      <h1>Intro</h1>
    </div>
  );
};
