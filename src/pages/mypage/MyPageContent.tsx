import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Section from './Section';

import { getMyComment, getMyPost } from 'api/mypage';
import { Profile } from 'components';
import { useAuthStore, useBookMarkStore } from 'stores';
import type { SectionTypes } from 'types';

export const MyPageContent = ({ openBookModal }: { openBookModal: (bookId: string) => void }) => {
  const { userInfo } = useAuthStore();
  const { bookmarks } = useBookMarkStore();
  const navigate = useNavigate();

  const [postItems, setPostItems] = useState<SectionTypes[]>([]);
  const [commentItems, setCommentItems] = useState<SectionTypes[]>([]);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const [posts, comments] = await Promise.all([getMyPost(), getMyComment()]);

        const postData = posts.map(post => ({
          icon: <img alt='post-icon' src='/Icon/post.svg' />,
          text: post.books?.title || '제목 없음',
          onClick: () => {
            navigate(`/community/${post.post_id}`);
          },
        }));
        setPostItems(postData);

        const commentData = comments.map(comment => ({
          icon: <img alt='comment-icon' src='/Icon/comment.svg' />,
          text: comment.content || '내용 없음',
          onClick: () => {
            navigate(`/community/${comment.post_id}`);
          },
        }));
        setCommentItems(commentData);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    };

    void fetchMyData();
  }, [navigate]);

  //   const linkedAccountItems = [
  //     { icon: <img alt='Google' src='/icon/google.svg' />, text: 'kc0393@gmail.com' },
  //   ];

  const bookmarkItems =
    bookmarks?.map(bookmark => ({
      icon: (
        <img
          alt='bookcover'
          className='w-16 h-24'
          src={bookmark.books?.cover || '/default-cover.jpg'}
        />
      ),
      text: bookmark.books?.title || '제목 없음',
      onClick: () => {
        openBookModal(bookmark.books?.id || '');
      },
    })) || [];

  return (
    <div className='w-full items-center flex flex-col h-[80vh] overflow-y-scroll'>
      <div className='flex flex-col items-center my-4 mb-10'>
        <Profile index={userInfo?.username ? +userInfo.username.slice(-1) : 0} size='6rem' />
        <p className='mt-2 text-body1 text-[#161616]'>{userInfo?.username || '사용자명 없음'}</p>
        <p className='text-gray-500 text-subtitle1'>{userInfo?.user_id || 'ID 없음'}</p>
      </div>
      {/* <Section title='Linked account' items={linkedAccountItems} /> */}
      <Section items={postItems} title='Post written' />
      <Section items={commentItems} title='Comment' />
      <Section items={bookmarkItems} title='Bookmark' />
    </div>
  );
};
