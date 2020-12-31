import { Link } from "react-router-dom";
import AddComment from "./AddComment/AddComment";
import styles from "./DisplayBlog.module.css";
import DisplayComment from "./DisplayComment/DisplayComment";
import Markdown from "markdown-to-jsx";

function DisplayBlog({ blogData, backTo }) {
  const blog = blogData.blog;
  const comments = blogData.blog.comments;
  let allComments = "No Comments";

  if (comments.length !== 0) {
    allComments = comments.map((comment) => (
      <DisplayComment
        key={comment._id}
        blogId={blog._id}
        showDelete={blogData.blog.author._id === localStorage.getItem("userId")}
        commentData={comment}
      />
    ));
  }

  let date = new Date(blog.createdAt);
  date = date.toDateString();
  return (
    <>
      <div>
        <Link to={backTo} className={styles.Back}>
          Go Back to Home Page
        </Link>
      </div>
      <div className={styles.BlogContainer}>
        <div className={styles.BlogTitle}>{blog.title}</div>
        <div className={styles.BlogAuthor}>
          <span className={styles.gray}>by </span>
          <Link to={`/user/${blog.author._id}`}>{blog.author.username}</Link>
        </div>
        <div className={styles.BlogDate}>
          <span className={styles.gray}>on </span>
          {date}
        </div>
        <div className={styles.Summary}>
          <em>{blog.summary}</em>
        </div>
        <div className={styles.BlogPost}>
          <Markdown
            options={{
              forceBlock: true,
              overrides: {
                pre: {
                  props: {
                    className: "code",
                  },
                },
                blockquote: {
                  props: {
                    className: "quote",
                  },
                },
              },
            }}
          >
            {blog.post}
          </Markdown>
        </div>
      </div>
      <div className={styles.CommentsContainer}>
        <div className={styles.CommentHeading}>Comments:</div>
        {allComments}
        <div className={styles.CommentFormContainer}>
          <AddComment blogId={blog._id} />
        </div>
      </div>
    </>
  );
}

export default DisplayBlog;
