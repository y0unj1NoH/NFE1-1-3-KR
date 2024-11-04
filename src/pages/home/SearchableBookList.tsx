import Slider from './Slider';

import { useBookList, useRandomTitle } from 'hooks';

export const SearchableBookList = () => {
  const { titleRef, randomTitle } = useRandomTitle();
  const { data, isEmpty } = useBookList();

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      <div
        className='absolute left-0 w-full text-center text-gold-default text-[3.75rem] font-thin z-10'
        ref={titleRef}
        style={{ top: '15%' }}
      >
        {isEmpty ? 'No results found' : randomTitle}
      </div>
      {!isEmpty && <Slider data={data || []} />}
    </div>
  );
};
