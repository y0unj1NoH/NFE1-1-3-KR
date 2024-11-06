import type { ImgHTMLAttributes } from 'react';

import { useColorThief } from 'hooks';

interface GridItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  bookId: string;
  onCardClick?: (bookId: string, bookColor: string) => void;
}

const GridItem = ({ src, alt, bookId, onCardClick }: GridItemProps) => {
  const { bookColor, handleOnLoadImage } = useColorThief();

  return (
    <div
      className='gallery__item relative cursor-pointer w-full max-w-[300px] aspect-[200/295]'
      data-color={bookColor}
      onClick={() => onCardClick && onCardClick(bookId, bookColor || 'transparent')}
    >
      <div className='faces relative relative w-full h-full rounded-xl [transform-style:preserve-3d]'>
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
