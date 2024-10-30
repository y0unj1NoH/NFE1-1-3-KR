import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

export const useRibbonAnimation = (
  bookmarkRef: RefObject<HTMLDivElement>,
  isBookmarkOpen: boolean,
  initialized: boolean,
) => {
  useEffect(() => {
    if (!initialized) return;

    gsap.to(bookmarkRef.current, {
      y: isBookmarkOpen ? 0 : -200,
      duration: 0.8,
      ease: 'bounce.out',
    });
  }, [isBookmarkOpen, initialized]);

  useEffect(() => {
    if (initialized && bookmarkRef.current) {
      gsap.set(bookmarkRef.current, { y: isBookmarkOpen ? 0 : -200 });
    }
  }, [initialized]);
};
