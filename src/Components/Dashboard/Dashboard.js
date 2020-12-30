import styles from "./Dashboard.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import DisplayUserData from "./DisplayUserData/DisplayUserData";

function Dashboard({ userId }) {
  let display = "";

  const { status, data, error } = useQuery(
    ["user", userId],
    () => axios.get(`/user/${userId}`),
    {
      retry: 1,
    }
  );

  if (status === "loading") {
    display = <h1>Loading....</h1>;
  } else if (status === "error") {
    let errorMessage = error.message;
    display = <h2 className="error">Error: {errorMessage}</h2>;
  } else {
    display = <DisplayUserData data={data.data} />;
  }

  return <div className={styles.DashboardContainer}>{display}</div>;
}

export default Dashboard;
