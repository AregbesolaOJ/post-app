import { useCallback } from 'react';
import { useRetrievePosts, useRetrieveUsers } from '../queries';
import { Post } from './post';
import { getErrorMessage } from '../lib/utils';

/**
 * Posts component encapsulating fetch/display logic for all posts
 */
export function Posts() {
  const { postsData, postsError, loadingPosts } = useRetrievePosts();
  const { usersData } = useRetrieveUsers();

  /**
   * dedicated callback to get the user entity that created each post: expects `userId`
   */
  const getPostUser = useCallback(
    (userId: number) => (usersData || []).find((user) => user.id === userId),
    [usersData]
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
        <Post post={post} user={getPostUser(post.userId)} key={post.id} />
      ))}
    </section>
  );
}
