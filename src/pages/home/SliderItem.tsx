import ColorThief from 'colorthief';
import { useState, type ImgHTMLAttributes } from 'react';

import { blendColors } from 'utils';
interface SliderItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  bookId: string;
  onCardClick?: (bookId: string, bookColor: string) => void;
}

const SliderItem = ({ src, alt, bookId, onCardClick }: SliderItemProps) => {
  const [bookColor, setBookColor] = useState<string>();

  const handleOnLoadImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(event.currentTarget);
    const blendedColor = `rgb(${blendColors(color).join(',')})`;
    setBookColor(blendedColor);
  };

  return (
    <div
      className='wheel__card group absolute [perspective:1000px] top-0 left-0 w-[13%] max-w-[300px] aspect-[200/295]'
      data-color={bookColor}
      onClick={() => onCardClick && onCardClick(bookId, bookColor || 'transparent')}
    >
      <div className='faces relative w-full h-full rounded-xl [transform-style:preserve-3d]'>
        <div className='absolute w-full h-full shadow-xl [backface-visibility:hidden]'>
          <img
            alt={alt}
            className='w-full h-full object-cover'
            crossOrigin='anonymous'
            onLoad={handleOnLoadImage}
            src={src}
          />
        </div>
        <div
          className={`absolute w-full h-full shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]`}
          style={{ backgroundColor: bookColor }}
        ></div>
      </div>
    </div>
  );
};

export default SliderItem;
