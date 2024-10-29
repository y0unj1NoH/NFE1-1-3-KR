import { ContentsContainer } from 'components';
import { useSetBackgroundColor } from 'hooks';
import { MyPageContent } from './MyPageContent';

export const MyPage = () => {
  useSetBackgroundColor('bg-secondary');

  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden'>
      <ContentsContainer childNode={<MyPageContent />} />
    </div>
  );
};

export default MyPage;
