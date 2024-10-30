import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SlidingTitle from './SlidingTitle';
import type { BookData } from '../../api/book';
import { getBookDataById } from '../../api/book';
import { Button, Icon } from '../../components';
import { useBookCoverAnimation, useRibbonAnimation } from 'hooks';
import { Rating } from './Rating';

export const BookModal = () => {
  const [book, setBook] = useState<BookData | null>(null);
  const [isBookmarkOpen, setBookmarkOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);

  const bookId = '2173713'; // 임시 책 Id
  const backgroundColor = 'rgba(36, 56, 104, 0.5)'; // 임시 배경색 (투명도 50)

  useBookCoverAnimation(coverRef, initialized);
  useRibbonAnimation(bookmarkRef, isBookmarkOpen, initialized);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookDataById(bookId);
        setBook(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      } finally {
        setInitialized(true);
      }
    };

    void fetchBookDetails();
  }, [bookId]);

  // 리본 초기 위치
  useEffect(() => {
    if (bookmarkRef.current) {
      const initialY = isBookmarkOpen ? 0 : -200;
      gsap.set(bookmarkRef.current, { y: initialY });
    }
  }, [initialized]);

  if (!book) return <p>Loading...</p>;

  const author = book.author.split(' (')[0];
  const formatCategory = (category: string) =>
    category
      .split('/')
      .map(item => `#${item.trim()}`)
      .join(' ');

  return (
    <div className='fixed inset-0 z-50 bg-white z-[10000]'>
      <div className='relative flex w-full h-full' style={{ backgroundColor }}>
        <div
          className='absolute top-0'
          onClick={() => {
            setBookmarkOpen(prev => !prev);
          }}
          ref={bookmarkRef}
          style={{
            right: '10%',
            zIndex: 99,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            width: '4rem',
            height: '300px',
            backgroundColor: '#DD0000',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />

        <div className='w-[15%] flex items-center justify-center'>
          <SlidingTitle title={book.title} />
        </div>
        <div className='w-[85%] flex items-center justify-center'>
          <div className='relative flex flex-col items-center justify-center w-full h-full max-w-6xl p-4 overflow-y-auto'>
            <div className='flex flex-col items-center gap-12 md:flex-row'>
              <img
                alt={book.title}
                className='object-cover w-full h-auto max-w-md rounded-lg shadow-xl md:max-w-lg'
                ref={coverRef}
                src={book.cover}
              />
              <div className='flex flex-col justify-end flex-1'>
                <div>
                  <p className='mb-4 text-h4'>{book.title}</p>
                  <p className='mb-2 text-h5'>{author}</p>
                  <div className='mb-4 text-body1'>{formatCategory(book.category_name)}</div>
                  <div className='flex items-center mb-6'>
                    <Rating rating={Number(book.rating_info)} />
                    <span className='text-[#DD0000] text-body1 ml-2'>{book.rating_info}</span>
                  </div>
                  <p className='leading-relaxed text-body1'>{book.description}</p>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              navigate('/');
            }}
            position='default'
          >
            <>
              <Icon alt='Close' src='/icon/X.svg' />
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};
