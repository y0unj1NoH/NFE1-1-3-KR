import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export const ScrollDownIndicator = () => {
  const dotRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      dotRef.current,
      { y: 2 },
      {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 1.2,
      },
    );

    gsap.fromTo(
      containerRef.current,
      { y: 0, opacity: 0.7 },
      {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 1.2,
      },
    );
  }, []);

  return (
    <div
      className='absolute left-[50%] bottom-[10%] transform -translate-x-1/2 flex items-center justify-center'
      ref={containerRef}
    >
      <svg
        fill='none'
        height='50'
        viewBox='0 0 24 40'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect height='38' rx='11' stroke='white' strokeWidth='2' width='22' x='1' y='1' />
        <circle cx='12' cy='10' fill='white' r='2' ref={dotRef} />
      </svg>
    </div>
  );
};
