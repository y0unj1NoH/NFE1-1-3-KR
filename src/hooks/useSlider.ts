import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

import type { BookData } from '../api/book';

import { setupWheel, setupTimeline, handleDrag, handleClick } from 'utils/sliderUtils';

const useSlider = ({ data }: { data: BookData[] }) => {
  const sliderTl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { item: 0 };

  useEffect(() => {
    const wheel = document.querySelector<HTMLElement>('.wheel');
    const images = gsap.utils.toArray<HTMLElement>('.wheel__card');

    if (!wheel || !images.length) {
      return;
    }

    setupWheel(wheel, images);

    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

    setupTimeline(images.length, sliderTl, tracker);
    handleDrag(images, sliderTl, tracker);
    handleClick(images, sliderTl, tracker);

    const handleResize = () => {
      setupWheel(wheel, images);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);
};

export default useSlider;
