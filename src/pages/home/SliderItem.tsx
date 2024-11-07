import type { ImgHTMLAttributes } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useColorThief } from 'hooks';
import { useBookModalStore } from 'stores';

interface SliderItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  bookId: string;
}

const SliderItem = ({ src, alt, bookId }: SliderItemProps) => {
  const { bookColor, handleOnLoadImage } = useColorThief();
  const { setBookModalData } = useBookModalStore();

  return (
    <div
      className='wheel__item absolute top-0 left-0 w-[13%] max-w-[300px] aspect-[200/295] [perspective:1000px] wheel__item'
      onClick={() => {
        if (setBookModalData) {
          setBookModalData({ id: bookId, color: bookColor || 'white' });
        }
      }}
    >
      <div className='faces relative w-full h-full rounded-xl [transform-style:preserve-3d]'>
        <div className='absolute w-full h-full shadow-xl hover:shadow-2xl [backface-visibility:hidden] transition-transform duration-500 ease-in-out transform hover:translate-y-2'>
          <LazyLoadImage
            alt={alt}
            className='w-full h-full object-cover'
            crossOrigin='anonymous'
            onLoad={handleOnLoadImage}
            src={src}
          />
        </div>
        <div
          className='absolute w-full h-full shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]'
          style={{ backgroundColor: bookColor }}
        ></div>
      </div>
    </div>
  );
};

export default SliderItem;
