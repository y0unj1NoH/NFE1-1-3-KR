import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const SlidingTitle = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animation = gsap.fromTo(
        titleRef.current,
        { y: 0 }, // 시작 위치
        {
          y: -100, // 끝 위치
          repeat: -1, // 반복
          yoyo: true, // 왕복
          duration: 3,
          ease: 'power1.inOut',
          paused: isPaused, // 현재 상태에 따라 재생/멈춤
        },
      );

      return () => animation.kill();
    });

    return () => {
      ctx.revert();
    };
  }, [isPaused]);

  return (
    <div
      className='rotate-90 cursor-pointer text-h1 whitespace-nowrap text-[#202020]'
      onMouseEnter={() => {
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
      ref={titleRef}
    >
      {title}
    </div>
  );
};

export default SlidingTitle;
