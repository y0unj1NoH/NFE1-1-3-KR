import { useParams } from 'react-router-dom';

import { DetailPost } from './DetailPost';
import { SearchModal } from './SearchModal';
import { WritePost } from './WritePost';

import { Background, ContentsContainer } from 'components';
import { useSetBackgroundColor } from 'hooks';

export const DetailPage = () => {
  useSetBackgroundColor('bg-primary');
  const { id } = useParams();

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden'>
      <Background />
      <ContentsContainer
        childNode={
          <div className='relative w-full h-full p-2 '>
            <WritePost />
            <DetailPost postId={id ?? ''} />
          </div>
        }
      />
      <SearchModal />
    </div>
  );
};
