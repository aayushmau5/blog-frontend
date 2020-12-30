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
import Logout from "./Components/Auth/Logout/Logout";
import AddBlog from "./Components/AddBlog/AddBlog";

axios.defaults.baseURL = "http://localhost:8080";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

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

  const changeUserId = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  useEffect(() => {
    validate();
    const loggedid = localStorage.getItem("userId");
    setUserId(loggedid);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav isAuthenticated={isAuthenticated} />
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
            render={(props) => (
              <Login
                isAuthenticated={isAuthenticated}
                validate={validate}
                setId={changeUserId}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup
                isAuthenticated={isAuthenticated}
                validate={validate}
                setId={changeUserId}
                {...props}
              />
            )}
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
          <ProtectedRoute
            exact
            path="/dashboard"
            isAuthenticated={isAuthenticated}
          >
            <QueryClientProvider client={queryClient}>
              <Dashboard userId={userId} />
            </QueryClientProvider>
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/add-blog"
            isAuthenticated={isAuthenticated}
          >
            <QueryClientProvider client={queryClient}>
              <AddBlog userId={userId} />
            </QueryClientProvider>
          </ProtectedRoute>
          <Route
            exact
            path="/logout"
            render={(props) => (
              <Logout setId={changeUserId} validate={validate} {...props} />
            )}
          />
          <Route path="/" component={invalidRoute} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
