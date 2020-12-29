import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";

import Blogs from "./Components/Blogs/Blogs";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import invalidRoute from "./Components/Invalid/InvalidRoute";
import Nav from "./Components/Nav/Nav";
import Blog from "./Components/Blog/Blog";
import User from "./Components/User/User";
import Dashboard from "./Components/Dashboard/Dashboard";

axios.defaults.baseURL = "http://localhost:8080";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const validate = () => {
    axios
      .get("/user/check", { withCredentials: true })
      .then((result) => {
        if (result.status === 200) {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setIsAuthenticated(false);
          }
        }
      });
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <QueryClientProvider client={queryClient}>
                <Blogs {...props} />
              </QueryClientProvider>
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login validate={validate} {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/blog/:blogId"
            render={(props) => (
              <QueryClientProvider client={queryClient}>
                <Blog {...props} />
              </QueryClientProvider>
            )}
          />
          <Route
            exact
            path="/user/:userId"
            render={(props) => (
              <QueryClientProvider client={queryClient}>
                <User {...props} />
              </QueryClientProvider>
            )}
          />
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
          <Route path="/" component={invalidRoute} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
