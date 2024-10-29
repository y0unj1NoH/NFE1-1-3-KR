import { useEffect, useState } from 'react';

export const Background = () => {
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    const updateImageCount = () => {
      const screenWidth = window.innerWidth;
      const imageWidth = 160;
      const count = Math.floor(screenWidth / imageWidth);
      setImageCount(count);
    };

    updateImageCount();

    window.addEventListener('resize', updateImageCount);

    return () => {
      window.removeEventListener('resize', updateImageCount);
    };
  }, []);

  return (
    <div className='absolute bottom-0 w-full'>
      <div className='absolute bottom-0 flex'>
        {Array.from({ length: imageCount + 1 }).map((_, index) => (
          <img
            alt='bg-ellipse'
            className='w-[10rem] object-contain'
            key={index}
            src='/bg/Ellipse.svg'
          />
        ))}
      </div>
    </div>
  );
};
