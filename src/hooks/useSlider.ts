import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from 'hooks';
import { useBookModalStore } from 'stores';
import type { BookData } from 'types';
import { setupWheel, setupTimeline, handleDrag, handleClick, handleWheel } from 'utils';

export const useSlider = ({ data }: { data: BookData[] }) => {
  const sliderTl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { item: 0 };
  const { setActiveItem } = useBookModalStore();

  const wheel = document.querySelector<HTMLDivElement>('.wheel');
  const modal = document.querySelector<HTMLDivElement>('.modal')!;
  const [images, setImages] = useState<HTMLDivElement[]>(
    gsap.utils.toArray<HTMLDivElement>('.wheel__card'),
  );

  const sliderRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sliderRef);

  useEffect(() => {
    setActiveItem({ type: 'slider', index: tracker.item });
  }, [tracker.item]);

  const handleResize = useCallback(() => {
    setupWheel(wheel as HTMLDivElement, images);
  }, [wheel, images]);

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      handleWheel(event.deltaY, images, sliderTl);
    },
    [images],
  );

  useEffect(() => {
    setImages(gsap.utils.toArray<HTMLDivElement>('.wheel__card'));
  }, [data]);

  useEffect(() => {
    if (!wheel || !images.length) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);
    setupWheel(wheel, images);
    setupTimeline(images.length, sliderTl, tracker);
    handleDrag(images, sliderTl);
    handleClick(images, sliderTl, tracker, modal);
  }, [images]);

  useEffect(() => {
    if (isIntersecting) {
      window.addEventListener('wheel', handleScroll);
      window.addEventListener('resize', handleResize);
    } else {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isIntersecting, handleScroll, handleResize]);

  return { sliderRef };
};
