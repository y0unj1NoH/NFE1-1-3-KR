import gsap from 'gsap';
import { useState, useRef, useEffect } from 'react';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';

import { Post } from './Post';
import { WritePost } from './WritePost';

import 'styles/scroll.css';
import { TopButton } from 'components';
import { usePostList, useIntersectionObserver } from 'hooks';

export const ListWrapper = () => {
  const listRef = useRef<List>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: posts } = usePostList();

  const [listHeight, setListHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setListHeight(containerRef.current.getBoundingClientRect().height * 0.9);
    }
  }, [containerRef]);

  useEffect(() => {
    const handleResizeAndZoom = (event: WheelEvent) => {
      if (event.ctrlKey) {
        updateListHeight();
      }
    };

    const updateListHeight = () => {
      if (posts && containerRef.current) {
        const containerHeight = containerRef.current.getBoundingClientRect().height;
        setListHeight(containerHeight * 0.9);
      }
    };

    window.addEventListener('resize', updateListHeight);
    window.addEventListener('wheel', handleResizeAndZoom);

    return () => {
      window.removeEventListener('resize', updateListHeight);
      window.removeEventListener('wheel', handleResizeAndZoom);
    };
  }, [posts]);

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
      <div ref={ref} style={style}>
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
      <div className='w-full h-full md:p-4' ref={containerRef}>
        {posts ? (
          <List
            height={listHeight}
            itemCount={posts.length}
            itemSize={256}
            ref={listRef}
            width='100%'
          >
            {Row}
          </List>
        ) : null}
      </div>
      <TopButton onClick={scrollToTop} />
    </div>
  );
};
