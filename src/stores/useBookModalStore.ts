import { create } from 'zustand';

interface BookModalState {
  isModalOpen: boolean;
  selectedBookId: string | null;
  selectedColor: string | null;
  openModal: (bookId: string, bookColor: string) => void;
  closeModal: () => void;
}

export const useBookModalStore = create<BookModalState>(set => ({
  isModalOpen: false,
  selectedBookId: null,
  selectedColor: null,
  openModal: (bookId, bookColor) => {
    set({ isModalOpen: true, selectedBookId: bookId, selectedColor: bookColor });
  },
  closeModal: () => {
    set({ isModalOpen: false, selectedBookId: null, selectedColor: null });
  },
}));
