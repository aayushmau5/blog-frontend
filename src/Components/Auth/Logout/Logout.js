import axios from "axios";
import { Redirect } from "react-router-dom";

function Logout({ validate, setId }) {
  const logout = () => {
    axios
      .get("/user/logout")
      .then((result) => {
        if (result.status === 200) {
          setId(null);
          validate();
          localStorage.setItem("userId", null);
        }
      })
      .catch((err) => {
        <Redirect to="/" />;
      });
  };

  logout();

  return <Redirect to="/" />;
}

export default Logout;
