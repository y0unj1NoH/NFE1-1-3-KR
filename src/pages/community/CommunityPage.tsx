import { ListWrapper } from './ListWrapper';
import { SearchModal } from './SearchModal';

import { Background } from 'components';
import { ContentsContainer } from 'components';
import { useSetBackgroundColor } from 'hooks';

export const CommunityPage = () => {
  useSetBackgroundColor('bg-primary');

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden'>
      <Background />
      <ContentsContainer childNode={<ListWrapper />} />
      <SearchModal />
    </div>
  );
};
