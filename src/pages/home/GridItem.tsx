import ColorThief from 'colorthief';
import { useState, type ImgHTMLAttributes } from 'react';

import { blendColors } from 'utils';

interface GridItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  bookId: string;
  onCardClick?: (bookId: string, bookColor: string) => void;
}

const GridItem = ({ src, alt, bookId, onCardClick }: GridItemProps) => {
  const [bookColor, setBookColor] = useState<string>();

  const handleOnLoadImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(event.currentTarget);
    const blendedColor = `rgb(${blendColors(color).join(',')})`;
    setBookColor(blendedColor);
  };

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
