import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Profile, CustomToast } from 'components';
import {
  useCreateComment,
  useDeletePost,
  useLikePost,
  usePost,
  useUnlikePost,
  useDeleteComment,
  useUpdateComment,
} from 'hooks';
import { useAuthStore, usePostStore, useSearchBookStore } from 'stores';

export const DetailPost = ({ postId }: { postId: string }) => {
  const [isSetting, setIsSetting] = useState(false);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [selectedComment, setSelectedComment] = useState('');
  const { userInfo } = useAuthStore();
  const [comment, setComment] = useState('');
  const { setPostId, setPostContent } = usePostStore();
  const { setBookId } = useSearchBookStore();
  const navigate = useNavigate();

  const { data: post } = usePost(postId);

  const { mutate: createNewComment } = useCreateComment(postId);
  const { mutate: deletePostById } = useDeletePost(postId);
  const { mutate: likePost } = useLikePost(postId);
  const { mutate: unlikePost } = useUnlikePost(postId);
  const { mutate: updateComment } = useUpdateComment(postId);
  const { mutate: deleteComment } = useDeleteComment(postId);

  const handleEdit = () => {
    setPostId(postId);
    setPostContent(post?.content as string);
    setBookId(undefined);
    CustomToast.info('Edit your review on this post');
  };

  const handleLike = () => {
    if (post?.isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [post?.comment?.length]);

  return (
    <div className='relative flex w-full md:p-[2.5rem] overflow-scroll pt-4'>
      <button
        className='absolute top-[1rem] left-[1rem] md:block hidden items-center justify-center w-6 h-6'
        onClick={() => {
          navigate('/community');
          setPostContent(undefined);
        }}
      >
        <img alt='close-button' className='object-contain w-full h-full' src='/chevron-left.svg' />
      </button>
      {userInfo?.user_id === post?.user_id && (
        <button
          className='absolute md:top-[1rem] md:right-[1rem] top-[0.4rem] right-[0.2rem] flex items-center justify-center w-6 h-6 rounded-full bg-primary p-[0.15rem]'
          onClick={() => {
            setIsSetting(!isSetting);
          }}
        >
          <img
            alt='setting-button'
            className='w-[90%] h-[90%] object-contain'
            src='/Icon/setting.svg'
          />
        </button>
      )}
      {isSetting && (
        <div
          className='absolute top-[4rem] right-[1rem] flex flex-col items-end p-4 bg-white shadow-md rounded-md gap-2 text-sm text-[#333333] cursor-pointer'
          onClick={() => {
            setIsSetting(!isSetting);
          }}
        >
          <span onClick={handleEdit}>edit</span>
          <span
            onClick={() => {
              deletePostById();
              navigate('/community');
            }}
          >
            delete
          </span>
        </div>
      )}
      <div className='flex flex-col w-full p-[2.5rem] items-center justify-between border-2 border-[#afa18b] rounded-[40px] overflow-scroll gap-4'>
        <div className='flex flex-col md:w-[80%] w-full gap-8 xs:flex-row'>
          {post?.books && (
            <img
              alt='bookcover'
              className='h-[195px] rounded xs:object-cover object-contain aspect-[200/295]'
              src={post?.books?.cover || '/default-bookcover.png'}
            />
          )}
          <div className='flex flex-col justify-center flex-grow gap-2=' id='info'>
            <div className='flex items-center flex-shrink-0 gap-2' id='user'>
              <Profile index={+post?.userinfo?.username!.slice(-1)} />
              <div className='text-[#1c1c1c] text-xs font-normal leading-snug break-words max-w-full'>
                {post?.userinfo?.username}
              </div>
            </div>
            <div className='flex flex-col flex-shrink-0 gap-2' id='book'>
              {post?.books && (
                <span className='text-[#1c1c1c] text-xs font-normal leading-none break-words max-w-full'>
                  &lt;{post?.books.title}&gt; -{' '}
                  {post?.books.author.replace(/\(Authors?\)/g, '').trim()}
                </span>
              )}
              <span className='text-[#1c1c1c] text-sm md:text-base font-medium leading-snug break-words max-w-full'>
                {post?.content}
              </span>
            </div>
            <div className='py-1.5 flex justify-start items-center gap-2' id='icons'>
              <button onClick={handleLike}>
                <img alt='likes' src={post?.isLiked ? '/full-heart.svg' : '/empty-heart.svg'} />
              </button>
              <span className='text-[#333333] text-xs font-normal leading-none'>
                {post?.likes_count}
              </span>
              <img alt='captions' src='/caption.svg' />
              <span className='text-[#333333] text-xs font-normal leading-none'>
                {post?.comment.length}
              </span>
            </div>
          </div>
        </div>
        <div
          className='md:w-[80%] w-[100%] overflow-scroll gap-2 items-end flex flex-col h-[10rem]'
          id='comments'
          ref={commentsRef}
        >
          {post?.comment.map(
            (com: {
              comment_id: string;
              content: string;
              user_id: string;
              userinfo: { username: string; profile_url: string };
            }) => (
              <div
                className='px-2 py-2 w-full bg-[#fcfcfc] rounded justify-start items-start gap-2.5 flex'
                key={com.comment_id}
              >
                <Profile index={+com.userinfo?.username.slice(-1)} />
                <div className='flex flex-col items-start justify-between w-[calc(100%-3rem)] gap-1 break-words'>
                  <div className='w-full text-[#1c1c1c] text-xs font-normal leading-none flex justify-between break-words'>
                    <span className='break-words'>{com.userinfo?.username}</span>
                    {com.user_id === userInfo?.user_id && (
                      <div className='flex gap-2'>
                        <button
                          onClick={() => {
                            setComment(com.content);
                            setIsCommentEdit(true);
                            setSelectedComment(com.comment_id);
                          }}
                        >
                          <img
                            alt='edit-comment'
                            className='object-contain w-3 h-3 cursor-pointer'
                            src='/edit-pencil.svg'
                          />
                        </button>
                        <button
                          onClick={() => {
                            deleteComment(com.comment_id);
                          }}
                        >
                          <img
                            alt='delete-comment'
                            className='object-contain w-3 h-3 cursor-pointer'
                            src='/bin.svg'
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='w-full text-[#505050] text-xs font-normal leading-none break-words'>
                    {com.content}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
        <div
          className='md:w-[80%] w-[100%] px-2 py-1 rounded-[60px] border border-[#243868] justify-start items-center gap-2.5 inline-flex'
          style={{ borderColor: isCommentEdit ? '#afa18b' : '#243868' }}
        >
          <div className='flex items-center justify-start w-full gap-4 break-words'>
            {userInfo?.username && <Profile index={+userInfo.username.slice(-1)} />}
            <input
              className='px-0.5 py-2 justify-start items-center gap-2.5 flex w-full text-xs sm:text-sm'
              onChange={e => {
                setComment(e.target.value);
              }}
              placeholder="What's on your mind?"
              value={comment}
            />
          </div>
          <div
            className='px-5 py-2 bg-[#243868] rounded-[100px] justify-center items-center gap-2.5 flex text-white text-xs sm:text-sm'
            onClick={() => {
              if (isCommentEdit) {
                updateComment({ comment_id: selectedComment, content: comment });
                setIsCommentEdit(false);
              } else createNewComment({ postId, comment });
              setComment('');
            }}
            style={{ backgroundColor: isCommentEdit ? '#afa18b' : '#243868' }}
          >
            {isCommentEdit ? 'Edit' : 'Post'}
          </div>
        </div>
      </div>
    </div>
  );
};
