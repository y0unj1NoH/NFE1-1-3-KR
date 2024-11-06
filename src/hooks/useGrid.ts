import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useEffect, useState, useRef } from 'react';

import { useBookModalStore } from 'stores';
import type { BookData } from 'types';
import { handleItemClick } from 'utils';

export const useGrid = ({ data }: { data: BookData[] }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<HTMLDivElement[]>([]);

  const { setActiveItem } = useBookModalStore();

  useEffect(() => {
    setItems(gsap.utils.toArray<HTMLDivElement>('.gallery__item'));
  }, [data]);

  useEffect(() => {
    if (galleryRef.current && items.length) {
      gsap.to(galleryRef.current, { autoAlpha: 1, duration: 0.2 });
      gsap.from(items, { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
    }
  }, [items]);

  useEffect(() => {
    if (!galleryRef.current || !items.length) {
      return;
    }

    gsap.registerPlugin(Flip);

    const clickHandlers = items.map((item: HTMLDivElement, index: number) => {
      const clickHandler = () => {
        setActiveItem({ type: 'grid', index });
        handleItemClick(item);
      };
      item.addEventListener('click', clickHandler);
      return { item, clickHandler };
    });

    return () => {
      clickHandlers.forEach(({ item, clickHandler }) => {
        item.removeEventListener('click', clickHandler);
      });
    };
  }, [items, setActiveItem]);

  return { galleryRef };
};
