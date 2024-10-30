import { useRef } from 'react';

import { Background } from 'components';
import { useIntersectionObserver, useSetBackgroundColor } from 'hooks';

export const Intro = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(pageRef);

  useSetBackgroundColor('bg-primary', isVisible);

  return (
    <div className='h-[calc(100vh-6rem)] w-full relative flex items-center p-[8rem]' ref={pageRef}>
      <div className='text-white text-[4rem] translate-y-[-3rem] flex flex-col gap-4'>
        <p className='translate-x-[2rem]'>DISCOVER</p>
        <p className='translate-x-[6rem]'>KOREAN STORIES</p>
        <p>THAT TOUCH THE SOUL</p>
      </div>
      {isVisible && <Background />}
    </div>
  );
};
