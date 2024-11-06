import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useCallback, useEffect, useState } from 'react';

import type { BookData } from 'types';
import { handleItemClick, handleModalClick } from 'utils';

export const useGrid = ({ data }: { data: BookData[] }) => {
  const gallery = document.querySelector<HTMLDivElement>('.gallery');
  const modal = document.querySelector<HTMLDivElement>('.modal')!;

  const [items, setItems] = useState<HTMLDivElement[]>(
    gsap.utils.toArray<HTMLDivElement>('.gallery__item'),
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setItems(gsap.utils.toArray<HTMLDivElement>('.gallery__item'));
  }, [data]);

  useEffect(() => {
    if (gallery && items) {
      gsap.to(gallery, { autoAlpha: 1, duration: 0.2 });
      gsap.from(items, { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
    }
  }, [gallery, items]);

  useEffect(() => {
    if (!gallery || !items.length) {
      return;
    }

    gsap.registerPlugin(Flip);

    items.map((item: HTMLDivElement, index: number) => {
      item.addEventListener('click', () => {
        setActiveIndex(index);
        handleItemClick(item, modal);
      });
    });
  }, [items]);

  const handleModalClose = useCallback(() => {
    handleModalClick(items, activeIndex, modal);
  }, [items, activeIndex, modal]);

  return {
    handleModalClose,
  };
};
