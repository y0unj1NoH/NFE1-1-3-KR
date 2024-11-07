import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { MainClouds } from './MainClouds';
import { SearchableBookList } from './SearchableBookList';

import { useIntersectionObserver, useSetBackgroundColor, useCloseModal } from 'hooks';
import { BookModal } from 'pages';
import { useSearchQueryStore, useBookModalStore } from 'stores';

export const SearchPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef);
  useSetBackgroundColor('bg-secondary', true);

  const { bookModalData } = useBookModalStore();
  const { modalRef, closeModal } = useCloseModal();
  useSetBackgroundColor('bg-secondary', true);

  const { reset } = useSearchQueryStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className='relative w-full h-[calc(100vh-6rem)] overflow-hidden' ref={containerRef}>
      {isVisible && <MainClouds />}
      <SearchableBookList isVisible={isVisible} />
      {ReactDOM.createPortal(
        <div
          className='modal fixed inset-0 z-[10000] opacity-0 pointer-events-none'
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
