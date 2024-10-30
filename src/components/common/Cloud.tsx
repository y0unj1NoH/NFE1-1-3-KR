import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface CloudProps {
  src: string;
  duration: number; // 속도
  initialX: number; // 시작 X
  initialY: number; // 시작 Y
  driftAmount: number; // 흔들림 정도
}

export const Cloud = ({ src, duration, initialX, initialY, driftAmount }: CloudProps) => {
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startX = initialX - 200;
    const endX = window.innerWidth;
    if (cloudRef.current) {
      const tl = gsap.timeline({ repeat: -1, repeatRefresh: true });

      tl.fromTo(
        cloudRef.current,
        { x: startX, y: initialY },
        { x: endX, duration, ease: 'none' },
      ).to(
        cloudRef.current,
        {
          y: initialY + driftAmount,
          yoyo: true,
          repeat: -1,
          duration: 3,
          ease: 'sine.inOut',
        },
        0,
      );
    }
  }, [duration, initialX, initialY, driftAmount]);

  return (
    <div
      ref={cloudRef}
      className='absolute'
      style={{
        width: 200,
        height: 150,
        backgroundImage: `url(${src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        // filter: 'blur(1px)',
        // opacity: 0.7,
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    />
  );
};
