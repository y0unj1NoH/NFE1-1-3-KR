import { gsap } from 'gsap';
import { useCallback, useRef } from 'react';

import { useBookModalStore } from 'stores';
import { handleModalClick } from 'utils';

export const useCloseModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { activeItem } = useBookModalStore();

  const closeModal = useCallback(() => {
    if (!modalRef.current) return;

    let items: HTMLDivElement[];
    if (activeItem.type === 'slider') {
      items = gsap.utils.toArray<HTMLDivElement>('.wheel__card');
    } else {
      items = gsap.utils.toArray<HTMLDivElement>('.gallery__item');
    }

    if (items) {
      handleModalClick(items, activeItem.index, modalRef.current);
    }
  }, [modalRef.current, activeItem.type, activeItem.index]);

  return { modalRef, closeModal };
};
