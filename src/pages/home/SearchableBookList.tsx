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
          className='absolute left-0 w-full text-center text-gold-default text-[3.75rem] font-thin z-10'
          ref={titleRef}
          style={{ top: '15%' }}
        >
          {dataType === 'noResults' ? 'No results found' : randomTitle}
        </div>
      )}

      {dataType === 'popular' && <Slider data={data || []} />}
      {dataType === 'searchResults' && <Grid data={data || []} />}
    </div>
  );
};
