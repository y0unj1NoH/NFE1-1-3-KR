import { useEffect, useRef } from 'react';

import { Intro } from './Intro';
import { Main } from './Main';

import { useIntersectionObserver } from 'hooks';
import { useSearchQueryStore } from 'stores';

export const HomePage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(mainRef);

  const { reset } = useSearchQueryStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className='w-full h-full'>
      {!isVisible && <Intro />}
      <Main isVisible={isVisible} ref={mainRef} />
    </div>
  );
};

export default HomePage;
