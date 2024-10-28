import { useEffect } from 'react';

import { Background } from './Background';
import { ContentsWrapper } from './ContentsWrapper';
import { SearchModal } from './SearchModal';

import { ContentsContainer } from 'components';
import { useBackgroundColor } from 'context';

export const CommunityPage = () => {
  const { setBackgroundColor } = useBackgroundColor();

  useEffect(() => {
    setBackgroundColor('bg-primary');
    return () => {
      setBackgroundColor('bg-primary');
    };
  }, [setBackgroundColor]);

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden bg-primary'>
      <Background />
      <ContentsContainer childNode={<ContentsWrapper />} />
      <SearchModal />
    </div>
  );
};
