import GridItem from './GridItem';

import { useGrid } from 'hooks';
import type { BookData } from 'types';

const Grid = ({ data }: { data: BookData[] }) => {
  const { galleryRef } = useGrid({ data });

  return (
    <div className='relative top-4 mx-auto xxs:w-[90vw] md:w-[70vw] h-[calc(100vh-8rem)] overflow-y-auto pb-4 '>
      <div
        className='gallery grid gap-x-[3.6%] gap-y-[2%] p-2.5 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '
        ref={galleryRef}
      >
        {data.map((bookData, index) => {
          return (
            <GridItem
              alt={`grid-item-${index}`}
              bookId={bookData.id}
              key={index}
              src={bookData.cover as string}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
