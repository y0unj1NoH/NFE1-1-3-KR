import type { ImgHTMLAttributes } from 'react';

import { useColorThief } from 'hooks';
import { useBookModalStore } from 'stores';

interface GridItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  bookId: string;
}

const GridItem = ({ src, alt, bookId }: GridItemProps) => {
  const { bookColor, handleOnLoadImage } = useColorThief();
  const { setBookModalData } = useBookModalStore();

  return (
    <div
      className='gallery__item relative w-full max-w-[300px] aspect-[200/295] cursor-pointer'
      onClick={() => {
        if (setBookModalData) {
          setBookModalData({ id: bookId, color: bookColor || 'white' });
        }
      }}
    >
      <div className='faces relative w-full h-full rounded-xl [transform-style:preserve-3d]'>
        <div className='absolute w-full h-full shadow-xl hover:shadow-2xl [backface-visibility:hidden] transition-transform duration-500 ease-in-out transform hover:translate-y-2'>
          <img
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

export default GridItem;
