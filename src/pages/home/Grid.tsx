import GridItem from './GridItem';

import type { BookData } from 'types';

const Grid = ({ data }: { data: BookData[] }) => {
  console.log('data:', data);
  return (
    <div className='relative w-[80vw] mx-auto'>
      <div className='gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[3.6%] gap-y-[2%] p-2.5'>
        {data.slice(0, 14).map((bookData, index) => {
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
      <div className='modal fixed inset-0 opacity-0 pointer-events-none z-[999]'></div>
    </div>
  );
};

export default Grid;
