import { create } from 'zustand';

type PostStore = {
  postId: string | undefined;
  postContent: string | undefined;
  setPostId: (postId: string | undefined) => void;
  setPostContent: (postContent: string | undefined) => void;
};

export const usePostStore = create<PostStore>(set => ({
  postId: undefined,
  postContent: undefined,
  setPostId: post => {
    set({ postId: post });
  },
  setPostContent: content => {
    set({ postContent: content });
  },
}));
