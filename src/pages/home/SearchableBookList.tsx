import Slider from './Slider';

import { useBookList } from 'hooks';

export const SearchableBookList = () => {
  const { data, isEmpty } = useBookList();

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      {isEmpty ? <div>No results found</div> : <Slider data={data || []} />}
    </div>
  );
};
