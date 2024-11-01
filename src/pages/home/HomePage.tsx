import { useRef } from 'react';

import { Intro } from './Intro';
import { SlideTemp } from './SlideTemp';

import { useIntersectionObserver } from 'hooks';

export const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(mainRef);

  return (
    <div className='w-full h-full'>
      {!isVisible && <Intro />}
      <SlideTemp isVisible={isVisible} ref={mainRef} />
    </div>
  );
};

export default HomePage;
