import { Post } from './Post';
import { WritePost } from './WritePost';

export const ContentsWrapper = () => {
  return (
    <>
      <WritePost />
      {Array.from({ length: 20 }).map(() => (
        <Post />
      ))}
    </>
  );
};
