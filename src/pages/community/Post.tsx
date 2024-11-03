import { Profile } from 'components';
import type { PostDTO } from 'types';

export const Post = ({ post }: { post: PostDTO }) => {
  return (
    <div className='max-h-[16rem] h-full w-full px-2 py-[1.875rem] border-b border-[#243868] justify-center items-center gap-2 inline-flex cursor-pointer'>
      {post.books && (
        <img
          alt='book-cover'
          className='h-[193px] rounded object-cover aspect-[200/295]'
          src={post.books?.cover || '/default-bookcover.png'}
        />
      )}
      <div className='flex flex-col items-center justify-center w-full h-full gap-8 px-2'>
        <div className='inline-flex items-center self-stretch justify-start gap-2'>
          <Profile index={+post.userinfo.username!.slice(-1)} />
          <div className='text-[#333333] text-base font-normal leading-snug'>
            {post.userinfo?.username}
          </div>
        </div>
        <div className='inline-flex flex-col items-start justify-center w-full gap-4 px-2'>
          {post.books != null && (
            <span className='text-[#333333] text-xs font-normal leading-none'>
              &lt;{post.books.title}&gt; - {post.books.author?.replace(/\(Authors?\)/g, '').trim()}
            </span>
          )}
          <span className='text-[#333333] text-base font-medium leading-snug'>{post.content}</span>
        </div>
      </div>
    </div>
  );
};
