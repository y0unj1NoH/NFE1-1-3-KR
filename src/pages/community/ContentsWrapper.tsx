import { Post } from './Post';
import { WritePost } from './WritePost';
import 'styles/scroll.css';

export const ContentsWrapper = () => {
  return (
    <div className='w-full h-full p-2'>
      <WritePost />
      <div className='w-full h-full p-4 overflow-y-scroll'>
        {Array.from({ length: 20 }).map(() => (
          <Post />
        ))}
      </div>
    </div>
  );
};
