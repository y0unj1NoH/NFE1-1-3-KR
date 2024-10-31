import type { ImgHTMLAttributes } from 'react';

interface SliderItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  backfaceColor?: string;
}

const SliderItem = ({ src, alt, backfaceColor = 'bg-[rgb(255,153,153)]' }: SliderItemProps) => {
  return (
    <div className='wheel__card group absolute [perspective:1000px] top-0 left-0 w-[13%] max-w-[300px] aspect-[200/295]'>
      <div className='faces relative w-full h-full rounded-xl [transform-style:preserve-3d]'>
        <div className='absolute w-full h-full shadow-xl [backface-visibility:hidden]'>
          <img alt={alt} className='w-full h-full object-cover' src={src} />
        </div>
        <div
          className={`absolute w-full h-full shadow-xl ${backfaceColor} [transform:rotateY(180deg)] [backface-visibility:hidden]`}
        >
          뭔가 이상하다
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
