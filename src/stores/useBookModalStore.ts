import { create } from 'zustand';

import type { BookModalData, ActiveItem } from 'types';
interface BookModalState {
  bookModalData: BookModalData;
  activeItem: ActiveItem;
  setBookModalData: (data: BookModalData) => void;
  setActiveItem: (item: ActiveItem) => void;
}

export const useBookModalStore = create<BookModalState>(set => ({
  bookModalData: { id: '', color: '' },
  activeItem: { type: 'slider', index: 0 },
  setModalData: data => {
    set({ bookModalData: data });
  },
  setActiveItem: item => {
    set({ activeItem: item });
  },
}));
