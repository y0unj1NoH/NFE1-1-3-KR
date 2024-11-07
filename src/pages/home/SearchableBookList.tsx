import Grid from './Grid';
import Slider from './Slider';

import { useBookList, useRandomTitle } from 'hooks';

export const SearchableBookList = ({ isVisible }: { isVisible: boolean }) => {
  const { titleRef, randomTitle } = useRandomTitle();
  const { data, dataType } = useBookList();

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      {isVisible && dataType !== 'searchResults' && (
        <div
          className='absolute left-0 w-full text-center text-gold-default font-thin lg:text-[3.75rem] md:text-[3rem] sm:text-[2.5rem] xxs:text-[1.75rem] select-none p-4 leading-tight top-[15%] xs:top-[1%]'
          ref={titleRef}
          // style={{ top: '15%' }}
        >
          {dataType === 'noResults' ? 'No results found' : randomTitle}
        </div>
      )}

      {dataType === 'popular' && <Slider data={data || []} />}
      {dataType === 'searchResults' && <Grid data={data || []} />}
    </div>
  );
};
