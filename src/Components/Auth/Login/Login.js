import { useForm } from "react-hook-form";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

function Login({ validate, isAuthenticated, setId }) {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [loginError, setLoginError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (data) => {
    setSubmitting(true);
    setUsernameError("");
    setLoginError("");
    axios
      .post("/user/login", data)
      .then((result) => {
        if (result.status === 200) {
          setSubmitting(false);
          validate();
          setId(result.data.user._id);
          history.push("/");
        }
      })
      .catch((err) => {
        setSubmitting(false);
        if (err.response) {
          if (err.response.status === 404) {
            setLoginError(err.response.data.error);
          } else if (err.response.status === 422) {
            setUsernameError(err.response.data.errors[0].username);
          }
          setLoginError(err.response.data.error);
        }
      });
  };

  return (
    <>
      {isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {loginError !== "" && (
              <span className="form-login-error">{loginError}</span>
            )}
            {submitting && (
              <div className="form-login-submit">Submitting....</div>
            )}
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
              {errors.password && (
                <span className="form-error">Password is required</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="form-error">
                  Password must be atleast 6 characters long
                </span>
              )}
            </div>
            <button className="submit-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
