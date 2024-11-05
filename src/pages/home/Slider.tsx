import { useState } from 'react';
import ReactDOM from 'react-dom';

import SliderItem from './SliderItem';

import { useSlider } from 'hooks';
import { BookModal } from 'pages';
import type { BookData } from 'types';

const Slider = ({ data }: { data: BookData[] }) => {
  const { sliderRef, handleModalClose } = useSlider({ data });
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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
    <>
      <div className='slider absolute bottom-0 w-full h-[35vh]' ref={sliderRef}>
        <div className='wheel absolute top-0 flex items-center justify-center w-[1000vw] aspect-[1/1] max-w-[2000px] max-h-[2000px] left-1/2 transform -translate-x-1/2'>
          {data.slice(0, 14).map((bookData, index) => {
            return (
              <SliderItem
                alt='슬라이드 아이템'
                bookId={bookData.id}
                key={index}
                onCardClick={openModal}
                src={bookData.cover as string}
              />
            );
          })}
        </div>
      </div>
      {ReactDOM.createPortal(
        <div
          className='modal fixed inset-0 opacity-0 pointer-events-none z-[10000]'
          data-flip-id='wheel__card'
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
    </>
  );
};

export default Slider;
