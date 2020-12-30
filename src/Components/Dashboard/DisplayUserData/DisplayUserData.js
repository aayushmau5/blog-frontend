import DisplayUser from "../../User/DisplayUser/DisplayUser";
import styles from "./DisplayUserData.module.css";

function DisplayUserData({ data }) {
  return (
    <>
      <div className={styles.UserContainer}>
        <div className={styles.Username}>
          <span className={styles.gray}>Username: </span>
          {data.user.username}
        </div>
        <div className={styles.TotalBlogs}>
          <span className={styles.gray}>Total Blogs: </span>
          {data.blogs.length}
        </div>
        <div className={styles.BlogsHeader}>Your blogs: </div>
        <DisplayUser showHeading={false} userData={data} />
      </div>
    </>
  );
}

export default DisplayUserData;
