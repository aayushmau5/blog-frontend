import axios from "axios";
import { useQuery } from "react-query";
import DisplayBlog from "../DisplayBlog/DisplayBlog";
import styles from "./Blog.module.css";

function Blog({ match }) {
  const blogId = match.params.blogId;

  let display = "";

  const { status, data, error } = useQuery(
    ["blog", blogId],
    () => axios.get(`/blogs/blog/${blogId}`),
    { retry: 1 }
  );

  if (status === "loading") {
    display = <h1>Loading....</h1>;
  } else if (status === "error") {
    let errorMessage = error.message;
    if (error.response.status === 422) {
      errorMessage = `${error.response.data.error}`;
    }
    display = <h2 className="error">Error: {errorMessage}</h2>;
  } else {
    display = <DisplayBlog blogData={data.data} />;
  }

  return <div className={styles.BlogContainer}>{display}</div>;
}

export default Blog;
