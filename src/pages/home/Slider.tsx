import SliderItem from './SliderItem';

import { useSlider } from 'hooks';
import type { BookData } from 'types';

const Slider = ({ data }: { data: BookData[] }) => {
  useSlider({ data });

  return (
    <>
      <div className='testDiv absolute bottom-0 w-full h-[35vh]'>
        <div className='wheel absolute top-0 flex items-center justify-center w-[1000vw] aspect-[1/1] max-w-[2000px] max-h-[2000px] left-1/2 transform -translate-x-1/2'>
          {
            // TODO: 이미지에 따른 모달 창 색상값 설정
            data.slice(0, 14).map((bookData, index) => (
              <SliderItem
                alt='슬라이드 아이템'
                backfaceColor='bg-[rgb(255,153,153)]'
                key={index}
                src={bookData.cover as string}
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Slider;
