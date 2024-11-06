import { gsap } from 'gsap';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import GridItem from './GridItem';

import { useGrid } from 'hooks';
import { BookModal } from 'pages';
import type { BookData } from 'types';

const Grid = ({ data }: { data: BookData[] }) => {
  const { handleModalClose } = useGrid({ data });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    gsap.to('.app', { autoAlpha: 1, duration: 0.2 });
    gsap.from('.item', { autoAlpha: 0, yPercent: 30, stagger: 0.04 });
  }, []);

  const openModal = (bookId: string, bookColor: string) => {
    setSelectedBookId(bookId);
    setSelectedColor(bookColor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBookId(null);
    setSelectedColor(null);
    handleModalClose();
  };

  return (
    <div className='app relative top-4 w-[70vw] mx-auto h-[calc(100vh-8rem)] overflow-y-auto pb-4'>
      <div className='gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[3.6%] gap-y-[2%] p-2.5'>
        {data.map((bookData, index) => {
          return (
            <GridItem
              alt='Grid Item'
              bookId={bookData.id}
              key={index}
              onCardClick={openModal}
              src={bookData.cover as string}
            />
          );
        })}
      </div>
      {ReactDOM.createPortal(
        <div
          className='modal fixed inset-0 opacity-0 pointer-events-none z-[10000]'
          data-flip-id='item'
        >
          {isModalOpen && selectedBookId && (
            <BookModal
              backgroundColor={selectedColor || 'transparent'}
              bookId={selectedBookId || ''}
              onClose={closeModal}
            />
          )}
        </div>,
        document.body,
      )}
    </div>
  );
};

export default Grid;
