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
  const sliderRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<HTMLDivElement[]>(
    gsap.utils.toArray<HTMLDivElement>('.wheel__item'),
  );

  const isIntersecting = useIntersectionObserver(sliderRef);
  const { setActiveItem } = useBookModalStore();

  const sliderTl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { index: 0 };
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setItems(gsap.utils.toArray<HTMLDivElement>('.wheel__item'));
  }, [data]);

  useEffect(() => {
    if (!wheelRef.current || !items.length) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

    setupWheel(wheelRef.current, items);
    setupTimeline(items.length, sliderTl, tracker);
    handleDrag(items, sliderTl, tracker, setActiveIndex);
    handleClick(items, sliderTl, tracker, setActiveIndex);
  }, [items]);

  useEffect(() => {
    setActiveItem({ type: 'slider', index: activeIndex });
  }, [activeIndex]);

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      handleWheel(event.deltaY, items, sliderTl, tracker, setActiveIndex);
    },
    [items],
  );

  // TODO: handleResize 처분 여부 결정
  // const handleResize = useCallback(() => {
  //   setupWheel(wheelRef.current as HTMLDivElement, items);
  // }, [wheelRef.current, items]);

  useEffect(() => {
    if (isIntersecting) {
      window.addEventListener('wheel', handleScroll);
      // window.addEventListener('resize', handleResize);
    } else {
      window.removeEventListener('wheel', handleScroll);
      // window.removeEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('wheel', handleScroll);
      // window.removeEventListener('resize', handleResize);
    };
  }, [isIntersecting, handleScroll]);

  return { sliderRef, wheelRef };
};
