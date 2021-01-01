import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Markdown from "markdown-to-jsx";

import styles from "./AddBlog.module.css";

function AddBlog({ location }) {
  let updateBlog = location.state?.updateBlog || false;
  let blogId = location.state?.blogId || null;
  let titleVal = location.state?.titleVal || "";
  let summaryVal = location.state?.summaryVal || "";
  let postVal = location.state?.postVal || "";
  let isPublicVal = location.state?.isPublicVal || false;
  const history = useHistory();

  const [title, setTitle] = useState(titleVal);
  const [summary, setSummary] = useState(summaryVal);
  const [post, setPost] = useState(postVal);
  const [error, setError] = useState("");
  const [isPublic, setIsPublic] = useState(isPublicVal);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeSummary = (event) => {
    setSummary(event.target.value);
  };

  const postBlog = () => {
    setError("");
    if (updateBlog) {
      axios
        .put(`/blogs/blog/${blogId}`, {
          title: title,
          summary: summary,
          post: post,
          public: isPublic,
        })
        .then((result) => {
          if (result.status === 200) {
            history.push("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            if (err.response.status === 422) {
              setError(
                err.response.data.errors[0].title ||
                  err.response.data.errors[0].post ||
                  err.response.data.errors[0].summary ||
                  err.response.data.errors[0].public
              );
            }
            if (err.response.status === 401) {
              setError("Unauthorized. Please Login Again");
            }
          } else {
            setError(err.message);
          }
        });
    } else {
      axios
        .post("/blogs/", {
          title: title,
          summary: summary,
          post: post,
          public: isPublic,
        })
        .then((result) => {
          if (result.status === 200) {
            history.push("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            if (err.response.status === 422) {
              setError(
                err.response.data.errors[0].title ||
                  err.response.data.errors[0].post ||
                  err.response.data.errors[0].summary ||
                  err.response.data.errors[0].public
              );
            }
            if (err.response.status === 401) {
              setError("Unauthorized. Please Login Again");
            }
          } else {
            setError(err.message);
          }
        });
    }
  };

  return (
    <div className={styles.AddBlogContainer}>
      <div className={styles.EditorContainer}>
        {error !== "" ? <h2 className={styles.Error}>Error: {error}</h2> : null}
        <div className={styles.Title}>
          <label htmlFor="title">Title(1-200 characters):</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={changeTitle}
          />
        </div>
        <div className={styles.Title}>
          <label htmlFor="summary">Summary:</label>
          <textarea
            type="text"
            value={summary}
            name="title"
            onChange={changeSummary}
          />
        </div>
        <div className={styles.Title}>
          <div>
            <label>Visibility:</label>
            <input
              type="checkbox"
              checked={isPublic}
              name="public"
              id="public"
              onChange={() => setIsPublic((old) => !old)}
            />
            <label htmlFor="public">Public</label>
          </div>
        </div>
        <label className={styles.PostTitle}>Post:</label>
        <div className={styles.MDEditor}>
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className={styles.TextArea}
          />

          <div className={styles.PreviewContainer}>
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
              {post}
            </Markdown>
          </div>
        </div>
      </div>
      <button className={styles.PostBtn} onClick={() => postBlog()}>
        {updateBlog ? "Update" : "Post"}
      </button>
    </div>
  );
}

export default AddBlog;
