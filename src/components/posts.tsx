import { useCallback } from 'react';
import {
  useRetrieveComments,
  useRetrievePosts,
  useRetrieveUsers
} from '../queries';
import { SinglePost } from './post';
import { getErrorMessage } from '../lib/utils';

type PostProps = {};

export function Posts({ ..._props }: PostProps) {
  const { postsData, postsError, loadingPosts } = useRetrievePosts();
  const { usersData } = useRetrieveUsers();
  const { commentsData } = useRetrieveComments();

  const getPostUser = useCallback(
    (userId: number) => (usersData || []).find((user) => user.id === userId),
    [usersData]
  );

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
        <SinglePost
          post={post}
          user={getPostUser(post.userId)}
          comments={getPostComments(post.id)}
          key={post.id}
        />
      ))}
    </section>
  );
}
