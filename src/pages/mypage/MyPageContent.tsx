import { useAuthStore, useBookMarkStore } from 'stores';
import Section from './Section';
import { useEffect, useState } from 'react';
import { getBookMarkList } from 'api';

export const MyPageContent = () => {
  const { userInfo } = useAuthStore();
  const { bookmarks } = useBookMarkStore();
  console.log(bookmarks);
  console.log(userInfo);

  const linkedAccountItems = [
    { icon: <img src='/icon/google.svg' alt='Google' />, text: 'kc0393@gmail.com' },
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
      icon: <img src={bookmark.books?.cover || '/default-cover.jpg'} className='w-16 h-24' />,
      text: bookmark.books?.title || '제목 없음',
    })) || [];

  return (
    <div className='w-full items-center flex flex-col h-[80vh] overflow-y-scroll'>
      <div className='flex flex-col items-center my-4 mb-10'>
        <img src={'/default-profile.png'} alt='Profile' className='w-24 h-24 rounded-full' />
        <p className='text-lg font-bold mt-2'>{userInfo?.username || '사용자명 없음'}</p>
        <p className='text-sm text-gray-500'>{userInfo?.user_id || 'ID 없음'}</p>
      </div>
      <Section title='Linked account' items={linkedAccountItems} />
      <Section title='Post written' items={postItems} />
      <Section title='Comment' items={commentItems} />
      <Section title='Bookmark' items={bookmarkItems} />
    </div>
  );
};
