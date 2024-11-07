import SliderItem from './SliderItem';

import { useSlider } from 'hooks';
import type { BookData } from 'types';

const Slider = ({ data }: { data: BookData[] }) => {
  const { sliderRef, wheelRef } = useSlider({ data });
  return (
    <div className='slider absolute bottom-0 w-full z-50 sm:h-[35vh] xxs:h-[28vh]' ref={sliderRef}>
      <div
        className='wheel absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center w-[1000vw] aspect-[1/1] sm:max-w-[2000px] sm:max-h-[2000px] xxs:max-w-[1100px] xxs:max-h-[1100px]'
        ref={wheelRef}
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
  );
};

export default Slider;
