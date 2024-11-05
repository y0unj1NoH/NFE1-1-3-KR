import { useNavigate } from 'react-router-dom';

import { Profile } from 'components';
import type { PostDTO } from 'types';

export const Post = ({ post }: { post: PostDTO }) => {
  const navigate = useNavigate();
  return (
    <div
      className='h-full w-full px-2 py-[1.875rem] border-b border-[#243868] justify-start items-center gap-2 flex cursor-pointer'
      onClick={() => {
        navigate(`/community/${post.post_id}`);
      }}
    >
      {post.books && (
        <img
          alt='book-cover'
          className='md:h-[193px] rounded object-cover aspect-[200/295] h-[100px]'
          src={post.books?.cover || '/default-bookcover.png'}
        />
      )}
      <div className='flex flex-col items-start justify-center w-[calc(100%-10rem)] gap-4 px-2'>
        <div className='flex items-center justify-start w-full gap-2'>
          <Profile index={+post.userinfo.username!.slice(-1)} />
          <div className='text-[#333333] text-xs font-normal leading-snug md:text-base break-words w-full'>
            {post.userinfo?.username}
          </div>
        </div>
        <div className='flex flex-col items-start justify-center w-full gap-4'>
          {post.books != null && (
            <span className='text-[#333333] text-xs font-normal leading-none line-clamp-1 break-words w-full'>
              &lt;{post.books.title}&gt; - {post.books.author?.replace(/\(Authors?\)/g, '').trim()}
            </span>
          )}
          <span className='text-[#333333] text-sm md:text-base font-medium break-words line-clamp-2 w-full'>
            {post.content}
          </span>
        </div>
      </div>
    </div>
  );
};
