import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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
        }
      );

      return () => animation.kill();
    });

    return () => ctx.revert();
  }, [isPaused]);

  return (
    <div
      ref={titleRef}
      className="text-h1 rotate-90 whitespace-nowrap cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {title}
    </div>
  );
};

export default SlidingTitle;
