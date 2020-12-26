import { Link } from "react-router-dom";
import styles from "./DisplayBlog.module.css";

function DisplayBlog({ blogData }) {
  const blog = blogData.blog;
  let date = new Date(blog.createdAt);
  date = date.toDateString();
  return (
    <>
      <div>
        <Link to="/" className={styles.Back}>
          Go Back
        </Link>
      </div>
      <div className={styles.BlogContainer}>
        <div className={styles.BlogTitle}>{blog.title}</div>
        <div className={styles.BlogAuthor}>
          <span className={styles.gray}>by </span>
          {blog.author.username}
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
