import { Background } from './Background';
import { ContentsWrapper } from './ContentsWrapper';
import { SearchModal } from './SearchModal';

import { ContentsContainer } from 'components';

export const CommunityPage = () => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-primary'>
      <Background />
      <ContentsContainer childNode={<ContentsWrapper />} />
      <SearchModal />
    </div>
  );
};
