import ReactDOM from 'react-dom';

import SliderItem from './SliderItem';

import { useSlider } from 'hooks';
import { BookModal } from 'pages';
import { useBookModalStore } from 'stores';
import type { BookData } from 'types';

const Slider = ({ data }: { data: BookData[] }) => {
  const { sliderRef, handleModalClose } = useSlider({ data });
  const { bookModalData } = useBookModalStore();

  const closeModal = () => {
    handleModalClose();
  };

  return (
    <>
      <div className='slider absolute bottom-0 w-full h-[35vh]' ref={sliderRef}>
        <div className='wheel absolute top-0 flex items-center justify-center w-[1000vw] aspect-[1/1] max-w-[2000px] max-h-[2000px] left-1/2 transform -translate-x-1/2'>
          {data.slice(0, 14).map((bookData, index) => {
            return (
              <SliderItem
                alt={`slider-item-${index}`}
                bookId={bookData.id}
                key={index}
                src={bookData.cover as string}
              />
            );
          })}
        </div>
      </div>
      {ReactDOM.createPortal(
        <div
          className='modal fixed inset-0 opacity-0 pointer-events-none z-[10000]'
          data-flip-id='item'
          style={{ backgroundColor: bookModalData.color || 'white' }}
        >
          {bookModalData.id && <BookModal bookId={bookModalData.id || ''} onClose={closeModal} />}
        </div>,
        document.body,
      )}
    </>
  );
};

export default Slider;
