import SliderItem from './SliderItem';

import { useSlider } from 'hooks';
import type { BookData } from 'types';

const Slider = ({ data }: { data: BookData[] }) => {
  const { sliderRef, wheelRef } = useSlider({ data });
  return (
    <>
      <div
        className='slider absolute bottom-0 w-full h-[35vh] z-50'
        ref={sliderRef}
        style={{ border: '3px solid red' }}
      >
        <div
          className='wheel absolute top-0 flex justify-center w-[1000vw] aspect-[1/1] xxs:max-w-[1000px] xxs:max-h-[1000px] sm:max-w-[2000px] sm:max-h-[2000px] left-1/2 transform -translate-x-1/2 '
          // className='wheel absolute top-0 flex items-center justify-center w-[1000vw] aspect-[1/1] xxs:max-w-[1000px] xxs:max-h-[1000px] sm:max-w-[2000px] sm:max-h-[2000px] left-1/2 transform -translate-x-1/2 '
          ref={wheelRef}
          style={{ border: '3px solid black' }}
        >
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
    </>
  );
};

export default Slider;
