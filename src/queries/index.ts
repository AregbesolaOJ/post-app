import { useFetcher } from '../lib/hooks';
import type { Comment, Post, User } from '../lib/types';

// url: 'https://jsonplaceholder.typicode.com/users/6' - single user
// url: 'https://jsonplaceholder.typicode.com/posts/6' - single post
// url: 'https://jsonplaceholder.typicode.com/posts/6/comments' OR 'https://jsonplaceholder.typicode.com/comments?postId=6' - single post and it's comments

// fetch all posts and then all users? 🤔 for each post, not a good approach ..

export function useRetrieveUsers() {
  const { data, error, isLoading } = useFetcher<User[]>({
    urlPath: '/users'
  });

  return {
    usersData: data,
    usersError: error,
    loadingUsers: isLoading
  };
}

export function useRetrievePosts() {
  const { data, error, isLoading } = useFetcher<Post[]>({
    urlPath: '/posts'
  });

  return {
    postsData: data,
    postsError: error,
    loadingPosts: isLoading
  };
}

export function useRetrieveComments() {
  const { data, error, isLoading } = useFetcher<Comment[]>({
    urlPath: '/comments'
    // skip: true
  });

  return {
    commentsData: data,
    commentsError: error,
    loadingComments: isLoading
  };
}
