import { useCallback } from 'react';
import {
  useRetrieveComments,
  useRetrievePosts,
  useRetrieveUsers
} from '../queries';
import { Post } from './post';
import { getErrorMessage } from '../lib/utils';

//  Posts component encapsulating fetch/display logic for all posts
export function Posts() {
  const { postsData, postsError, loadingPosts } = useRetrievePosts();
  const { usersData } = useRetrieveUsers();
  const { commentsData } = useRetrieveComments();

  //  dedicated callback to get the user entity that created each post: expects `userId`
  const getPostUser = useCallback(
    (userId: number) => (usersData || []).find((user) => user.id === userId),
    [usersData]
  );

  //  dedicated callback to get the comment(s) for each post: expects the `postId`
  const getPostComments = useCallback(
    (postId: number) =>
      (commentsData || []).filter((comment) => comment.postId === postId),
    [commentsData]
  );

  if (loadingPosts) {
    return (
      <section className="no-posts">
        <p>Fetching all posts...</p>
      </section>
    );
  }

  if (postsError) {
    return (
      <section className="no-posts">
        <p>{getErrorMessage(postsError)}</p>
      </section>
    );
  }

  return (
    <section id="posts" className="posts">
      {(postsData || []).map((post) => (
        <Post
          post={post}
          user={getPostUser(post.userId)}
          comments={getPostComments(post.id)}
          key={post.id}
        />
      ))}
    </section>
  );
}
