import styles from "./DisplayUser.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function DisplayUser({ userData, showHeading, showDelete }) {
  const [error, setError] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const deleteBlog = (id) => {
    setError(null);
    axios
      .delete(`/blogs/blog/${id}`, { withCredentials: true })
      .then((result) => {
        if (result.status === 200) {
          history.push({ pathname: "/empty" });
          history.replace({ pathname: location.pathname });
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.error);
        }
        setError(err.message);
      });
  };

  return (
    <div className={styles.UserContainer}>
      {showHeading ? (
        <div className={styles.Username}>
          All blogs by "{userData.user.username}"
        </div>
      ) : null}
      {showDelete ? <h3 className="error">{error}</h3> : null}
      {userData.blogs.length !== 0 ? (
        userData.blogs.map((blog) => {
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
              {showDelete ? (
                <button
                  className={styles.DeleteBtn}
                  onClick={() => deleteBlog(blog._id)}
                >
                  Delete
                </button>
              ) : null}
            </div>
          );
        })
      ) : (
        <h1>No blogs found</h1>
      )}
    </div>
  );
}

export default DisplayUser;
