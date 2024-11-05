import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { MyPageContent } from './MyPageContent';

import { ContentsContainer } from 'components';
import { useSetBackgroundColor } from 'hooks';
import { BookModal } from 'pages';

export const MyPage = () => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  useSetBackgroundColor('bg-secondary');

  const childWrapperRef = useRef<HTMLDivElement>(null);

  const openBookModal = (bookId: string) => { setSelectedBookId(bookId); };
  const closeBookModal = () => { setSelectedBookId(null); };

  useEffect(() => {
    if (childWrapperRef.current) {
      gsap.fromTo(
        childWrapperRef.current,
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
      );
    }
  }, []);

  return (
    <>
      <div className='relative flex flex-col items-center justify-center w-full h-full overflow-hidden'>
        <ContentsContainer
          childNode={
            <div className='w-full' ref={childWrapperRef}>
              <MyPageContent openBookModal={openBookModal} />
            </div>
          }
        />
      </div>
      {selectedBookId && (
        <div
          style={{
            zIndex: 1000,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            height: '85vh',
            backgroundColor: 'black',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <BookModal
            backgroundColor='rgba(255, 255, 255, 0.9)'
            bookId={selectedBookId}
            onClose={closeBookModal}
          />
        </div>
      )}
    </>
  );
};

export default MyPage;
