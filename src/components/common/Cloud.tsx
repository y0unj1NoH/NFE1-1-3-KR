import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

interface CloudProps {
  src: string;
  duration: number; // 속도
  initialX: number; // 시작 X
  initialY: number; // 시작 Y
  driftAmount: number; // 흔들림 정도
}

export const Cloud = ({ src, duration, initialX, initialY, driftAmount }: CloudProps) => {
  const cloudRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false); // 첫 애니메이션 실행 확인

  useEffect(() => {
    const cloudElement = cloudRef.current;

    if (!cloudElement) return;

    const endX = window.innerWidth;
    const leftStartX = -600; // 첫 이동 후 시작 점

    const animateCloud = () => {
      if (!cloudRef.current) return;

      gsap.fromTo(
        cloudElement,
        { x: hasAnimated.current ? leftStartX : initialX, y: initialY },
        {
          x: endX,
          duration,
          ease: 'none',
          onComplete: () => {
            hasAnimated.current = true;
            animateCloud();
          },
        },
      );

      gsap.to(cloudElement, {
        y: initialY + driftAmount,
        yoyo: true,
        repeat: -1,
        duration: 3,
        ease: 'sine.inOut',
      });
    };

    animateCloud();

    return () => {
      gsap.killTweensOf(cloudElement);
    };
  }, [duration, initialX, initialY, driftAmount]);

  return (
    <div
      className='absolute'
      ref={cloudRef}
      style={{
        width: 200,
        height: 150,
        backgroundImage: `url(${src})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};
