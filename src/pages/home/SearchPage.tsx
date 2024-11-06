import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { MainClouds } from './MainClouds';
import { SearchableBookList } from './SearchableBookList';

import { useSetBackgroundColor } from 'hooks';
import { BookModal } from 'pages';
import { useBookModalStore } from 'stores';
import { handleModalClick } from 'utils';

export const SearchPage = () => {
  useSetBackgroundColor('bg-secondary', true);
  const modalRef = useRef<HTMLDivElement>(null);
  const { bookModalData, activeItem } = useBookModalStore();

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

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      <MainClouds />
      <SearchableBookList />
      {ReactDOM.createPortal(
        <div
          className='modal fixed inset-0 opacity-0 pointer-events-none z-[10000]'
          data-flip-id='item'
          ref={modalRef}
          style={{ backgroundColor: bookModalData.color || 'white' }}
        >
          {bookModalData.id && <BookModal bookId={bookModalData.id || ''} onClose={closeModal} />}
        </div>,
        document.body,
      )}
    </div>
  );
};
