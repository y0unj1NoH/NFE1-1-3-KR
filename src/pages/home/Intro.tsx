import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { Background } from 'components';
import { useIntersectionObserver, useSetBackgroundColor } from 'hooks';
import { useIntroStore } from 'stores';

export const Intro = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(pageRef);
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);
  const setIsVisible = useIntroStore(state => state.setIsVisible);

  const cloud1Ref = useRef(null);
  const cloud3Ref = useRef(null);

  useEffect(() => {
    setIsVisible(isVisible);
  }, [isVisible, setIsVisible]);

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

  useEffect(() => {
    const animateClouds = () => {
      gsap.to(cloud1Ref.current, {
        y: 10,
        x: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(cloud3Ref.current, {
        y: 10,
        x: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    };

    animateClouds();
  }, []);

  return (
    <div className='h-[calc(100vh-6rem)] w-full relative flex items-center p-[8rem]' ref={pageRef}>
      <div className='w-[234px] h-[234px] bg-[#c3634d] rounded-full absolute top-0 right-[6rem]' />
      <img
        alt='cloud-1'
        className='absolute right-[3rem] top-[23rem]'
        ref={cloud1Ref}
        src='/bg/cloud-1.svg'
      />
      <img
        alt='cloud-3'
        className='absolute top-[10rem] right-[14rem]'
        ref={cloud3Ref}
        src='/bg/cloud-3.svg'
      />
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
