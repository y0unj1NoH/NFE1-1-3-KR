import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { Background } from 'components';
import { useIntersectionObserver, useSetBackgroundColor } from 'hooks';

export const Intro = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(pageRef);
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);

  useSetBackgroundColor('bg-primary', isVisible);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        paragraphsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.4,
        },
      );
    }
  }, [isVisible]);

  return (
    <div className='h-[calc(100vh-6rem)] w-full relative flex items-center p-[8rem]' ref={pageRef}>
      <div className='text-white text-[4rem] translate-y-[-3rem] flex flex-col gap-4'>
        {['DISCOVER', 'KOREAN STORIES', 'THAT TOUCH THE SOUL'].map((text, index) => (
          <p
            className={index === 0 ? 'translate-x-[2rem]' : index === 1 ? 'translate-x-[6rem]' : ''}
            key={index}
            ref={el => {
              if (el) paragraphsRef.current[index] = el;
            }}
          >
            {text}
          </p>
        ))}
      </div>
      {isVisible && <Background />}
    </div>
  );
};
