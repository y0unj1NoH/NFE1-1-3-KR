import { useState, useEffect } from 'react';

import Slide from './Slide';
import { getBookDataList, type BookData } from '../../api/book';

const PopularBooks = () => {
  // TODO: 데이터 처리 훅으로 분리
  const [data, setData] = useState<BookData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBookDataList();
        setData(result);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    void fetchData();
  }, []);

  // TODO: 검색 결과 없을 시 안내 표시
  return (
    <>
      <Slide data={data} />
    </>
  );
};

export default PopularBooks;
