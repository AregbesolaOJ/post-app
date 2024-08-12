import type { Comment, Post, User } from '../lib/types';

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
  comments: Comment[];
};

/**
 * Presentational component for rendering a single post information
 */
function SinglePost({ post, user, comments }: PostProps) {
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
      <div className="post-comments">
        <h3>{`Comments (${comments?.length || 0})`}</h3>
        {comments?.map((comment) => (
          <div className="comment" key={comment.id}>
            <span className="comment-user">{comment.email}:</span>
            <span className="comment-text">{comment.body}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

SinglePost.displayName = 'SinglePost';

export { SinglePost as Post };
