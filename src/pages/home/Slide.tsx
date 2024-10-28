import { gsap } from 'gsap';
import { useEffect } from 'react';

import SlideItem from './SlideItem';
import type { BookData } from '../../api/book';
import { initGsap, setupWheel, handleDrag } from '../../utils/sliderUtils';

const Slide = ({ data }: { data: BookData[] }) => {
  useEffect(() => {
    const wheel = document.querySelector<HTMLElement>('.wheel');
    const images = gsap.utils.toArray<HTMLElement>('.wheel__card');

    if (!wheel || !images.length) {
      return;
    }

    initGsap();
    setupWheel(wheel, images);

    const handleResize = () => {
      setupWheel(wheel, images);
    };

    window.addEventListener('resize', handleResize);

    handleDrag('.wheel', images);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  return (
    <>
      <div className='fixed bottom-0 w-full h-[35vh]'>
        <div className='wheel absolute top-0 flex items-center justify-center w-[1000vw] aspect-[1/1] max-w-[2000px] max-h-[2000px] left-1/2 transform -translate-x-1/2'>
          {
            // TODO: 이미지에 따른 모달 창 색상값 설정
            data.slice(0, 14).map((bookData, index) => (
              <SlideItem
                alt='슬라이드 아이템'
                backfaceColor='bg-[rgb(255,153,153)]'
                key={index}
                src={bookData.cover}
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Slide;
