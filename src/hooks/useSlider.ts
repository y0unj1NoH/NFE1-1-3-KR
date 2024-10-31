import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

import type { BookData } from 'types';
import {
  setupWheel,
  setupTimeline,
  handleDrag,
  handleClick,
  handleModalClick,
  handleWheel,
} from 'utils/sliderUtils';

const useSlider = ({ data }: { data: BookData[] }) => {
  const sliderTl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { item: 0 };

  useEffect(() => {
    const wheel = document.querySelector<HTMLDivElement>('.wheel');
    const images = gsap.utils.toArray<HTMLDivElement>('.wheel__card');
    const modal = document.querySelector<HTMLDivElement>('.modal')!;

    if (!wheel || !images.length) {
      return;
    }

    setupWheel(wheel, images);

    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

    setupTimeline(images.length, sliderTl, tracker);
    handleDrag(images, sliderTl, tracker);
    handleClick(images, sliderTl, tracker, modal);

    // TODO: 모달 파트 수정 필요
    const handleModalClose = () => {
      handleModalClick(images, tracker, modal);
    };

    const handleResize = () => {
      setupWheel(wheel, images);
    };

    const handleScroll = (event: WheelEvent) => {
      handleWheel(event.deltaY, images, sliderTl, tracker);
    };

    modal.addEventListener('click', handleModalClose);
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll);
      modal.addEventListener('click', handleModalClose);
    };
  }, [data]);
};

export default useSlider;
