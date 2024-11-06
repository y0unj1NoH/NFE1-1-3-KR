import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useCallback, useEffect, useState } from 'react';

import { useBookModalStore } from 'stores';
import type { BookData } from 'types';
import { handleItemClick } from 'utils';

export const useGrid = ({ data }: { data: BookData[] }) => {
  const gallery = document.querySelector<HTMLDivElement>('.gallery');
  const modal = document.querySelector<HTMLDivElement>('.modal')!;
  const { setActiveItem } = useBookModalStore();

  const [items, setItems] = useState<HTMLDivElement[]>(
    gsap.utils.toArray<HTMLDivElement>('.gallery__item'),
  );

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
        setActiveItem({ type: 'grid', index });
        handleItemClick(item, modal);
      });
    });
  }, [items]);
};
