import { useForm } from "react-hook-form";
import "./Login.css";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="form-container">
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
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              ref={register({ required: true })}
              name="password"
            />
            {errors.password && (
              <span className="form-error">Password is required</span>
            )}
          </div>
          <button className="submit-btn" type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
