import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi, BlogPostCreate, BlogPostUpdate } from '@/api/blog.api';

export const useBlog = (params?: { category?: string; page?: number; limit?: number }) => {
  const queryClient = useQueryClient();

  const blogQuery = useQuery({
    queryKey: ['blog-posts', params],
    queryFn: () => blogApi.list(params),
    staleTime: 2 * 60 * 1000,
  });

  const createPostMutation = useMutation({
    mutationFn: (data: BlogPostCreate) => blogApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BlogPostUpdate }) => blogApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (id: string) => blogApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });

  return {
    posts: blogQuery.data || [],
    isLoading: blogQuery.isLoading,
    error: blogQuery.error,
    createPost: createPostMutation.mutateAsync,
    updatePost: updatePostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
  };
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => blogApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
