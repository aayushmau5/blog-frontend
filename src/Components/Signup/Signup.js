import { useForm } from "react-hook-form";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username:</label>
        <input type="text" ref={register({ required: true })} name="username" />
        {errors.username && errors.username.type === "required" && (
          <span>Username is required</span>
        )}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          ref={register({ required: true })}
          name="password"
        />
        {errors.password && <span>Password is required</span>}
      </form>
    </>
  );
}

export default Signup;
