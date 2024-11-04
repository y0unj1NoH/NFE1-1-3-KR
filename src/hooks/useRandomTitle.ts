import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

const titles = [
  'Explore the rich world of Korean literature!',
  'Unlock the magic of Korean literature!',
  'Your next great read awaits!',
  'Dive into the heart of Korean stories!',
  'Experience Korea through its books!',
];

export const useRandomTitle = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [randomTitle, setRandomTitle] = useState<string>('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    setRandomTitle(titles[randomIndex]);
  }, []);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power1.inOut' },
      );
    }
  }, []);

  return { titleRef, randomTitle };
};
