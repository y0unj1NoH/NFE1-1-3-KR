import gsap from 'gsap';
import { useState, useRef } from 'react';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';

import { DetailPost } from './DetailPost';
import { Post } from './Post';
import { WritePost } from './WritePost';

import 'styles/scroll.css';
import { TopButton } from 'components';
import { usePostList, useIntersectionObserver } from 'hooks';

export const ContentsWrapper = () => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const listRef = useRef<List>(null);

  const { data: posts } = usePostList();

  const Row = ({ index, style }: ListChildComponentProps) => {
    const post = posts?.[index];
    const ref = useRef<HTMLDivElement>(null);
    const isIntersecting = useIntersectionObserver(ref, { threshold: 0.1 });

    if (isIntersecting && ref.current) {
      gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    } else if (ref.current) {
      gsap.set(ref.current, { opacity: 0, y: 20 });
    }

    if (!post) return null;

    return (
      <div
        onClick={() => {
          setSelectedPostId(post.post_id as string);
        }}
        ref={ref}
        style={style}
      >
        <Post post={post} />
      </div>
    );
  };

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo(0);
    }
  };

  return (
    <div className='relative w-full h-full p-2 '>
      <WritePost />
      {selectedPostId != null ? (
        <DetailPost onClose={setSelectedPostId} postId={selectedPostId} />
      ) : (
        <div className='w-full h-full p-4'>
          {posts ? (
            <List
              height={Math.min(650, posts.length * 256)}
              itemCount={posts.length}
              itemSize={256}
              ref={listRef}
              width='100%'
            >
              {Row}
            </List>
          ) : null}
        </div>
      )}
      <TopButton onClick={scrollToTop} />
    </div>
  );
};
