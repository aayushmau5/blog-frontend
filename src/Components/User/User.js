import axios from "axios";
import { useQuery } from "react-query";
import DisplayUser from "./DisplayUser/DisplayUser";
import styles from "./User.module.css";

function User({ match }) {
  const userId = match.params.userId;

  let display = "";

  const { status, data, error } = useQuery(
    ["user", userId],
    () => axios.get(`/user/${userId}`),
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
    display = (
      <DisplayUser showDelete={false} userData={data.data} showHeading={true} />
    );
  }

  return <div className={styles.UserContainer}>{display}</div>;
}

export default User;
