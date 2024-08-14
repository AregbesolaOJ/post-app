import { useState } from 'react';
import type { Comment, Post, User } from '../lib/types';
import { useRetrieveSinglePostComments } from '../queries';

type PostProps = {
  /**
    the individual `post` entity
    */
  post: Post;
  /**
   the `user` object referencing who created the post
   */
  user: User | undefined;
  /**
   the `comments` list for respective post
   */
  comments?: Comment[];
};

/**
 * Presentational component for rendering a single post information
 */
function SinglePost({ post, user }: PostProps) {
  const [isOpenComments, setIsOpenComments] = useState(false);

  const toggleComments = () => setIsOpenComments(!isOpenComments);
  const { loadingPostComments, postCommentsData } =
    useRetrieveSinglePostComments({ postId: post.id, skip: !isOpenComments });

  return (
    <section id="post" className="post">
      <div className="post-header">
        <h2 className="post-title">{post?.title || 'N/A'}</h2>
        <div className="user-info">
          <span className="user-name">{`Created by ${
            user?.name || '...'
          }`}</span>
          <span className="user-username">{`/${user?.username}`}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{post?.body || '...'}</p>
      </div>
      <button
        type="button"
        name="comments-toggle"
        className="post-comments-toggle"
        onClick={toggleComments}
      >
        {`${isOpenComments ? 'Hide' : 'View'} Comments`}
      </button>
      {isOpenComments && (
        <>
          <div className="post-comments">
            <h3>{`Comments (${postCommentsData?.length || 0})`}</h3>
            {loadingPostComments ? (
              <p>Fetching comments ...</p>
            ) : postCommentsData && postCommentsData?.length > 0 ? (
              postCommentsData.map((comment) => (
                <div className="comment" key={comment.id}>
                  <span className="comment-user">{comment.email}:</span>
                  <span className="comment-text">{comment.body}</span>
                </div>
              ))
            ) : (
              <p>No comments found</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

SinglePost.displayName = 'SinglePost';

export { SinglePost as Post };
