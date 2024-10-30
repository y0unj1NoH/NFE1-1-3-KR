import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

import { MyPageContent } from './MyPageContent';

import { ContentsContainer } from 'components';
import { useSetBackgroundColor } from 'hooks';

export const MyPage = () => {
  useSetBackgroundColor('bg-secondary');

  const childWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childWrapperRef.current) {
      gsap.fromTo(
        childWrapperRef.current,
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
      );
    }
  }, []);

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden'>
      <ContentsContainer
        childNode={
          <div className='w-full' ref={childWrapperRef}>
            <MyPageContent />
          </div>
        }
      />
    </div>
  );
};

export default MyPage;
