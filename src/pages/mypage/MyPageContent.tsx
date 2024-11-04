import Section from './Section';

import { useAuthStore, useBookMarkStore } from 'stores';

export const MyPageContent = () => {
  const { userInfo } = useAuthStore();
  const { bookmarks } = useBookMarkStore();

  const linkedAccountItems = [
    { icon: <img alt='Google' src='/icon/google.svg' />, text: 'kc0393@gmail.com' },
  ];

  const postItems = [
    { icon: <img src='/icon/post.svg' />, text: 'PACHINKO' },
    { icon: <img src='/icon/post.svg' />, text: 'PACHINKO' },
    { icon: <img src='/icon/post.svg' />, text: 'PACHINKO' },
  ];

  const commentItems = [
    { icon: <img src='/icon/comment.svg' />, text: 'This book is very nice!' },
    { icon: <img src='/icon/comment.svg' />, text: 'This book is very nice!' },
    { icon: <img src='/icon/comment.svg' />, text: 'This book is very nice!' },
  ];

  const bookmarkItems =
    bookmarks?.map(bookmark => ({
      icon: <img className='w-16 h-24' src={bookmark.books?.cover || '/default-cover.jpg'} />,
      text: bookmark.books?.title || '제목 없음',
    })) || [];

  return (
    <div className='w-full items-center flex flex-col h-[80vh] overflow-y-scroll'>
      <div className='flex flex-col items-center my-4 mb-10'>
        <img alt='Profile' className='w-24 h-24 rounded-full' src={'/default-profile.png'} />
        <p className='text-lg font-bold mt-2'>{userInfo?.username || '사용자명 없음'}</p>
        <p className='text-sm text-gray-500'>{userInfo?.user_id || 'ID 없음'}</p>
      </div>
      <Section items={linkedAccountItems} title='Linked account' />
      <Section items={postItems} title='Post written' />
      <Section items={commentItems} title='Comment' />
      <Section items={bookmarkItems} title='Bookmark' />
    </div>
  );
};
