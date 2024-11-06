import GridItem from './GridItem';

import { useGrid } from 'hooks';
import type { BookData } from 'types';

const Grid = ({ data }: { data: BookData[] }) => {
  const { galleryRef } = useGrid({ data });

  return (
    <div className='app relative top-4 w-[70vw] mx-auto h-[calc(100vh-8rem)] overflow-y-auto pb-4'>
      <div
        className='gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[3.6%] gap-y-[2%] p-2.5'
        ref={galleryRef}
      >
        {data.map((bookData, index) => {
          return (
            <GridItem
              alt='Grid Item'
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
