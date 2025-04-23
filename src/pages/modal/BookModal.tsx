import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { Rating } from './Rating';
import SlidingTitle from './SlidingTitle';
// import { getBookDataById } from '../../api/book';
import { getMockBookDataById } from 'api';

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
        // const data = await getBookDataById({ bookId });
        const data = await getMockBookDataById({ bookId });
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      } finally {
        setInitialized(true);
      }
    };

    void fetchBookDetails();
  }, [bookId, bookmarks]);

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
      <div className='relative flex flex-col w-full h-full overflow-scroll md:flex-row'>
        <div
          className='absolute top-0 md:right-[10%] right-auto left-[10%] md:left-auto'
          onClick={toggleBookmark}
          ref={bookmarkRef}
          style={{
            zIndex: 99,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            width: '4rem',
            height: '300px',
            backgroundColor: '#fa2121',
            cursor: 'pointer',
          }}
        />

        <div className='hidden md:flex lg:w-[15%] md:w-[20%] w-full p-2 items-center justify-center'>
          <SlidingTitle title={book.title || '제목 없음'} />
        </div>

        <div className='lg:w-[85%] md:w-[80%] w-full flex items-center justify-center p-4'>
          <div className='relative flex flex-col items-center justify-center w-full h-full max-w-6xl overflow-y-auto md:flex-row md:gap-4 gap-2'>
            <img
              alt={book.title || '표지 없음'}
              className='object-contain w-full max-w-xs rounded-lg shadow-xl md:max-w-sm lg:max-w-md'
              ref={coverRef}
              src={book.cover || '/default-bookcover.png'}
            />
            <div className='flex flex-col justify-center flex-1 p-4 lg:justify-start'>
              <div>
                <p className='mb-2 xxs:text-h5 sm:text-h4'>{book.title}</p>
                <p className='mb-2 xxs:text-h6 sm:text-h5'>{author}</p>
                <div className='mb-4 xxs:text-body2 sm:text-body1 text-[#202020]'>
                  {formatCategory(book.category_name || '')}
                </div>
                <div className='flex items-center mb-6'>
                  <Rating rating={Number(book.rating_info)} />
                  <span className='text-[#DD0000] xxs:text-body2 sm:text-body1 ml-2'>
                    {book.rating_info}
                  </span>
                </div>
                <p className='leading-relaxed text-body1 text-[#303030]'>{book.description}</p>
              </div>
            </div>
          </div>
          <Button onClick={onClose} position='default'>
            <Icon alt='Close' src='/Icon/X.svg' />
          </Button>
        </div>
      </div>
    </div>
  );
};
