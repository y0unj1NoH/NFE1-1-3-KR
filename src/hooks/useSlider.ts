import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

import type { BookData } from '../api/book';

import {
  setupWheel,
  setupTimeline,
  handleDrag,
  handleClick,
  handleModalClick,
} from 'utils/sliderUtils';

const useSlider = ({ data }: { data: BookData[] }) => {
  const sliderTl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { item: 0 };

  useEffect(() => {
    const wheel = document.querySelector<HTMLDivElement>('.wheel');
    const images = gsap.utils.toArray<HTMLElement>('.wheel__card');
    const modal = document.querySelector<HTMLDivElement>('.modal');

    if (!wheel || !images.length) {
      return;
    }

    setupWheel(wheel, images);

    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

    setupTimeline(images.length, sliderTl, tracker);
    handleDrag(images, sliderTl, tracker);

    // TODO: 모달 파트 수정 필요
    let handleModalClose: () => void;
    if (modal) {
      handleClick(images, sliderTl, tracker, modal);
      handleModalClose = () => {
        handleModalClick(images, tracker, modal);
      };
      modal.addEventListener('click', handleModalClose);
    }

    const handleResize = () => {
      setupWheel(wheel, images);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (modal) {
        modal.addEventListener('click', handleModalClose);
      }
    };
  }, [data]);
};

export default useSlider;
