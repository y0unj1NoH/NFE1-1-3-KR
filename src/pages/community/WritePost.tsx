import { useEffect, useState } from 'react';

import { Profile } from 'components';
import { useModalDispatch } from 'context';
import { useCreatePost, useUpdatePost } from 'hooks';
import { useAuthStore, useSearchBookStore, usePostStore } from 'stores';

export const WritePost = () => {
  const dispatch = useModalDispatch();
  const userInfo = useAuthStore(state => state.userInfo);
  const { bookId } = useSearchBookStore();
  const { postId, postContent } = usePostStore();

  const [content, setContent] = useState(postContent || '');

  const { mutate: createNewPost } = useCreatePost();
  const { mutate: updatePostContent } = useUpdatePost(postId as string);

  useEffect(() => {
    if (postContent) setContent(postContent);
    else setContent('');
  }, [postContent]);

  return (
    <div
      className='p-2 rounded-[60px] border-2 border-[#243868] justify-between items-start inline-flex w-full'
      style={{
        borderColor: postContent ? '#afa18b' : '#243868',
      }}
    >
      <div className='flex items-center self-stretch justify-start gap-4 grow shrink basis-0'>
        {userInfo?.username ? <Profile index={+userInfo.username.slice(-1)} /> : null}
        <input
          className='h-[33px] px-0.5 py-2 justify-start items-center gap-2.5 w-full text-sm'
          onChange={e => {
            setContent(e.target.value);
          }}
          placeholder="What's on your mind?"
          type='text'
          value={content}
        />
      </div>
      <div className='flex items-center justify-end h-full gap-5'>
        <div
          className='flex items-center justify-start gap-2 cursor-pointer'
          onClick={() => {
            dispatch({ type: 'OPEN_MODAL' });
          }}
        >
          <img alt='search-book' className='w-5 h-5' src='/bookmark-search.svg' />

          <button className='text-[#27364b] text-xs font-normal leading-none hidden md:block'>
            Add Book
          </button>
        </div>
        <div
          className='py-2.5 px-5 bg-[#243868] rounded-[100px] justify-center items-center gap-2.5 flex cursor-pointer'
          onClick={() => {
            if (postContent) {
              updatePostContent(
                { postId: postId as string, content, bookId },
                {
                  onSuccess: () => {
                    setContent('');
                  },
                },
              );
            } else {
              createNewPost(
                { content, bookId },
                {
                  onSuccess: () => {
                    setContent('');
                  },
                },
              );
            }
          }}
          style={{ backgroundColor: postContent ? '#afa18b' : '#243868' }}
        >
          <div className='text-sm font-normal leading-tight text-white'>
            {postContent ? 'Edit' : 'Post'}
          </div>
        </div>
      </div>
    </div>
  );
};
