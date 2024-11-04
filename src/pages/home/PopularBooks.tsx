import Slider from './Slider';

import { useBookList, useSetBackgroundColor } from 'hooks';

export const PopularBooks = () => {
  const { data, isEmpty } = useBookList();
  useSetBackgroundColor('bg-secondary', true);

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      {isEmpty ? <div>No results found</div> : <Slider data={data || []} />}
    </div>
  );
};
