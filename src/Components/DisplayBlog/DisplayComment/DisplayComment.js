import axios from "axios";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import styles from "./DisplayComment.module.css";

function DisplayComment({ commentData, blogId, showDelete }) {
  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState("");

  const deleteComment = () => {
    setError("");
    axios
      .delete(`/blogs/blog/${blogId}/comment/${commentData._id}`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.status === 200) {
          history.push({ pathname: "/empty" });
          history.replace({ pathname: location.pathname });
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setError("You are unauthorized to delete this comment");
          }
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };

  let date = new Date(commentData.createdAt);
  date = date.toDateString();
  return (
    <div className={styles.CommentContainer}>
      <h3 className="error">{error}</h3>
      <div className={styles.Comment}>{commentData.comment}</div>
      <div className={styles.Username}>
        <span className={styles.gray}>by </span>
        {commentData.username}
      </div>
      <div className={styles.Date}>
        <span className={styles.gray}>on </span>
        {date}
      </div>
      {showDelete ? (
        <button className={styles.DeleteBtn} onClick={deleteComment}>
          Delete
        </button>
      ) : null}
    </div>
  );
}

export default DisplayComment;
