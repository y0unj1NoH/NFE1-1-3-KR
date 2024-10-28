import { useEffect, useState } from 'react';
import type { BookData } from '../../api/book';
import { getBookDataById } from '../../api/book';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../../components';

const BookModal = () => {
  const [book, setBook] = useState<BookData | null>(null);
  const [isBookmarkOpen, setBookmarkOpen] = useState(false);
  const navigate = useNavigate();

  const bookId = '173930433'; // 임시 책 Id
  const backgroundColor = 'rgba(36, 56, 104, 0.5)'; // 임시 배경색 (투명도 50)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookDataById(bookId);
        setBook(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!book) return <p>wait</p>;

  const [leftTitle, rightTitle] = book.title.split(' - ');
  const author = book.author.split(' (')[0];
  const formatCategory = (category: string) => {
    return category
      .split(' > ')
      .map(item => `#${item.replace(/\s+/g, '_')}`);
  };

  return (
    <div className='fixed inset-0 z-50 bg-white'>
      <div className='relative w-full h-full flex' style={{ backgroundColor }}>
        <div className='w-[15%] flex items-center justify-center'>
          <h1 className='text-h1 rotate-90 whitespace-nowrap'> {rightTitle}</h1>
        </div>
        <div className='w-[80%] flex items-center justify-center'>
          <div className='relative max-w-5xl w-full h-full p-12 flex flex-col items-center justify-center overflow-y-auto'>
            <div className='flex flex-col md:flex-row items-center gap-12'>
              <img
                className='w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg shadow-xl'
                src={book.cover}
                alt={book.title}
              />
              <div className='flex-1'>
                <p className='text-h4 mb-4'>{leftTitle}</p>
                <p className='text-h5 mb-2'>{author}</p>
                <div className='text-body1 mb-4 space-y-2'>
                  {formatCategory(book.category_name).map((tag, index) => (
                    <div key={index}>{tag}</div>
                  ))}
                </div>

                <div className='flex items-center mb-6'>
                  <p> 평점: {book.rating_info}</p>
                </div>
                <p className='text-body1 leading-relaxed'>{book.description}</p>
              </div>
            </div>
          </div>
          <Button position='default' onClick={() => navigate('/')}>
            <>
              <Icon src='/Icon/X.svg' alt='Close' />
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
