import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Markdown from "markdown-to-jsx";

import styles from "./AddBlog.module.css";

function AddBlog() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [post, setPost] = useState("");
  const [error, setError] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeSummary = (event) => {
    setSummary(event.target.value);
  };

  const postBlog = () => {
    setError("");
    axios
      .post(
        "/blogs/",
        {
          title: title,
          post: post,
          public: true,
        },
        { withCredentials: true }
      )
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
        Post
      </button>
    </div>
  );
}

export default AddBlog;
