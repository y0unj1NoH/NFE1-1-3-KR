import Slider from './Slider';

import { useBookList } from 'hooks';

const PopularBooks = () => {
  const { data, isEmpty } = useBookList();

  return <>{isEmpty ? <div>No results found</div> : <Slider data={data || []} />}</>;
};

export default PopularBooks;
