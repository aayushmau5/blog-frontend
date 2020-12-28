import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./AddComment.module.css";

function AddComment({ blogId }) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [usernameError, setUsernameError] = useState("");

  const onSubmit = (data) => {
    setUsernameError("");
    axios
    .post(`/blogs/blog/${blogId}/comment`, data)
    .then((result) => {
      if (result.status === 200) {
          setValue("username", "", { shouldValidate: false });
          setValue("comment", "", { shouldValidate: false });
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setUsernameError(err.response.data.errors[0].username);
        }
      });
  };

  return (
    <>
      <div className={styles.CommentFormContainer}>
        <div className={styles.heading}>Add Comment:</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.CommentForm}>
          <div className={styles.FormControl}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              ref={register({ required: true })}
              name="username"
            />
            {errors.username && errors.username.type === "required" && (
              <span className="form-error">Username is required</span>
            )}
            {usernameError !== "" && (
              <span className="form-error">{usernameError}</span>
            )}
          </div>
          <div className={styles.FormControl}>
            <label htmlFor="comment">Comment:</label>
            <textarea
              type="text"
              ref={register({ required: true })}
              name="comment"
            />
            {errors.password && errors.password.type === "required" && (
              <span className="form-error">Comment is required</span>
            )}
          </div>
          <button className={styles.submitComment} type="submit">
            Comment
          </button>
        </form>
      </div>
    </>
  );
}

export default AddComment;
