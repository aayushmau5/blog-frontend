import styles from "./DisplayUser.module.css";
import { Link } from "react-router-dom";

function DisplayUser({ userData }) {
  return (
    <div className={styles.UserContainer}>
      <div className={styles.Username}>
        All blogs by "{userData.user.username}"
      </div>
      {userData.blogs.map((blog) => {
        let date = new Date(blog.createdAt);
        date = date.toDateString();

        const summary = blog.post.slice(0, 80) + "...";
        return (
          <div key={blog._id} className="card">
            <div className="blogs-title">
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </div>
            <div className="blogs-post">{summary}</div>
            <div className="blogs-date">{date}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayUser;
