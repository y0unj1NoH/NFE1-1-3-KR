import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

import SlideItem from './SlideItem';
import type { BookData } from '../../api/book';

interface SlideProps {
  data: BookData[];
}
const Slide = ({ data }: SlideProps) => {
  useEffect(() => {
    const wheel = document.querySelector<HTMLElement>('.wheel');
    const images = gsap.utils.toArray<HTMLElement>('.wheel__card');

    if (!wheel || !images.length) {
      console.error('Wheel or images not found');
      return;
    }
    const total = images.length;
    const step = 1 / total;
    let wrapProgress = gsap.utils.wrap(0, 1);
    let snap = gsap.utils.snap(step);
    let wrapTracker = gsap.utils.wrap(0, total);
    let tracker = { item: 0 };

    gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

    const setup = () => {
      const radius = wheel.offsetWidth / 2;
      const center = wheel.offsetWidth / 2;
      const slice = (2 * Math.PI) / total;

      images.forEach((item, i) => {
        const angle = i * slice;
        const x = center + radius * Math.sin(angle);
        const y = center - radius * Math.cos(angle);

        gsap.set(item, {
          rotation: angle + '_rad',
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });

      images[0].classList.add('active');
    };

    setup();
    window.addEventListener('resize', setup);

    return () => {
      window.removeEventListener('resize', setup);
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
