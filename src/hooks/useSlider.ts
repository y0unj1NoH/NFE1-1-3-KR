import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from 'hooks';
import type { BookData } from 'types';
import {
  setupWheel,
  setupTimeline,
  handleDrag,
  handleClick,
  handleModalClick,
  handleWheel,
} from 'utils';

export const useSlider = ({ data }: { data: BookData[] }) => {
  const sliderTl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { item: 0 };

  const wheel = document.querySelector<HTMLDivElement>('.wheel');
  const modal = document.querySelector<HTMLDivElement>('.modal')!;
  const [images, setImages] = useState<HTMLDivElement[]>(
    gsap.utils.toArray<HTMLDivElement>('.wheel__card'),
  );

  const sliderRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sliderRef);

  // const openModalWithDelay = () => {
  //   setTimeout(() => {
  //     modal.style.display = 'block';
  //   }, 3000);
  // };

  const handleModalClose = useCallback(() => {
    handleModalClick(images, tracker.item, modal);
  }, [images, tracker.item, modal]);

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
    handleDrag(images, sliderTl, tracker);
    handleClick(images, sliderTl, tracker, modal);
  }, [images]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if (modal) {
      modal.addEventListener('click', handleModalClose);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (modal) {
        modal.removeEventListener('click', handleModalClose);
      }
    };
  }, [handleModalClose, handleResize, modal]);

  useEffect(() => {
    // console.log('isIntersecting: ', isIntersecting);
    if (isIntersecting) {
      window.addEventListener('wheel', handleScroll);
    } else {
      window.removeEventListener('wheel', handleScroll);
    }
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [isIntersecting, handleScroll]);

  return { sliderRef };
};
