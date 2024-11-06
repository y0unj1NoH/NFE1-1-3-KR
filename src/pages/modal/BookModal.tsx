import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { Rating } from './Rating';
import SlidingTitle from './SlidingTitle';
import { getBookDataById } from '../../api/book';

import { addBookMark, deleteBookMark } from 'api';
import { Button, CustomToast, Icon } from 'components';
import { useBookCoverAnimation, useRibbonAnimation } from 'hooks';
import { fetchAndSetBookmarks, useAuthStore, useBookMarkStore } from 'stores';
import type { BookData } from 'types';

export const BookModal = ({
  bookId,
  onClose,
  backgroundColor,
}: {
  bookId: string;
  onClose: () => void;
  backgroundColor?: string;
}) => {
  const [book, setBook] = useState<BookData | null>(null);
  const [isBookmarkOpen, setBookmarkOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const { bookmarks } = useBookMarkStore();
  const { isAuthenticated } = useAuthStore();

  useBookCoverAnimation(coverRef, initialized);
  useRibbonAnimation(bookmarkRef, isBookmarkOpen, initialized);

  const toggleBookmark = async () => {
    if (!isAuthenticated) {
      CustomToast.error('Login required!');
      return;
    }
    try {
      if (isBookmarkOpen) {
        await deleteBookMark({ bookId });
      } else {
        await addBookMark({ bookId });
      }
      setBookmarkOpen(!isBookmarkOpen);
      await fetchAndSetBookmarks();
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  useEffect(() => {
    const isBookmarked = bookmarks?.some(bookmark => bookmark.books?.id === bookId) ?? false;
    setBookmarkOpen(isBookmarked);

    const fetchBookDetails = async () => {
      try {
        const data = await getBookDataById({ bookId });
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      } finally {
        setInitialized(true);
      }
    };

    void fetchBookDetails();
  }, [bookId, bookmarks]);

  // 리본 초기 위치
  useEffect(() => {
    if (bookmarkRef.current) {
      const initialY = isBookmarkOpen ? 0 : -200;
      gsap.set(bookmarkRef.current, { y: initialY });
    }
  }, [initialized]);

  if (!book) return <p>Loading...</p>;

  const author = book.author?.split(' (')[0] || '';
  const formatCategory = (category: string) =>
    category
      .split('/')
      .map(item => `#${item.trim()}`)
      .join(' ');

  return (
    <div
      className='modal-content fixed inset-0 z-[40000]'
      style={{ backgroundColor: backgroundColor || 'transparent' }}
    >
      <div className='relative flex w-full h-full '>
        <div
          className='absolute top-0'
          onClick={toggleBookmark}
          ref={bookmarkRef}
          style={{
            right: '10%',
            zIndex: 99,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            width: '4rem',
            height: '300px',
            backgroundColor: '#fa2121',
            cursor: 'pointer',
          }}
        />

        <div className='w-[15%] flex items-center justify-center'>
          <SlidingTitle title={book.title || '제목 없음'} />
        </div>
        <div className='w-[85%] flex items-center justify-center'>
          <div className='relative flex flex-col items-center justify-center w-full h-full max-w-6xl p-4 overflow-y-auto'>
            <div className='flex flex-col items-center gap-12 md:flex-row'>
              <img
                alt={book.title || '표지 없음'}
                className='object-cover w-full h-auto max-w-md rounded-lg shadow-xl md:max-w-lg'
                ref={coverRef}
                src={book.cover || '/default-bookcover.png'}
              />
              <div className='flex flex-col justify-end flex-1'>
                <div>
                  <p className='mb-4 text-h4'>{book.title}</p>
                  <p className='mb-2 text-h5 '>{author}</p>
                  <div className='mb-4 text-body1 text-[#202020]'>
                    {formatCategory(book.category_name || '')}
                  </div>
                  <div className='flex items-center mb-6'>
                    <Rating rating={Number(book.rating_info)} />
                    <span className='text-[#DD0000] text-body1 ml-2'>{book.rating_info}</span>
                  </div>
                  <p className='leading-relaxed text-body1 text-[#303030]'>{book.description}</p>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={onClose} position='default'>
            <>
              <Icon alt='Close' src='/Icon/X.svg' />
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};
