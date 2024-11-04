import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createComment,
  updateComment,
  deleteComment,
  deletePost,
  getPostById,
  getPostList,
  createPost,
  updatePost,
  getUserInfo,
} from 'api';
import { addLike, removeLike } from 'api/postLike';
import { CustomToast } from 'components';
import { useSearchBookStore, usePostStore } from 'stores';

export const usePostList = () =>
  useQuery({
    queryKey: ['postList'],
    queryFn: getPostList,
  });

export const usePost = (postId: string) =>
  useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  });

export const useUserInfo = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo(userId),
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { setBookId } = useSearchBookStore();

  return useMutation({
    mutationFn: ({ content, bookId }: { content: string; bookId: string | undefined }) =>
      createPost({
        title: '',
        content: content,
        book_id: bookId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      setBookId(undefined);
      CustomToast.success('Post created successfully!');
    },
    onError: error => {
      console.error('Error creating post:', error);
      CustomToast.error('Post created Failed.');
    },
  });
};

export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();
  const { setPostContent } = usePostStore();

  return useMutation({
    mutationFn: ({
      postId,
      content,
      bookId,
    }: {
      postId: string;
      content: string;
      bookId?: string;
    }) =>
      updatePost({
        postId: postId ?? '',
        formData: { title: '', content: content, book_id: bookId },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      queryClient.invalidateQueries({ queryKey: ['postList'] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      setPostContent(undefined);
      CustomToast.success('Post edited successfully!');
    },
    onError: error => {
      console.error('Error updating post:', error);
      CustomToast.error('Post edited failed.');
    },
  });
};

export const useDeletePost = (postId: string, onClose: (id: string | null) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postList'] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });

      CustomToast.success('Post deleted successfully!');
      onClose(null);
    },
    onError: error => {
      console.error('Error deleting post:', error);
      CustomToast.error('Post deleted failed.');
    },
  });
};

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, comment }: { postId: string; comment: string }) =>
      createComment({
        post_id: postId,
        content: comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      CustomToast.success('Comment created successfully!');
    },
    onError: error => {
      console.error('Error creating post:', error);
      CustomToast.error('Comment created failed.');
    },
  });
};

export const useUpdateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ comment_id, content }: { comment_id: string; content: string }) =>
      updateComment({ comment_id, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      CustomToast.success('Comment edited successfully!');
    },
    onError: error => {
      console.error('Error updating comment:', error);
      CustomToast.error('Comment edited failed.');
    },
  });
};

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
      CustomToast.success('Comment deleted successfully!');
    },
    onError: error => {
      console.error('Error deleting comment:', error);
      CustomToast.error('Comment deleted failed.');
    },
  });
};

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addLike({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
    },
    onError: error => {
      console.error('Error liking post:', error);
    },
  });
};

export const useUnlikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeLike({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] }).catch(error => {
        console.error('Error invalidating queries:', error);
      });
    },
    onError: error => {
      console.error('Error unliking post:', error);
    },
  });
};
