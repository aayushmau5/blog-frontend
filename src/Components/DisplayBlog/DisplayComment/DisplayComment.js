import styles from "./DisplayComment.module.css";

function DisplayComment({ commentData }) {
  let date = new Date(commentData.createdAt);
  date = date.toDateString();
  return (
    <div className={styles.CommentContainer}>
      <div className={styles.Comment}>{commentData.comment}</div>
      <div className={styles.Username}>
        <span className={styles.gray}>by </span>
        {commentData.username}
      </div>
      <div className={styles.Date}>
        <span className={styles.gray}>on </span>
        {date}
      </div>
    </div>
  );
}

export default DisplayComment;
