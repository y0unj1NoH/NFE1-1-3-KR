import Grid from './Grid';
import Slider from './Slider';

import { useBookList, useRandomTitle } from 'hooks';

export const SearchableBookList = ({ isVisible }: { isVisible: boolean }) => {
  const { titleRef, randomTitle } = useRandomTitle();
  const { data, dataType } = useBookList();

  return (
    <div className='relative w-full h-[calc(100vh-6rem)] overflow-hidden'>
      {isVisible && dataType !== 'searchResults' && (
        <div
          className='absolute left-0 top-[15%] w-full text-center text-gold-default font-thin select-none leading-tight lg:text-[3.75rem] md:text-[3rem] sm:text-[2.5rem] xxs:text-[1.75rem]'
          ref={titleRef}
        >
          {dataType === 'noResults' ? 'No results found' : randomTitle}
        </div>
      )}

      {dataType === 'popular' && <Slider data={data || []} />}
      {dataType === 'searchResults' && <Grid data={data || []} />}
    </div>
  );
};
