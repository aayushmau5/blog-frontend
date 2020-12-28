import { Link } from "react-router-dom";
import styles from "./DisplayBlog.module.css";

function DisplayBlog({ blogData, backTo }) {
  const blog = blogData.blog;
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
        <div className={styles.BlogPost}>{blog.post}</div>
      </div>
    </>
  );
}

export default DisplayBlog;
