import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import styles from "./Signup.module.css";

function Signup({ history }) {
  const { register, handleSubmit, errors } = useForm();
  const [usernameError, setUsernameError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data) => {
    setSubmitting(true);
    setUsernameError("");
    axios
      .post("/user/signup", data)
      .then((result) => {
        if (result.status === 200) {
          setSubmitting(false);
          // Directly login the user
          console.log(result);
          history.push("/");
        }
      })
      .catch((err) => {
        setSubmitting(false);
        if (err.response.status === 409) {
          setUsernameError("Username already present");
        } else if (err.response.status === 422) {
          setUsernameError(err.response.data.errors[0].username);
        }
      });
  };

  return (
    <>
      <div className="form-container">
        {submitting && <div>Submitting....</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-control">
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
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              ref={register({ required: true, minLength: 6 })}
              name="password"
            />
            {errors.password && errors.password.type === "required" && (
              <span className="form-error">Password is required</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="form-error">
                Password must be atleast 6 characters long
              </span>
            )}
          </div>
          <button className="submit-btn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
