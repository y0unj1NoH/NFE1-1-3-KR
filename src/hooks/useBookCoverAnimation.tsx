import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

export const useBookCoverAnimation = (
  coverRef: RefObject<HTMLImageElement>,
  initialized: boolean,
) => {
  useEffect(() => {
    if (!initialized) return;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = coverRef.current!.getBoundingClientRect();

      const xPos = (clientX - left) / width;
      const yPos = (clientY - top) / height;

      const rotationX = (yPos - 0.5) * 20;
      const rotationY = (xPos - 0.5) * -20;

      gsap.to(coverRef.current, {
        rotateX: rotationX,
        rotateY: rotationY,
        duration: 0.3,
        ease: 'power1.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(coverRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const coverElement = coverRef.current!;
    coverElement.addEventListener('mousemove', handleMouseMove);
    coverElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      coverElement.removeEventListener('mousemove', handleMouseMove);
      coverElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initialized]);
};
