import ReactDOM from 'react-dom';

import { MainClouds } from './MainClouds';
import { SearchableBookList } from './SearchableBookList';

import { useSetBackgroundColor, useCloseModal } from 'hooks';
import { BookModal } from 'pages';
import { useBookModalStore } from 'stores';

export const SearchPage = () => {
  const { bookModalData } = useBookModalStore();
  const { modalRef, closeModal } = useCloseModal();
  useSetBackgroundColor('bg-secondary', true);

  return (
    <div className='h-[calc(100vh-6rem)] w-full overflow-hidden relative'>
      <MainClouds />
      <SearchableBookList />
      {ReactDOM.createPortal(
        <div
          className='modal fixed inset-0 opacity-0 pointer-events-none z-[10000]'
          data-flip-id='item'
          ref={modalRef}
          style={{ backgroundColor: bookModalData.color || 'white' }}
        >
          {bookModalData.id && <BookModal bookId={bookModalData.id || ''} onClose={closeModal} />}
        </div>,
        document.body,
      )}
    </div>
  );
};
