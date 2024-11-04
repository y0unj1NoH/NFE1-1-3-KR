import { create } from 'zustand';

import { getBookMarkList } from 'api';
import { useAuthStore } from 'stores';
import type { BookMarkReturn } from 'types';

interface BookmarkState {
  bookmarks: BookMarkReturn[] | null;
  setBookmarks: (bookmarks: BookMarkReturn[]) => void;
  addBookmark: (bookmark: BookMarkReturn) => void;
  removeBookmark: (bookId: string) => void;
}

export const useBookMarkStore = create<BookmarkState>(set => ({
  bookmarks: null,
  setBookmarks: bookmarks => { set({ bookmarks }); },
  addBookmark: bookmark => { set(state => ({ bookmarks: [...(state.bookmarks || []), bookmark] })); },
  removeBookmark: bookId =>
    { set(state => ({
      bookmarks: (state.bookmarks || []).filter(b => b.book_id !== bookId),
    })); },
}));

export const fetchAndSetBookmarks = async () => {
  const { userInfo } = useAuthStore.getState();
  const { setBookmarks } = useBookMarkStore.getState();

  if (userInfo?.user_id) {
    try {
      const bookmarks = await getBookMarkList(userInfo.user_id);
      setBookmarks(bookmarks);
      console.log('fetchAndSetBookmarks clear');
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    }
  }
};